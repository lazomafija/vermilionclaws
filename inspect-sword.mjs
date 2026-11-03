import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { readFileSync } from 'fs';

const path = 'C:/Users/lazar/OneDrive/Desktop/MARIJA REWORK/public/models/sword.glb';
const buf = readFileSync(path);
const loader = new GLTFLoader();
loader.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength), '', (gltf) => {
  const scene = gltf.scene;
  scene.updateMatrixWorld(true);
  scene.traverse((c) => {
    if (!c.isMesh) return;
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    console.log(
      c.name,
      'minZ', +box.min.z.toFixed(3),
      'maxZ', +box.max.z.toFixed(3),
      'minY', +box.min.y.toFixed(3),
      'maxY', +box.max.y.toFixed(3),
      'size', size.toArray().map((n) => +n.toFixed(3))
    );
  });
});
