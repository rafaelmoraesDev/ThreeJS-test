const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc,);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6.5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document
.body
.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

//Set FPS
let stats = new Stats();
document.body.appendChild(stats.domElement);

// Lights
const lightOne = new THREE.DirectionalLight(0xffffff);
lightOne
.position
.set(0, 1, 1)
const lightTwo = new THREE.DirectionalLight(0xffffff);
lightTwo
.position
.set(-1, 1, 1)
const lightThree = new THREE.DirectionalLight(0xffffff);
lightThree
    .position
    .set(1, 1, 1)
    scene.add(lightOne, lightTwo, lightThree);
    
//Plane as wall
const geometryPlane = new THREE.PlaneGeometry(7, 7);
const materialPlane = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
const plane = new THREE.Mesh(geometryPlane, materialPlane);
scene.add(plane);

//Delimiter inside plane
const material = new THREE.LineBasicMaterial({color: 0x000000});
const points = [];
points.push(new THREE.Vector3(- 3, 3, 0.01));
points.push(new THREE.Vector3(3, 3, 0.01));
points.push(new THREE.Vector3(3, -3.5, 0.01));
points.push(new THREE.Vector3(-3, -3.5, 0.01));
points.push(new THREE.Vector3(-3, 3, 0.01));

const geometryLines = new THREE
    .BufferGeometry()
    .setFromPoints(points)
const boxLines = new THREE.Line(geometryLines, material);
scene.add(boxLines);

//Cube
const cubes = [];
const geometryCube = new THREE.BoxGeometry(1.8, 6, 1);
const materialCube = new THREE.MeshPhongMaterial({color: 0x4a51cc}); //fdca30
const cube = new THREE.Mesh(geometryCube, materialCube);

// const geometry = new THREE.SphereGeometry(100, 100, 100);

function generateBoxes() {
    let xOffset = 0;
    let xPos = -2;
    let yPos = -0.05;
    let zPos = 0.55;
    for (let i = 0; i < 3; i++) {
        let mesh = new THREE.Mesh(geometryCube, materialCube)
        mesh.position.x += xPos + xOffset;
        mesh.position.y += yPos;
        mesh.position.z = zPos;
        xOffset += 2;
        cubes.push(scene.add(mesh));
    }
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    stats.update();
}
animate();
generateBoxes();