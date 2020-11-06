import {
  Component,
  ViewChild,
  TemplateRef,
  ElementRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { PalletsService } from '../services/pallets.service';
import { Pallet } from '../models/pallet.model';
import { AppComponent } from '../app.component';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
interface PredefinedPallets {
  name: string;
  width: number;
  length: number;
  height: number
}
interface Color {
  name: string;
  value: number;
}

@Component({
  selector: 'app-add-pallet',
  templateUrl: './add-pallet.component.html',
  styleUrls: ['./add-pallet.component.css'],
})
export class AddPalletComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  @ViewChild('preview') private previewRef: ElementRef;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public palletsService: PalletsService,
    public appComponent: AppComponent
  ) {
    this.palletsService.palletSets = this.pallet;

    (this.scene = new THREE.Scene()),
      (this.camera = new THREE.PerspectiveCamera(
        75,
        this.windowWidth / this.windowheight,
        1,
        10000
      ));
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
  }

  public colors: Color[] = [
    { name: 'red', value: 0xff0000 },
    { name: 'light green', value: 0x00ff00 },
    { name: 'dark green', value: 0x206600 },
    { name: 'yellow', value: 0xffff00 },
    { name: 'orange', value: 0xff6600 },
    { name: 'light blue', value: 0x00a2ff },
    { name: 'dark blue', value: 0x0400ff },
  ];

  //public pallets: Pallet[] = []

  public pallet: Pallet = {
    name: 'Pallet1',
    id: '1',
    isTexture: true,
    width: 800,
    length: 1200,
    height: 144,
    posX: 1000,
    posY: 1000,
    posZ: 0,
    orientation: 0,
    color: 0xffff00,
  };

  scene = null;
  camera = null;
  controls = null;
  renderer = null;
  windowWidth = 290;
  windowheight = 290;

  configCamera() {
    this.camera.position.z = 1000;
    this.camera.position.y = 800;
    this.camera.position.x = 0;
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new THREE.Color('hsl(0, 0%, 49%)'));
    this.renderer.setSize(this.windowWidth, this.windowheight);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.margin = 'auto';
    this.previewRef.nativeElement.append(this.renderer.domElement);
  }

  configControls() {
    this.controls.autoRotate = false;
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    this.controls.update();
  }

  createGrid() {
    var grid = new THREE.GridHelper(5000, 20, 0xffffff, 0x555555);
    this.scene.add(grid);
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
      this.scene.add(light2);
    }
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());
    this.controls.update();
    if (this.renderer != null) {
      this.renderer.render(this.scene, this.camera);
    } else console.log('renderer is not defined for animate');
  }

  addPallet3D() {
    //removing box before adding new box
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    const material = new THREE.MeshPhongMaterial({
      color: this.pallet.color,
    });

    let tempGeometry = new THREE.BoxBufferGeometry(
      this.pallet.width,
      this.pallet.height,
      this.pallet.length,
      10,
      10,
      10
    );
    let tempPallet3D = null;
    tempPallet3D = new THREE.Mesh(tempGeometry, material);

    //let tempBox3D = new THREE.Mesh( geometry, this.materials );
    tempPallet3D = new THREE.Mesh(tempGeometry, material);
    tempPallet3D.name = 'nazwa';
    this.scene.add(tempPallet3D);

    tempPallet3D.position.x = this.pallet.posX;
    tempPallet3D.position.y = this.pallet.posZ + this.pallet.height / 2;
    tempPallet3D.position.z = -this.pallet.posY;
    tempPallet3D.rotation.y = (Math.PI / 180) * this.pallet.orientation;
    var helper = new THREE.BoxHelper(tempPallet3D, 0x000000);
    this.scene.add(helper);

    /*     description
RoundedBoxGeometry( width , height , depth , radius , radiusSegments )
width = Float           //size of box in x axis, default 1
height = Float          //size of box in y axis, default 1
depth = Float           //size of box in z axis, default 1
radius = Float          //radius of the fillet,  default 0.15
radiusSegments = Int    //segments along the fillet, default 1


var RoundedBoxGeometry = require('three-rounded-box')(THREE); //pass your instance of three

var myBox = new THREE.Mesh( new RoundedBoxGeometry( 10 , 10 , 10 , 2 , 5 ) );

myScene.add(myBox);
*/

    //var RoundedBoxGeometry = require('three-rounded-box')(THREE);
  }

  refresh() {
    this.controls = new OrbitControls(
      this.camera,
      this.previewRef.nativeElement
    );
    this.addPallet3D();
    this.configCamera();
    this.configRenderer();
    this.configControls();
    this.createGrid();
    this.configLight();
    this.renderer.render(this.scene, this.camera);
    this.animate();
    //console.log("this.pallet.isTexture" + this.pallet.isTexture + "typeOf" + typeof(this.pallet.isTexture))
    return 'aaa';
  }
  tabChange($event) {
    //setTimeout(() => {}, 1000);
    this.refresh();
  }
  ngAfterViewInit() {
    //console.log(this.pallet);

    this._portal = new TemplatePortal(
      this._dialogTemplate,
      this._viewContainerRef
    );
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      hasBackdrop: true,
    });
    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());
  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  openDialog() {
    this._overlayRef.attach(this._portal);
    setTimeout(() => {
      this.refresh();
    }, 100);
  }

  ngOnInit() {}

  palletControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  predefinedPallets: PredefinedPallets[] = [
    { name: 'EUR 800x1200x144', width: 800, length: 1200, height: 144 },
    { name: 'EUR6 600x800x144', width: 600, length: 800, height: 144 },
    { name: 'EUR2 1000x1200x144', width: 1000, length: 1200, height: 144 },
  ];
  addPallet() {
    this.appComponent.addPallet();
  }

    writePredefined(event){
      console.log("on change")
      console.log(event.value)
      this.pallet.width = event.value.width;
      this.pallet.length = event.value.length;
      this.pallet.height = event.value.height;
    }
  /*
console(){
  console.log(this.pallet.width);
}
*/
}
