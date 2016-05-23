/**
 * @author shanavas
*/

CRYST.Axes = function (){

  this.axes = new THREE.Object3D();
  this.axes.name = "axes";

  this.size = 50;
  this.axis_cartesian = [[1,0,0],[0,1,0],[0,0,1]];
  this.axis_loc = 'bl';
  var axis_format = [['x',0xff0000],['y',0x00ff00],['z',0x0000ff]];

  this.updateAxes = function(){
    if(this.axes_loc == 'ce'){
      this.axes.position.set(0,0,0);
    }
    else if (this.axis_loc == 'bl'){
      this.axes.position.set(-screenWidth/2+50,-screenHeight/2+50,400);
    }
  };

  var dir = new THREE.Vector3();
  var org = new THREE.Vector3(0,0,0);
  for (var i = this.axis_cartesian.length; i--; ){
    dir.fromArray(this.axis_cartesian[i]);
    var obj = new THREE.ArrowHelper(dir, org, this.size, axis_format[i][1],10,10)
    obj.name = axis_format[i][0]
    this.axes.add(obj)
  }
  this.updateAxes();
  scene.add(this.axes);
}
