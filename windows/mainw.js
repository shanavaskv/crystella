/**
 * @author shanavas
*/

var container, camera, scene, renderer;
var cube;

var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var mouseX = 0, mouseY = 0;
var mousemoveX = 0, mousemoveY = 0;

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( screenWidth, screenHeight );
  container.appendChild( renderer.domElement );

  var lview = new CRYST.logView();
  container.appendChild( lview.domElement );
  lview.log('starting...');

  camera = new THREE.PerspectiveCamera( 70, screenWidth / screenHeight, 1, 1000 );
  camera.position.z = 400;

  scene = new THREE.Scene();

  cube = new THREE.Mesh( new THREE.CubeGeometry( 60, 60, 60 ), new THREE.MeshNormalMaterial() );
	cube.position.y = 0;
  scene.add( cube );

  window.onresize = onWindowResize;

  lview.log('ready.');
}

function onWindowResize() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  camera.aspect = screenWidth / screenHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( screenWidth, screenHeight );
}

function animate() {
  requestAnimationFrame( animate );
  cube.rotation.x += 0.005;
  cube.rotation.y += 0.01;
  render();
}

function render() {
  renderer.render( scene, camera );
}
