import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__ } from '@angular/core';
import { SetWorkspaceService } from '../services/set-workspace.service';
import { Workspace } from '../models/workspace.model';
import { SetKcsService } from '../services/set-kcs.service';
import { Kcs } from '../models/kcs.model';
import { AddBoxService } from '../services/add-box.service';
import { Box } from '../models/box.model';
import { PickingPlace } from '../models/pickingPlace.model';
import { AddPickingPlaceService } from '../services/add-picking-place.service';
import { PalletsService } from '../services/pallets.service';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader, GLTF, GLTFParser, GLTFReference } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';









//declare const THREE: any;
@Component({
  selector: 'app-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.css']
})
export class MeshComponent implements OnInit {
  @ViewChild('meshId') private meshIdRef: ElementRef;

  boxesOfPallet: Box[] = [];
  boxesOfPp: Box[] = [];
  pickingPlaces: PickingPlace[] = [];

    setKcs: Kcs = {
    posX: this.setKcsService.kcsSets.posX,
    posY: this.setKcsService.kcsSets.posY,
  };


  scene = null;
  camera = null;
  controls = null;
  renderer = null;
  windowWidth = window.innerWidth-30;
  windowheight = window.innerHeight-80;
  pallets3D = null;
  palletPos3D = null;
  boxesofPallet3D = null;
  boxOfPalletPos3D = null;
  boxesofPp3D = null;
  boxOfPpPos3D = null;
  pps3D = null;
  ppPos3D = null;


  loader = new GLTFLoader();
  //gui.add(text, 'explode');

  constructor(
    public palletsService: PalletsService,
    public boxService: AddBoxService,
    public setWorkspaceService: SetWorkspaceService,
    public setKcsService: SetKcsService,
    public addPickingPlaceService: AddPickingPlaceService,
    public elRef: ElementRef,
  ) {
    this.scene = new THREE.Scene(),
    this.camera = new THREE.PerspectiveCamera(75, this.windowWidth / this.windowheight, 1, 10000)
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  }

  ngOnInit(): void {
  }

ngAfterViewInit(){
  this.controls = new OrbitControls(this.camera, this.meshIdRef.nativeElement)
  this.configCamera();
  this.configRenderer();
  this.configControls();
  this.createGrid();
  this.configLight();
  this.renderer.render(this.scene, this.camera)
  this.animate();

}



configCamera() {
  this.camera.position.z=300
  this.camera.position.y=400
  this.camera.position.x=300
}

configRenderer() {
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 49%)"));
  this.renderer.setSize(this.windowWidth, this.windowheight);
  this.renderer.domElement.style.display = "block";
  this.renderer.domElement.style.margin = "auto";
  this.meshIdRef.nativeElement.append(this.renderer.domElement);
}

configControls() {
  this.controls.autoRotate = false;
  this.controls.enableZoom = true;
  this.controls.enablePan  = true;
  this.controls.update();
}

createGrid() {
  var grid = new THREE.GridHelper(5000,20, 0xffffff, 0x555555)
  this.scene.add(grid)
}
addPallet3D(){
  const address = '../../assets/euroPalletTexture.glb'
  this.pallets3D = this.palletsService.addPallet3D()
  this.palletPos3D = this.palletsService.addPosition3D()
  for (let index = 0; index < this.pallets3D.length; index++) {
/*
  this.scene.add(this.pallets3D[index]);
  this.pallets3D[index].position.x=this.palletPos3D[index].posX;
  this.pallets3D[index].position.y=this.palletPos3D[index].posZ+this.palletsService.pallets[index].height/2;
  this.pallets3D[index].position.z=-this.palletPos3D[index].posY;

*/

  this.loader.load(
  address,
  ( gltf ) => {
  // called when the resource is loaded
  this.scene.add( gltf.scene );
  gltf.scene.scale.x=1000;
  gltf.scene.scale.y=1000;
  gltf.scene.scale.z=1000;
  gltf.scene.position.x=this.palletPos3D[index].posX
  gltf.scene.position.y=this.palletPos3D[index].posZ;
  gltf.scene.position.z=-this.palletPos3D[index].posY;

  },
  ( xhr ) => {
  // called while loading is progressing
  console.log( `${( xhr.loaded / xhr.total * 100 )}% loaded` );
  },
  ( error ) => {
  // called when loading has errors
  console.error( 'An error happened', error );
  },

  );
  }

  }

addBoxOfPallet3D(){
  this.boxesofPallet3D = this.boxService.addBox3D()
  this.boxOfPalletPos3D = this.boxService.addPosition3D()
  for (let index = 0; index < this.boxesofPallet3D.length; index++) {
    this.scene.add(this.boxesofPallet3D[index]);
    this.boxesofPallet3D[index].position.x=this.boxOfPalletPos3D[index].posX;
    this.boxesofPallet3D[index].position.y=this.boxOfPalletPos3D[index].posZ;
    this.boxesofPallet3D[index].position.z=-this.boxOfPalletPos3D[index].posY;
    this.boxesofPallet3D[index].rotation.y = (Math.PI/180)*this.boxOfPalletPos3D[index].orientation;
    //console.log("boxes of pallet x: " +this.boxOfPalletPos3D[index].posX)
    //console.log("boxes of pallet y: " +this.boxOfPalletPos3D[index].posZ)
    //console.log("boxes of pallet z: " +this.boxOfPalletPos3D[index].posY)

  }
  //console.log("addBox of pallet3d: " +this.boxesofPallet3D)
}

addBoxOfPp3D(){
  this.boxesofPp3D = this.boxService.addBox3D()
  this.boxOfPpPos3D = this.boxService.addPosition3D()
  for (let index = 0; index < this.boxesofPp3D.length; index++) {
    this.scene.add(this.boxesofPp3D[index]);
    this.boxesofPp3D[index].position.x=this.boxOfPpPos3D[index].posX;
    this.boxesofPp3D[index].position.y=this.boxOfPpPos3D[index].posZ;
    this.boxesofPp3D[index].position.z=-this.boxOfPpPos3D[index].posY;
    this.boxesofPp3D[index].rotation.y = (Math.PI/180)*this.boxOfPpPos3D[index].orientation;

    //console.log("boxes of pp pos x: " + this.boxOfPpPos3D[index].posX)
    //console.log("boxes of pp pos y: " + this.boxOfPpPos3D[index].posZ)
    //console.log("boxes of pp pos z: " + this.boxOfPpPos3D[index].posY)
  }
  /*
  for (let index = 0; index < this.boxesofPp3D.length; index++) {
    this.scene.add(this.boxesofPp3D[index]);
    this.boxesofPp3D[index].position.x=this.boxOfPpPos3D[index].posX;
    this.boxesofPp3D[index].position.y=this.boxOfPpPos3D[index].posZ;
    this.boxesofPp3D[index].position.z=-this.boxOfPpPos3D[index].posY;
  }*/


}





addPp3D(){
  this.pps3D = this.addPickingPlaceService.addPp3D()
  this.ppPos3D = this.addPickingPlaceService.addPosition3D()
  for (let index = 0; index < this.pps3D.length; index++) {
    this.scene.add(this.pps3D[index]);
    this.pps3D[index].position.x=this.ppPos3D[index].posX;
    this.pps3D[index].position.y=this.ppPos3D[index].posZ;
    this.pps3D[index].position.z=-this.ppPos3D[index].posY;
  }
}

configLight(){
  {
    const color1 = 0xFFFFFF;
    const intensity1 = 1.0;
    const light1 = new THREE.DirectionalLight(color1, intensity1);

    light1.position.set(-1, 1, 1);
    this.scene.add(light1);
    const color2 = 0xFFFFFF;
    const intensity2 = 0.4;
    const light2 = new THREE.DirectionalLight(color2, intensity2);
    light2.position.set(1, 1, -1);


    this.scene.add(light2);
  }
}




animate() {
  window.requestAnimationFrame(() => this.animate());
  this.controls.update();
  if(this.renderer!=null){
    this.renderer.render(this.scene, this.camera);

  }
  else
  console.log("renderer is not defined for animate")

}




setWorkspaceFunc() {

}

setKcsFunc() {
  this.setKcs = this.setKcsService.setKcs();
}


addBoxOfPalletFunc() {
  //this.boxesOfPallet = this.boxService.addBox();
}

addBoxOfPpFunc() {
  //this.boxesOfPp = this.boxService.addBox();
}










/*

generateMesh() {
  //setTimeout(() => {}, 1000);
  //console.log("native element: "+ this.meshIdRef.nativeElement)
  //this.meshIdRef.nativeElement.append(renderer.domElement);

  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(50, this.setWorkspace.width / this.setWorkspace.height, 0.1, 1000);

  //this.camera.position.set(2,1,5); //(x,y,z)
  this.renderer.setSize(this.setWorkspace.width, this.setWorkspace.height);
  this.meshIdRef.nativeElement.append(this.renderer.domElement);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  this.scene.add(cube);

  var animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  this.camera.position.z = 5;
  this.camera.position.x = 2;
  this.renderer.render(this.scene, this.camera);
  animate();


}
*/


  }



