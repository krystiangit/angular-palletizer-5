import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
import { KMZLoader } from "three/examples/jsm/loaders/KMZLoader"
import * as THREE from 'three';
import { Scene } from 'three';


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
  setWorkspace: Workspace = {
    width: this.setWorkspaceService.workspaceSets.width * 200,
    height: this.setWorkspaceService.workspaceSets.height * 200,
  }; // wymiary pola roboczego przed zmiana
    setKcs: Kcs = {
    posX: this.setKcsService.kcsSets.posX,
    posY: this.setKcsService.kcsSets.posY,
  };


  scene = null;
  light = null;
  camera = null;
  cube1 = null;
  cube2 = null;
  controls = null;
  renderer = null;
  windowWidth = window.innerWidth-30;
  windowheight = window.innerHeight-80;

  constructor(
    public palletsService: PalletsService,
    public boxService: AddBoxService,
    public setWorkspaceService: SetWorkspaceService,
    public setKcsService: SetKcsService,
    public addPickingPlaceService: AddPickingPlaceService,
    public elRef: ElementRef,

  ) {
    this.scene = new THREE.Scene(),
    this.camera = new THREE.PerspectiveCamera(75, this.windowWidth / this.windowheight, 1, 1000)
    this.renderer = new THREE.WebGLRenderer({antialias:true});
    //this.renderer = new THREE.WebGLRenderer({ alpha: true });
  }


  ngOnInit(): void {


  }



ngAfterViewInit(){
  this.controls = new OrbitControls(this.camera, this.meshIdRef.nativeElement)
  //this.generateMesh();
  this.configCamera();
  this.configRenderer();
  this.configControls();

  this.createMesh();
  this.configLight();
  this.renderer.render(this.scene, this.camera)
  this.animate();

}

configCamera() {
  this.camera.position.z=100
  this.camera.position.y=100
}

configRenderer() {
  this.renderer.setPixelRatio(window.devicePixelRatio);
  this.renderer.setClearColor(new THREE.Color("hsl(0, 0%, 10%)"));
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

createMesh() {

  const geometry = new THREE.BoxGeometry(50, 50, 50);
  const material = new THREE.MeshPhongMaterial({ color: 0xff7f50 });
  this.cube1 = new THREE.Mesh(geometry, material);
  this.cube2 = new THREE.Mesh(geometry, material);
  var grid = new THREE.GridHelper(1000,50, 0xffffff, 0x555555)

  /*
  var loader = new KMZLoader();
  loader.load('./models/kmz/Box.kmz', function (kmz){
    kmz.scene.position.y=0.5;

  });
  */
 this.scene.add(grid)
  this.scene.add(this.cube1);
  this.scene.add(this.cube2);
  this.cube1.position.y=25;
  this.cube2.position.y=25;
  this.cube2.position.z=50.05;
}

configLight(){
  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    this.scene.add(light);
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
  this.setWorkspace = this.setWorkspaceService.setWorkspace();
  this.renderer.setSize(this.setWorkspace.width, this.setWorkspace.height);

  console.log("setWorkspace of Mesh" + this.setWorkspaceService.setWorkspace().width)
}

setKcsFunc() {
  this.setKcs = this.setKcsService.setKcs();
}

addPickingPlaceFunc() {
  this.pickingPlaces = this.addPickingPlaceService.addPickingPlace();
}
addBoxOfPalletFunc() {
  this.boxesOfPallet = this.boxService.addBox();
}

addBoxOfPpFunc() {
  this.boxesOfPp = this.boxService.addBox();
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



