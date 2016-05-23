/**
* @author shanavas
*/

CRYST.Controls = function (object){

  var that    = this;

  this.object = object;
  this.zoomSensitivity = 0.001;
  this.rotationSpeed = 2;
  this.rotQuaternion = new THREE.Quaternion();

  var rotateStartPoint = new THREE.Vector3(0,0,1);
  var rotateEndPoint = new THREE.Vector3(0,0,1);
  var startPoint = { x: 0, y: 0 };
  var lastMoveTimestamp;
  var moveReleaseTimeDelta = 50;
  var deltaX = 0;
  var deltaY = 0;
  var drag = 0.95;
  var minDelta = 0.05;

  function onMouseDown(event){
    event.preventDefault();

    document.addEventListener('mousemove',onMouseMove,false);
    document.addEventListener('mouseup',onMouseUp,false);
    document.addEventListener('mouseout',onMouseOut,false);

    mouseDown = true;
    startPoint = {x: event.clientX, y: event.clientY};
    rotateStartPoint = rotateEndPoint = projectOnTrackball(0,0);
    lastMoveTimestamp = new Date();
  }

  function onMouseMove(event){
    deltaX = event.clientX - startPoint.x;
    deltaY = event.clientY - startPoint.y;
    that.handleRotation();

    startPoint = {x: event.clientX, y: event.clientY};
    lastMoveTimestamp = new Date();
  }

  function onMouseUp(event){
    if (new Date().getTime() - lastMoveTimestamp.getTime() > moveReleaseTimeDelta){
      deltaX = event.clientX - startPoint.x;
      deltaY = event.clientY - startPoint.y;
    }

    mouseDown = false;
    document.removeEventListener('mousemove',onMouseMove,false);
    document.removeEventListener('mouseup',onMouseUp,false);
    document.removeEventListener('mouseout',onMouseOut,false);
  }

  function onMouseOut(event){
    if (new Date().getTime() - lastMoveTimestamp.getTime() > moveReleaseTimeDelta){
      deltaX = event.clientX - startPoint.x;
      deltaY = event.clientY - startPoint.y;
    }
    mouseDown = false;
    document.removeEventListener('mousemove',onMouseMove,false);
    document.removeEventListener('mouseup',onMouseUp,false);
    document.removeEventListener('mouseout',onMouseOut,false);
  }

  function onMouseWheel( event ){
    var scaleFactor = event.wheelDelta*that.zoomSensitivity;
    var scale = that.object.scale.x + scaleFactor;
    if(scale < 0.2){ scale = 0.2; }
    if(scale > 10){ scale = 10; }
    that.object.scale.set(scale,scale,scale);
  }

  function projectOnTrackball(tX, tY){

    var mouseOnBall = new THREE.Vector3(tX/(screenWidth/2),-tY/(screenHeight/2),0.0);
    mouseOnBall.clampScalar(-1,1);

    var length = mouseOnBall.length();
    if (length > 1.0){ mouseOnBall.normalize(); }
    else{ mouseOnBall.z = Math.sqrt(1.0 - length*length) }

    return mouseOnBall;
  }

  function rotateMatrix(rotateStart, rotateEnd){
    var axis = new THREE.Vector3();
    var quaternion = new THREE.Quaternion();

    var angle = Math.acos(rotateStart.dot(rotateEnd)/rotateStart.length()/rotateEnd.length());
    if(angle){
      axis.crossVectors(rotateStart, rotateEnd).normalize();
      angle *= that.rotationSpeed;
      quaternion.setFromAxisAngle(axis, angle);
    }
    return quaternion;
  }

  this.handleRotation = function(){

    if(!mouseDown){
      if(deltaX < -minDelta || deltaX > minDelta){ deltaX *= drag; }
      else { deltaX = 0; }
      if(deltaY < -minDelta || deltaY > minDelta) { deltaY *= drag; }
      else { deltaY = 0; }
    }

    rotateEndPoint = projectOnTrackball(deltaX, deltaY);

    var curQuaternion = rotateMatrix(rotateStartPoint, rotateEndPoint);
    this.rotQuaternion = this.object.quaternion.clone();
    this.rotQuaternion.multiplyQuaternions(curQuaternion, this.rotQuaternion);
    this.rotQuaternion.normalize();
    this.object.setRotationFromQuaternion(this.rotQuaternion);

    rotateEndPoint = rotateStartPoint;
  }

  document.addEventListener('mousedown',onMouseDown,false);
  document.addEventListener( 'mousewheel', onMouseWheel, false );
}
