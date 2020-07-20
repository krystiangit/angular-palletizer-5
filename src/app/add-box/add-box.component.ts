import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
  OnChanges,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Box } from '../models/box.model';
import { AddBoxService } from '../services/add-box.service';
import { AddPickingPlaceService } from '../services/add-picking-place.service';
import { PalletsService } from '../services/pallets.service';
import { AppComponent } from '../app.component';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import BoxJson from '../../assets/box-preset.json';

interface Color {
  name: string;
  value: number;
}

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.css'],
})
export class AddBoxComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  @ViewChild('preview') private previewRef: ElementRef;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public addBoxervice: AddBoxService,
    public addPickingPlaceService: AddPickingPlaceService,
    public palletService: PalletsService,
    public appComponent: AppComponent,

  ) {
    this.addBoxervice.boxSets = this.box;
    (this.scene = new THREE.Scene()),
      (this.camera = new THREE.PerspectiveCamera(
        75,
        this.windowWidth / this.windowheight,
        1,
        10000
      ));
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    //console.log('previewRef' + this.previewRef);
  }
  public mode: string;
  public parentsNames = [];
  public palletsNames = [];
  public ppNames = [];
  public readOnly: boolean;

  //selectedParent = this.parentsNames[2];

  public box: Box = {
    name: 'Box1',
    id: '1',
    membership: 'membership',
    source: 'source',
    layer: 0,
    isTexture: false,
    visible:true,
    width: 400,
    length: 600,
    height: 130,
    posX: 0,
    posY: 0,
    posZ: 0,
    posXParent: 0,
    posYParent: 0,
    posZParent: 0,
    widthParent: 0,
    lengthParent: 0,
    heightParent: 0,
    orientation: 0,
    color: 0xff0000,
  };
  public colors: Color[] = [
    { name: 'red', value: 0xff0000 },
    { name: 'light green', value: 0x00ff00 },
    { name: 'dark green', value: 0x206600 },
    { name: 'yellow', value: 0xffff00 },
    { name: 'orange', value: 0xff6600 },
    { name: 'light blue', value: 0x00a2ff },
    { name: 'dark blue', value: 0x0400ff },
  ];

  scene = null;
  camera = null;
  controls = null;
  renderer = null;
  windowWidth = 290;
  windowheight = 290;

  configCamera() {
    this.camera.position.z = 300;
    this.camera.position.y = 400;
    this.camera.position.x = 300;
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

  takeParentPos() {
    for (
      let index = 0;
      index < this.addPickingPlaceService.pickingPlaces.length;
      index++
    ) {
      if (
        this.addPickingPlaceService.pickingPlaces[index].name ===
        this.box.membership
      ) {
        this.box.posXParent = this.addPickingPlaceService.pickingPlaces[
          index
        ].posX;
        this.box.posYParent = this.addPickingPlaceService.pickingPlaces[
          index
        ].posY;
        this.box.posZParent = this.addPickingPlaceService.pickingPlaces[
          index
        ].posZ;
        this.box.widthParent = 0;
        this.box.lengthParent = 0;
        this.box.heightParent = 0;
      }
    }
    for (let index = 0; index < this.palletService.pallets.length; index++) {
      if (this.palletService.pallets[index].name === this.box.membership) {
        this.box.posXParent = this.palletService.pallets[index].posX;
        this.box.posYParent = this.palletService.pallets[index].posY;
        this.box.posZParent = this.palletService.pallets[index].posZ - this.palletService.pallets[index].height/2;
        this.box.widthParent = this.palletService.pallets[index].width;
        this.box.lengthParent = this.palletService.pallets[index].length;
        this.box.heightParent = this.palletService.pallets[index].height;
        //console.log("parent is Pallet")
      }
      //console.log("parent is: " + this.box.membership)
      //console.log(this.addPickingPlaceService.pickingPlaces[index].posX)
    }
  }

  takeParentDim() {
    for (
      let index = 0;
      index < this.addBoxervice.boxesOfPickingPlace.length;
      index++
    ) {
      if (
        this.addBoxervice.boxesOfPickingPlace[index].membership ===
        this.box.source
      ) {
        this.box.width = this.addBoxervice.boxesOfPickingPlace[index].width;
        this.box.length = this.addBoxervice.boxesOfPickingPlace[index].length;
        this.box.height = this.addBoxervice.boxesOfPickingPlace[index].height;
        this.box.color = this.addBoxervice.boxesOfPickingPlace[index].color;
        this.box.isTexture = this.addBoxervice.boxesOfPickingPlace[index].isTexture;
        console.log(
          'colors of boxes: ' +
            this.addBoxervice.boxesOfPickingPlace[index].color
        );
        //console.log("finded")
      }

      //console.log("addbox service source: " + this.box.source)
      //console.log("addbox service membership: " + this.box.membership)
    }
    //console.log("parent is picking place")
  }

  readNames() {
    var _ppNames = [];
    var _palletsNames = [];

    if (this.addPickingPlaceService.pickingPlaces != null) {
      for (
        let index = 0;
        index < this.addPickingPlaceService.pickingPlaces.length;
        index++
      ) {
        _ppNames[index] = this.addPickingPlaceService.pickingPlaces[index].name;

      }
    }

    this.ppNames = _ppNames;

    if (this.palletService.pallets != null) {

      for (let index = 0; index < this.palletService.pallets.length; index++) {
        _palletsNames[index] = this.palletService.pallets[index].name;
        //console.log("_palletsnames" + this.palletService.pallets[index].name)
        console.log("iteracja pallet")
      }
    }

    this.palletsNames = _palletsNames;
    /*
    var tempLength = this.addPickingPlaceService.pickingPlaces.length;
    for (
      let index = tempLength;
      index < tempLength + _palletsNames.length;
      index++
    ) {
      _ppNames[index] = this.palletService.pallets[index - this.addPickingPlaceService.pickingPlaces.length].name;
      console.log('index=' +( index - this.addPickingPlaceService.pickingPlaces.length));
      //console.log(this.palletService.pallets[index - _ppNames.length].name)
    }
    */
    //this.parentsNames = _ppNames;
    console.log('pallet names: ' + this.palletsNames);
    console.log('ppnames: ' + this.ppNames);
    console.log('all names: ' + this.parentsNames);
    //console.log("pallets: " + this.palletService.pallets)
    //console.log("picking places: " + this.addPickingPlaceService.pickingPlaces)
    /*
    for (let index = 0; index < this.addPickingPlaceService.pickingPlaces.length; index++) {
      console.log("picking places for: " + this.addPickingPlaceService.pickingPlaces[index].name)
      console.log("pallets for: " + this.palletService.pallets[index].name)
    }
    */
  }
  //calling takeParentPos when tab is changed to tab Position

  /*tabChange($event){
    console.log($event.index)
    if($event.index ==1)
    this.takeParentPos();
}*/

  parentChange($event) {
    //console.log("selection change" + $event)
    this.takeParentPos();
  }

  sourceChange($event) {
    this.takeParentDim();
  }

  definedInChange($event) {
    this.takeParentPos();
  }

  colorChange($event) {
    //console.log("color change" + $event)
  }

  AddBox() {
    //this.takeParentPos();
    //console.log("AddBox membership" +this.box.membership)

    if (this.box.membership.search('Pallet') == 0) {
      this.appComponent.addBoxOfPallet();
    } else if (this.box.membership.search('Picking') == 0) {
      this.appComponent.addBoxOfPp();
    } else alert('Plase choose a Parent in membership tab');
  }

  /*
  @Output() addBoxButton: EventEmitter<MouseEvent> = new EventEmitter<
    MouseEvent
  >();
*/

  addBox3D() {
    //removing box before adding new box
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    const material = new THREE.MeshPhongMaterial({
      color: this.box.color,
    });

    const materials = [
      new THREE.MeshLambertMaterial({
          map: new THREE.TextureLoader().load('../../assets/Fabric_09_1K_Opacity.png') //right
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../../assets/Fabric_09_1K_Opacity.png') //left
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../../assets/cargill.jpg') //top
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../../assets/Fabric_09_1K_Opacity.png') //bottom
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../../assets/Fabric_09_1K_Opacity.png') //front
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../../assets/Fabric_09_1K_Opacity.png') //back
      })
];


    let tempGeometry = new THREE.BoxBufferGeometry(
      this.box.width,
      this.box.height,
      this.box.length,
      10,
      10,
      10
    );
    let tempBox3D = null
    if (this.box.isTexture===true){
      tempBox3D = new THREE.Mesh(tempGeometry, materials);
    }
    else

    //let tempBox3D = new THREE.Mesh( geometry, this.materials );
    tempBox3D = new THREE.Mesh(tempGeometry, material);
    tempBox3D.name = "nazwa"
    this.scene.add(tempBox3D);

    tempBox3D.position.x = this.box.posX;
    tempBox3D.position.y = this.box.posZ + this.box.height/2;
    tempBox3D.position.z = -this.box.posY;
    tempBox3D.rotation.y = (Math.PI / 180) * this.box.orientation;
    var helper = new THREE.BoxHelper(tempBox3D, 0x000000)
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

/*
  deleteObject(){
    console.log("removing")
this.scene.remove(this.scene.getObjectByName("nazwa"))
  }
*/
  refresh() {
    this.controls = new OrbitControls(
      this.camera,
      this.previewRef.nativeElement
    );
    this.addBox3D();
    this.configCamera();
    this.configRenderer();
    this.configControls();
    this.createGrid();
    this.configLight();
    this.renderer.render(this.scene, this.camera);
    this.animate();
    return "aaa"
  }
  tabChange($event) {
    //setTimeout(() => {}, 1000);
    this.refresh();
  }

  openDialog(_mode: string) {
    this.readNames();
    this.mode = _mode;
    if (_mode === 'add') {
      this.readOnly = true;
    } else this.readOnly = false;
    console.log('readOnly: ' + this.readOnly);

    this._overlayRef.attach(this._portal);
  }






  ngOnInit() {}

  ngAfterViewInit() {
    //console.log(this.box)
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

}
