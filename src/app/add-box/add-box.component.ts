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
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Box } from '../models/box.model';
import { AddBoxService } from '../services/add-box.service';
import { AddPickingPlaceService } from '../services/add-picking-place.service';
import { PalletsService } from '../services/pallets.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.css'],
})
export class AddBoxComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public addBoxervice: AddBoxService,
    public addPickingPlaceService: AddPickingPlaceService,
    public palletService: PalletsService,
    public appComponent: AppComponent
  ) {
    this.addBoxervice.boxSets = this.box;
  }
  public mode: string
  public parentsNames = [];
  public palletsNames = [];
  public ppNames = [];
  public readOnly:boolean;
  //selectedParent = this.parentsNames[2];
  public box: Box = {
    name: 'Box1',
    id: '1',
    membership: 'membership',
    source:'source',
    width: 160,
    length: 240,
    height: 100,
    posX: 0,
    posY: 0,
    posZ: 0,
    posXParent: 0,
    posYParent: 0,
    posZParent: 0,
    orientation: 0,
  };



  takeParentPos(){
    for (let index = 0; index < this.addPickingPlaceService.pickingPlaces.length; index++) {
      if(this.addPickingPlaceService.pickingPlaces[index].name===this.box.membership){
        this.box.posXParent = this.addPickingPlaceService.pickingPlaces[index].posX
        this.box.posYParent = this.addPickingPlaceService.pickingPlaces[index].posY
        this.box.posZParent = this.addPickingPlaceService.pickingPlaces[index].posZ
        //console.log("parent is picking place")
      }

    }
    for (let index = 0; index < this.palletService.pallets.length; index++) {
      if(this.palletService.pallets[index].name===this.box.membership){
        this.box.posXParent = this.palletService.pallets[index].posX
        this.box.posYParent = this.palletService.pallets[index].posY
        this.box.posZParent = this.palletService.pallets[index].posZ
        //console.log("parent is Pallet")
      }
console.log("parent is: " + this.box.membership)
      //console.log(this.addPickingPlaceService.pickingPlaces[index].posX)

    }

  }

  takeParentDim(){
    for (let index = 0; index < this.addBoxervice.boxesOfPickingPlace.length; index++) {
      if(this.addBoxervice.boxesOfPickingPlace[index].membership===this.box.source){
        this.box.width = this.addBoxervice.boxesOfPickingPlace[index].width*5;
        this.box.length = this.addBoxervice.boxesOfPickingPlace[index].length*5;
        this.box.height = this.addBoxervice.boxesOfPickingPlace[index].height*5;
console.log("finded")
      }
      console.log("addbox service source: " + this.box.source)
      console.log("addbox service membership: " + this.box.membership)

  }
  console.log("parent is picking place")
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
    console.log("pallet names: " + this.palletsNames);
    console.log("ppnames: " + this.ppNames);
    console.log("all names: " + this.parentsNames)
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

parentChange($event){
  //console.log("selection change" + $event)
  this.takeParentPos();
}

sourceChange($event){
  this.takeParentDim()
}

definedInChange($event){
  this.takeParentPos();
}

  AddBox() {
    //this.takeParentPos();
    //console.log("AddBox membership" +this.box.membership)

    if (this.box.membership.search('Pallet') == 0) {
      this.appComponent.addBoxOfPallet();
    }
    else
    if (this.box.membership.search('Picking') == 0) {
      this.appComponent.addBoxOfPp();
    }
    else
    alert("Plase choose a Parent in membership tab")
  }

  @Output() addBoxButton: EventEmitter<MouseEvent> = new EventEmitter<
    MouseEvent
  >();

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

  openDialog(_mode:string) {

    this.readNames();
    this.mode=_mode
    if (_mode==="add"){this.readOnly=true}
    else this.readOnly=false;
    console.log("readOnly: " + this.readOnly)

    this._overlayRef.attach(this._portal);
  }

  ngOnInit() {}

  /*
  palletControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  predefinedPallets: PredefinedPallet[] = [
    { name: 'Pallet1' },
    { name: 'Pallet1' },
    { name: 'Pallet1' },
    { name: 'Pallet1' },
    { name: 'Pallet1' },
  ];
*/

  /*
console(){
  console.log(this.pallet.width);
}
*/
}
