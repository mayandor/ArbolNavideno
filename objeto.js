// primer ejercicio con three.js
// crear una geometria teniendo en cuenta el orden de los vértices
var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ambientLight, light;

function insertPlano(migeo, p1, p2, p3, p4){
    migeo.faces.push( new THREE.Face3( p1, p2, p3 ) );
    migeo.faces.push( new THREE.Face3( p3, p2, p1 ) );
    migeo.faces.push( new THREE.Face3( p1, p3, p4 ) );
    migeo.faces.push( new THREE.Face3( p4, p3, p1 ) );
}

function insertTrapecio(pb, hb, ph, hh, col) {
    var migeo = new THREE.Geometry();
    //var pb = 5.0, ho = 0.0;
	var l = migeo.vertices.length;
    migeo.vertices.push( new THREE.Vector3( pb, hb, pb) ); //A
    migeo.vertices.push( new THREE.Vector3( -pb, hb, pb ) ); //B
    migeo.vertices.push( new THREE.Vector3( -pb, hb, -pb ) ); //C
    migeo.vertices.push( new THREE.Vector3( pb, hb, -pb ) ); //D
    //pb = 3.0; ho = 4.0;
    migeo.vertices.push( new THREE.Vector3( ph, hh, ph ) ); //E
    migeo.vertices.push( new THREE.Vector3( -ph, hh, ph ) ); //F
    migeo.vertices.push( new THREE.Vector3( -ph, hh, -ph ) ); //G
    migeo.vertices.push( new THREE.Vector3( ph, hh, -ph ) ); //H
    insertPlano(migeo, l+0, l+3, l+2, l+1);// base DCAB
    insertPlano(migeo, l+0, l+4, l+5, l+1);// lado AEFB
    insertPlano(migeo, l+3, l+7, l+4, l+0);// lado DHEA
    insertPlano(migeo, l+3, l+2, l+6, l+7);// lado DCGH
    insertPlano(migeo, l+2, l+6, l+5, l+1);// lado CGFB

    var material = new THREE.MeshBasicMaterial( { color: col } );

    /*var map = new THREE.TextureLoader().load( 'texturas/arcoiris.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    var material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );
	*/
    var miobjeto = new THREE.Mesh (migeo, material); // Crea el objeto
	return miobjeto;
}
function insertarEsfera(r, x, y, z, col) {
    var material = new THREE.MeshPhongMaterial( { color:col } );
    object = new THREE.Mesh( new THREE.SphereBufferGeometry( r, 50, 50 ), material );
    object.position.set( x, y, z );
    return object;
}
function init() {
	var canvasWidth = window.innerWidth * 0.9;
	var canvasHeight = window.innerHeight * 0.9;
	// CAMERA
	camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.set( 500, 200, 500 );
	camera.lookAt(0, 0, 0);
	// LIGHTS
	light = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
	light.position.set(1, 1, 1 );
	light.target.position.set(0, 0, 0);
	light.target.updateMatrixWorld();
	var ambientLight = new THREE.AmbientLight( 0x111111 );
	// RENDERER
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.setClearColor( 0x9FC5E8, 1.0 );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	// Add to DOM
	var container = document.getElementById('container');
	container.appendChild( renderer.domElement );
	// CONTROLS
	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	cameraControls.target.set(10, 10, 10);
	// SCENE
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
	scene.add( light );
    scene.add( ambientLight );
	// OBJECT
    scene.add(insertTrapecio(5.0, 0.0, 3.0, 4.0, 0x532F09));
    scene.add(insertTrapecio(15.0, 4.0, 8.0, 10.0, 0x38761D));
    scene.add(insertTrapecio(12.0, 10.0, 7.0, 15.0, 0x38761D));
    scene.add(insertTrapecio(9.0, 15.0, 4.0, 24.0, 0x38761D));
    scene.add(insertTrapecio(6.0, 24.0, 2.0, 30.0, 0x38761D));
    scene.add(insertTrapecio(3.0, 30.0, 0.0, 40.0, 0x38761D));

	scene.add(insertarEsfera(1, -15, 3, 15, 0xFF0000));
    scene.add(insertarEsfera(1, 15, 3, 15, 0xFFFF00));
    scene.add(insertarEsfera(1, -15, 3, -15, 0x0000FF));
    scene.add(insertarEsfera(1, 15, 3, -15, 0xFF9900));

    scene.add(insertarEsfera(1, -12, 9, 12, 0xFF9900));
    scene.add(insertarEsfera(1, 12, 9, 12, 0xFF0000));
    scene.add(insertarEsfera(1, -12, 9, -12, 0xFFFF00));
    scene.add(insertarEsfera(1, 12, 9, -12, 0x0000FF));

    scene.add(insertarEsfera(1, -9, 14, 9, 0x0000FF));
    scene.add(insertarEsfera(1, 9, 14, 9, 0xFF9900));
    scene.add(insertarEsfera(1, -9, 14, -9, 0xFF0000));
    scene.add(insertarEsfera(1, 9, 14, -9, 0xFFFF00));

    scene.add(insertarEsfera(1, -6, 23, 6, 0xFFFF00));
    scene.add(insertarEsfera(1, 6, 23, 6, 0x0000FF));
    scene.add(insertarEsfera(1, -6, 23, -6, 0xFF9900));
    scene.add(insertarEsfera(1, 6, 23, -6, 0xFF0000));

    scene.add(insertarEsfera(1, -3, 29, 3, 0xFF0000));
    scene.add(insertarEsfera(1, 3, 29, 3, 0xFFFF00));
    scene.add(insertarEsfera(1, -3, 29, -3, 0x0000FF));
    scene.add(insertarEsfera(1, 3, 29, -3, 0xFF0000));

    scene.add(insertarEsfera(2, 0, 39, 0, 0xFFFF00)); //estrella

    // ground

    // instantiate a loader
    const loader = new THREE.TextureLoader();
    const groundTexture = loader.load( 'texturas/grasslight-big.jpg' );
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 25, 25 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;
    const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

    // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    let mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000,5000), groundMaterial );
    // mesh.position.y = - 250;
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );
   // helper
    scene.add( new THREE.AxesHelper( 1000 ) );
}

function animate() {
	window.requestAnimationFrame( animate );
	render();
}

function render() {
	var delta = clock.getDelta();
	//cameraControls.update(delta);
	renderer.render( scene, camera );
}

try {
	init();
	animate();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}
