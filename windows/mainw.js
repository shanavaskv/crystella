/**
 * @author shanavas
*/

var container, controls, camera, scene, renderer;
var cube, lview, axes;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

var rotDamp = 0.1;
var mouseDown = false;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  renderer = new THREE.WebGLRenderer(antialias = true);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( screenWidth, screenHeight );
  container.appendChild( renderer.domElement );

  lview = new CRYST.logView();
  container.appendChild( lview.domElement );
  lview.log('starting...');

  scene = new THREE.Scene();
  // camera = new THREE.PerspectiveCamera( 45, screenWidth / screenHeight, 0.1, 1000 );
  camera = new THREE.OrthographicCamera(screenWidth/-2,screenWidth/2, screenHeight/2, screenHeight/-2, 0.1, 1000 );
  camera.position.z = 500;
  camera.lookAt(new THREE.Vector3(0,0,0));
  cube = new THREE.Mesh( new THREE.CubeGeometry( 60, 60, 60 ), new THREE.MeshNormalMaterial() );
  scene.add( cube );

  window.onresize = onWindowResize;
  controls = new CRYST.Controls( cube );
  axes = new CRYST.Axes();
  lview.log('ready.');
}

function onWindowResize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  // camera.aspect = screenWidth / screenHeight;
  camera.left = screenWidth / -2;
	camera.right = screenWidth / 2;
  camera.top = screenHeight / 2;
  camera.bottom = screenHeight / -2;
  axes.updateAxes();
  camera.updateProjectionMatrix();
  renderer.setSize( screenWidth, screenHeight );
}

function animate() {
  requestAnimationFrame( animate );
  controls.handleRotation(cube);
  axes.axes.setRotationFromQuaternion(controls.rotQuaternion);

  render();
}

function render() {
  camera.updateProjectionMatrix();
  renderer.render( scene, camera );
}
