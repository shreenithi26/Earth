import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { ImageUtils } from 'three';

//scene
const scene = new THREE.Scene();


// const geometry = new THREE.SphereGeometry(5,47,29);
// const material = new THREE.MeshPhongMaterial({
//   color: 'blue',
// })
// const mesh = new THREE.Mesh(geometry,material)
// scene.add(mesh)
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5,47,29),
  new THREE.MeshPhongMaterial({
       map: new THREE.TextureLoader().load('earth-texture.jpeg')
    })
)

scene.add(sphere)


//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


//light
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0,10,10);
light.target.position.set(0,0,0)
scene.add(light)
scene.add(light.target);


//camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height , 0.1, 100)
camera.position.z = 20
scene.add(camera)


//render
const canvas = document.querySelector('.webgl') 
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 2

window.addEventListener('resize', ()=> {
  //update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  controls.update();
  renderer.render(scene,camera);
  window.requestAnimationFrame(loop);
}

loop()
