import { Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
  Output,
  EventEmitter

   } from "@angular/core";
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import { Box } from '../models/box.model';
import { AddBoxService } from '../services/add-box.service';
import { AddPickingPlaceService } from '../services/add-picking-place.service';
import { PalletsService } from '../services/pallets.service';

@Component({
  selector: 'app-add-box',
  templateUrl: './add-box.component.html',
  styleUrls: ['./add-box.component.css']
})

export class AddBoxComponent implements AfterViewInit, OnDestroy {
  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public addBoxervice: AddBoxService,
    public addPickingPlaceService:AddPickingPlaceService,
    public palletService:PalletsService) {
    this.addBoxervice.boxSets = this.box;
  }
  public parentsNames = [];
  selectedParent = this.parentsNames[2];



  readNames(){
    var _ppNames = []
    var _palletsNames = []
    if (this.addPickingPlaceService.pickingPlaces != null){
      for (let index = 0; index < this.addPickingPlaceService.pickingPlaces.length; index++) {
      _ppNames[index] = this.addPickingPlaceService.pickingPlaces[index].name;
      }
    }
    if (this.palletService.pallets != null){
      for (let index = 0; index < this.palletService.pallets.length; index++) {
      _palletsNames[index] = this.palletService.pallets[index].name
      }
    }
   var tempLength=this.addPickingPlaceService.pickingPlaces.length
    for (let index = (tempLength); index < tempLength+_palletsNames.length; index++) {
      _ppNames[index] = _palletsNames[index-_ppNames.length]
      console.log("index=" + index)
    }
  this.parentsNames = _ppNames
  }
check(){
  console.log(this.box.membership)
}
  public box: Box = {
    name: 'Box1',
    id: '1',
    membership: 'membership',
    width: 160,
    length: 240,
    height: 100,
    posX: 3500,
    posY: 2000,
    posZ: 0,
    orientation: 0
  };






@Output() addBoxButton: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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

  openDialog() {
    this._overlayRef.attach(this._portal);
    this.readNames();
  }

  ngOnInit() {

  }


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
