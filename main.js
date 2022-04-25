import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'
import { TextureLoader } from 'three';

// Setup

const scene = new THREE.Scene();

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Canvas
const canvas = document.querySelector('#c')

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// create a new renderer by instating the canvas element in our HTML // file
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#c'),
});

renderer.render(scene, camera);

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))




// Cube
const cubeGeometry = new THREE.TorusGeometry( 0.6, 0.01, 5,100);
const cubeMat = new THREE.MeshBasicMaterial({
    color:'#8bf4f7'
})
// cubeMat.transparent = true
// cubeMat.opacity = 0.5
const cubeMesh = new THREE.Mesh(cubeGeometry,cubeMat)
const cubeMesh2 = new THREE.Mesh(cubeGeometry,cubeMat)
const cubeMesh3 = new THREE.Mesh(cubeGeometry,cubeMat)
const cubeMesh4 = new THREE.Mesh(cubeGeometry,cubeMat)
 
// scene.add(cubeMesh)
// scene.add(cubeMesh2)
// scene.add(cubeMesh3)
// scene.add(cubeMesh4)
cubeMesh.rotation.x = Math.PI/4
cubeMesh2.rotation.x= 3*Math.PI/4
cubeMesh3.rotation.x = Math.PI/2

// Sphere
const sphereGeometry = new THREE.SphereBufferGeometry(0.3,32,32)
const sphereTexture = new THREE.TextureLoader().load('/assets/tex1.jpg')
const sphereMat = new THREE.MeshBasicMaterial({
    color:'#8bf4f7',
    map: sphereTexture
})
const sphereMesh = new THREE.Mesh(sphereGeometry,sphereMat)

/**
 * Particles
 */
 const particlesGeometry = new THREE.SphereBufferGeometry(0.5,32,32)
 var particlesMaterial = new THREE.PointsMaterial({
     size:0.02,
     sizeAttenuation: true,
     color:'#8bf4f7'
 })
const particles = new THREE.Points(particlesGeometry,particlesMaterial)

const planet = new THREE.Group();
planet.add(particles)
planet.add(sphereMesh)
planet.add(cubeMesh);
planet.add(cubeMesh2);
planet.add(cubeMesh3);
planet.add(cubeMesh4);
scene.add(planet)


/**
 * Particles with custom Geometry
 */

 const starTexture = new TextureLoader().load('/assets/particles/4.png')

 const particlesCustomGeometry = new THREE.BufferGeometry()
 const count = 2000
 
 const vertices = new Float32Array(count*3)
 for(let i= 0; i<count*3;i++){
     vertices[i] = (Math.random()-0.5) * 10
 }
 
 particlesCustomGeometry.setAttribute(
     'position', 
     new THREE.BufferAttribute(vertices,3)
 )
 const particleCustommaterial = new THREE.PointsMaterial({
     color:'#00f7d8',
     map:starTexture
 })
 particleCustommaterial.size = 0.1
 particleCustommaterial.sizeAttenuation = true
 particleCustommaterial.transparent = true
 particleCustommaterial.alphaMap = starTexture
 particleCustommaterial.alphaTest = 0.001
 // const mesh = new THREE.Mesh(particlesCustomGeometry,material)
 const customParticles = new THREE.Points(
     particlesCustomGeometry,
     particleCustommaterial
 )
 scene.add(customParticles)



/**
 * Animate
 */
 const clock = new THREE.Clock()

 const tick = () =>
 {
     const elapsedTime = clock.getElapsedTime() 
     // customParticles.position.z = (Math.sin(elapsedTime) -0.5) * 0.001
     // customParticles.position.y= (Math.sin(2*Math.PI*elapsedTime) -0.5) *0.0001
     // customParticles.position.x = (Math.cos(elapsedTime) -0.5) * 0.0001
     
     customParticles.position.x = Math.sin(elapsedTime) * 0.1
     customParticles.position.z = -Math.cos(elapsedTime) * 0.1
 
     planet.position.x = Math.sin(elapsedTime) * 2
     planet.position.z = -Math.cos(elapsedTime) * 2
 
     sphereMesh.rotation.y = -elapsedTime
 
     // particles.position.x = Math.sin(elapsedTime) * 2
     // particles.position.z = -Math.cos(elapsedTime) * 2
 
     // sphereMesh.position.x = particles.position.x
     // sphereMesh.position.z = particles.position.z
 
     cubeMesh.rotation.x = elapsedTime
     cubeMesh2.rotation.y = elapsedTime
     cubeMesh3.rotation.y = -elapsedTime
     cubeMesh4.rotation.x = -elapsedTime
 
 
     particlesMaterial.size = Math.sin(elapsedTime) * 0.01
     
 
     // Update controls
     controls.update()
 
     // Render
     renderer.render(scene, camera)
 
     // Call tick again on the next frame
     window.requestAnimationFrame(tick)
 }
 
 tick()

