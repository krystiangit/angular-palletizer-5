import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ɵSWITCH_CHANGE_DETECTOR_REF_FACTORY__POST_R3__,
} from '@angular/core';
import { SetWorkspaceService } from '../services/set-workspace.service';
import { Workspace } from '../models/workspace.model';
//import { SetKcsService } from '../services/set-kcs.service';
//import { Kcs } from '../models/kcs.model';
import { AddBoxService } from '../services/add-box.service';
import { Box } from '../models/box.model';
import { PickingPlace } from '../models/pickingPlace.model';
import { AddPickingPlaceService } from '../services/add-picking-place.service';
import { PalletsService } from '../services/pallets.service';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  GLTFLoader,
  GLTF,
  GLTFParser,
  GLTFReference,
} from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { Pallet } from '../models/pallet.model';

import SampleJson from '../../assets/SampleJson.json';
//declare const THREE: any;
@Component({
  selector: 'app-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.css'],
})
export class MeshComponent implements OnInit {
  @ViewChild('meshId') private meshIdRef: ElementRef;
  @ViewChild('guiContainerId') private guiContainerRef: ElementRef;

  boxesOfPallet: Box[] = [];
  boxesOfPp: Box[] = [];
  pickingPlaces: PickingPlace[] = [];
  pallets: Pallet[] = [];
  /*
    setKcs: Kcs = {
    posX: this.setKcsService.kcsSets.posX,
    posY: this.setKcsService.kcsSets.posY,
  };
*/

  scene = null;
  camera = null;
  controls = null;
  renderer = null;
  windowWidth = window.innerWidth - 30;
  windowheight = window.innerHeight - 80;
  pallets3D = null;
  palletPos3D = null;
  boxesofPallet3D = null;
  boxOfPalletPos3D = null;
  boxesofPp3D = null;
  boxOfPpPos3D = null;
  helpersOfPp = null;
  helpersOfPallet = null;
  pps3D = null;
  ppPos3D = null;
  workspace: Workspace;

  gui = new dat.GUI();

  //gui.add(text, 'explode');

  constructor(
    public palletsService: PalletsService,
    public boxService: AddBoxService,
    public setWorkspaceService: SetWorkspaceService,
    //public setKcsService: SetKcsService,
    public addPickingPlaceService: AddPickingPlaceService,
    public elRef: ElementRef
  ) {
    (this.scene = new THREE.Scene()),
      (this.camera = new THREE.PerspectiveCamera(
        75,
        this.windowWidth / this.windowheight,
        1,
        10000
      ));
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.workspace = setWorkspaceService.workspaceSets;
    console.log('Reading local json files');
    console.log(SampleJson);
  }

  saveToJson() {
    this.boxService.saveToJson();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.controls = new OrbitControls(
      this.camera,
      this.meshIdRef.nativeElement
    );
    this.configCamera();
    this.configRenderer();
    this.configControls();
    this.createGrid();
    this.configLight();
    this.renderer.render(this.scene, this.camera);
    //this.configFloor()
    this.animate();
    this.guiFunc();
  }
  /*
deletePallet(id: string) {
  this.pallets.splice(
    this.pallets.findIndex((pallet) => pallet.id === id),
    1
  );
}
*/

  configCamera() {
    this.camera.position.z = 1000;
    this.camera.position.y = 1200;
    this.camera.position.x = 1000;
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color('hsl(232, 13%, 54%)'));
    this.renderer.setSize(this.windowWidth, this.windowheight);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.margin = 'auto';
    this.meshIdRef.nativeElement.append(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  }

  addPallet3D() {
    const address = '../../assets/euroPalletTexture.glb';
    this.pallets3D = this.palletsService.addPallet3D();
    this.palletPos3D = this.palletsService.addPosition3D();
    for (let index = 0; index < this.pallets3D.length; index++) {
      /*
  this.scene.add(this.pallets3D[index]);
  this.pallets3D[index].position.x=this.palletPos3D[index].posX;
  this.pallets3D[index].position.y=this.palletPos3D[index].posZ+this.palletsService.pallets[index].height/2;
  this.pallets3D[index].position.z=-this.palletPos3D[index].posY;

*/
      var loader = new GLTFLoader();
      loader.load(
        address,
        (gltf) => {
          // called when the resource is loaded
          this.scene.add(gltf.scene);
          gltf.scene.scale.x = 1000;
          gltf.scene.scale.y = 1000;
          gltf.scene.scale.z = 1000;
          gltf.scene.position.x = this.palletPos3D[index].posX;
          gltf.scene.position.y = this.palletPos3D[index].posZ;
          gltf.scene.position.z = -this.palletPos3D[index].posY;
        },
        (xhr) => {
          // called while loading is progressing
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (error) => {
          // called when loading has errors
          console.error('An error happened', error);
        }
      );
    }
  }

  loadProject() {
    this.boxService.loadProject();
    this.boxesOfPallet = this.boxService.boxesOfPallet;
    this.boxesofPallet3D = this.boxService.boxesOfPallet3D;
    this.helpersOfPallet = this.boxService.helpersOfPallet;
    this.boxesOfPp = this.boxService.boxesOfPickingPlace;
    this.boxesofPp3D = this.boxService.boxesOfPp3D;
    this.helpersOfPp = this.boxService.helpersOfPp;

    for (let index = 0; index < this.boxesofPallet3D.length; index++) {
      var object = this.boxesofPallet3D[index];
      object.name = this.boxesOfPallet[index].name;
      this.scene.add(object);
      var objectHelper = this.helpersOfPallet[index];
      this.scene.add(objectHelper);
    }

    for (let index = 0; index < this.boxesofPp3D.length; index++) {
      var object = this.boxesofPp3D[index];
      object.name = this.boxesOfPp[index].name;
      this.scene.add(object);
      var objectHelper = this.helpersOfPp[index];
      this.scene.add(objectHelper);
    }
    this.updateDisplay(this.gui);
  }

  addBoxOfPallet3D() {
    this.boxesofPallet3D = this.boxService.addBox3D();
    this.helpersOfPallet = this.boxService.addHelper3D();
    for (let index = 0; index < this.boxesofPallet3D.length; index++) {
      //this.scene.add(this.boxesofPallet3D[index]);
      var object = this.boxesofPallet3D[index];
      object.name = this.boxesOfPallet[index].name;
      this.scene.add(object);
      var objectHelper = this.helpersOfPallet[index];
      this.scene.add(objectHelper);
    }
    this.updateDisplay(this.gui);
  }

  addBoxOfPp3D() {
    this.boxesofPp3D = this.boxService.addBox3D();
    this.helpersOfPp = this.boxService.addHelper3D();
    for (let index = 0; index < this.boxesofPp3D.length; index++) {
      console.log('boxes of PP names' + this.boxesofPp3D[index].name);
      var object = this.boxesofPp3D[index];
      object.name = this.boxesOfPp[index].name;
      this.scene.add(object);
      var objectHelper = this.helpersOfPp[index];
      this.scene.add(objectHelper);
    }
  }

  check() {
    console.log('check starts');
    for (let index = 0; index < this.boxesOfPallet.length; index++) {
      console.log('boxes of pp names: ' + this.boxesOfPallet[index].name);
    }
    for (let index = 0; index < this.boxesofPallet3D.length; index++) {
      console.log('boxes of pp3d names: ' + this.boxesofPallet3D[index].name);
    }
    for (let index = 0; index < this.helpersOfPallet.length; index++) {
      console.log('helpers names: ' + this.helpersOfPallet[index].name);
    }
    for (let index = 0; index < this.helpersOfPp.length; index++) {
      console.log('helpers names: ' + this.helpersOfPp[index].name);
    }
    console.log('check ends');
  }
/*
  hide() {
    this.scene.getObjectByName(
      this.boxesofPp3D[this.boxesofPp3D.length - 1].name
    ).visible = false;
  }
*/
  deleteBoxOfPp() {
    //console.log("boxes of pp length before delete: " + this.boxesOfPp.length)
    //console.log("item to delete boxofpp: " + this.boxesOfPp[this.boxesOfPp.length-1].name)
    //console.log("item to delete boxofPP3Dhelper: " + this.scene.getObjectByName(this.boxesofPp3D[this.boxesofPp3D.length-1].name+ "helper").name)
    this.scene.remove(
      this.scene.getObjectByName(
        this.boxesofPp3D[this.boxesofPp3D.length - 1].name
      )
    );
    this.scene.remove(
      this.scene.getObjectByName(
        this.boxesofPp3D[this.boxesofPp3D.length - 1].name + 'helper'
      )
    );
    this.boxService.deleteBoxOfPp();
    //console.log("boxes of pp length after delete: " + this.boxesOfPp.length)
    //this.gui.__controllers[this.gui.__controllers.length-1].remove();
    /*
  for (let index = 0; index < this.boxesOfPp.length; index++) {
    console.log("boxes after delete: " + this.boxesofPp3D[index].name)

  }*/
  }

  deleteBoxOfPallet() {
    this.scene.remove(
      this.scene.getObjectByName(
        this.boxesofPallet3D[this.boxesofPallet3D.length - 1].name
      )
    );
    this.scene.remove(
      this.scene.getObjectByName(
        this.boxesofPallet3D[this.boxesofPallet3D.length - 1].name + 'helper'
      )
    );
    this.boxService.deleteBoxOfPallet();
    //console.log("boxes of pp length after delete: " + this.boxesOfPallet.length)
    this.gui.__controllers[this.gui.__controllers.length - 1].remove();
  }

  addPp3D() {
    this.pps3D = this.addPickingPlaceService.addPp3D();
    this.ppPos3D = this.addPickingPlaceService.addPosition3D();
    for (let index = 0; index < this.pps3D.length; index++) {
      this.scene.add(this.pps3D[index]);
      this.pps3D[index].position.x = this.ppPos3D[index].posX;
      this.pps3D[index].position.y = this.ppPos3D[index].posZ;
      this.pps3D[index].position.z = -this.ppPos3D[index].posY;
    }
  }

  configLight() {
    {
      const color1 = 0xffffff;
      const intensity1 = 1.0;
      const light1 = new THREE.DirectionalLight(color1, intensity1);
      light1.position.set(-1, 1, 1);
      this.scene.add(light1);
      const color2 = 0xffffff;
      const intensity2 = 0.4;
      const light2 = new THREE.DirectionalLight(color2, intensity2);
      light2.position.set(1, 1, -1);
      //this.scene.add(light2);
      const light3 = new THREE.AmbientLight(color1);
      light3.intensity = 0.2;
      this.scene.add(light3);
    }
  }
  createGrid() {
    this.workspace = this.setWorkspaceService.setWorkspace();
    var grid = new THREE.GridHelper(
      this.workspace.width,
      20,
      0xffffff,
      0x555555
    );
    this.scene.add(grid);
  }
  configFloor() {
    var material = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(
        '../../assets/Asphalt_01_1K_Base_Color.png'
      ), //right
    });
    var geometry = new THREE.PlaneGeometry(
      this.workspace.width,
      this.workspace.height,
      1,
      1
    );
    //var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
    var floor = new THREE.Mesh(geometry, material);
    floor.material.side = THREE.DoubleSide;
    floor.rotation.x = (Math.PI / 180) * 90;
    this.scene.add(floor);
    console.log(this.workspace.width);
  }

  setWorkspaceFunc() {
    this.workspace = this.setWorkspaceService.setWorkspace();
    this.createGrid();
    this.configFloor();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    if (this.renderer != null) {
      this.renderer.render(this.scene, this.camera);
    } else console.log('renderer is not defined for animate');
  }

  addBoxOfPalletFunc() {
    this.boxesOfPallet = this.boxService.addBox();
  }

  addBoxOfPpFunc() {
    this.boxesOfPp = this.boxService.addBox();
  }

  addPickingPlaceFunc() {
    this.pickingPlaces = this.addPickingPlaceService.addPickingPlace();
  }

  addPallet() {
    this.pallets = this.palletsService.addPallet();
  }

  guiFunc() {
    const params = {
      envMap: 'HDR',
      roughness: 0.0,
      metalness: 0.0,
      exposure: 1.0,
      debug: false,
    };
    const text = {
      message: 'dat.gui',
      speed: 0.8,
      displayOutline: false,
    };

    //const gui = new dat.GUI();
    //this.gui.destroy()
    /*
  const guiContainer =
  this.gui.add( params, 'envMap', [ 'LDR', 'HDR', 'RGBM16' ] );
  this.gui.add( params, 'roughness', 0, 1, 0.01 );
  this.gui.add( params, 'metalness', 0, 1, 0.01 );
  this.gui.add( params, 'exposure', 0, 2, 0.01 );
  this.gui.add( params, 'debug', false );
  this.gui.domElement.id = 'gui';
  */
    //this.gui.nativeElement.id = 'gui';

    //var menu = this.gui.addFolder('folder');
    //var menuPp3D = this.gui.addFolder('Boxes of Picking Place')
    //menu.add(text, 'message');
    //menu.add(text, 'speed', -5, 5);
    //menu.add(text, 'displayOutline');
    this.guiContainerRef.nativeElement.append(this.gui.domElement);
    this.gui.open();
    //menu.open();
  }

  updateDisplay(gui) {
    //console.log("start updating")
    /*
  for (let index = 0; index < gui.__controllers.length; index++) {
    gui.__controllers[index].remove();
  console.log("iteracja 1")
  }*/

    /*
  if (this.boxesOfPallet.length>0){
    for (let index = gui.__controllers.length; index < this.boxesOfPallet.length; index++) {
      this.gui.add(this.boxesOfPallet[index], 'visible').listen()
    }
  }
*/
    if (this.boxesOfPallet.length > 0) {
      for (
        let index = gui.__controllers.length;
        index < this.boxesOfPallet.length;
        index++
      ) {
        this.gui
          .add(
            this.scene.getObjectByName(this.boxesofPallet3D[index].name),
            'visible'
          )
          .name(this.boxesofPallet3D[index].name);
      }
    }

    /*
for (let index = 0; index < gui.__controllers.length; index++) {
gui.__controllers[index].updateDisplay();
console.log("iteracja 1")

}
for (let index1 = 0; index1 < gui.__folders.length; index1++) {
this.updateDisplay(gui.__folders[index1]);
console.log("iteracja 2")
}
*/
  }
}

/*
setKcsFunc() {
  //this.setKcs = this.setKcsService.setKcs();
}
*/

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
