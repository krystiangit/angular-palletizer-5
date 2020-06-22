
import { Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
  Output,
  EventEmitter

   } from "@angular/core";
import {FormControl, Validators} from '@angular/forms';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import { Box } from '../models/box.model';
import { AddBoxService } from '../services/add-box.service';
import { AddPickingPlaceService } from '../services/add-picking-place.service';


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
    //public pickingPlace:PickingPlace
    ) {
    this.addBoxervice.boxSets = this.box;

  }

  public box: Box = {
    name: 'Box1',
    id: '1',
    membership: 'PP1',
    width: 160,
    length: 240,
    height: 100,
    posX: 3500,
    posY: 2000,
    posZ: 0,
    orientation: 0
  };

  public ppNames = [

  ];



readPickingPlaces(){
  console.log("aaaa" +this.addPickingPlaceService.pickingPlaces)
  if (this.addPickingPlaceService.pickingPlaces != null){
    console.log(this.addPickingPlaceService.pickingPlaces)
    this.addBoxervice.pps = this.addPickingPlaceService.pickingPlaces;
    for (let index = 0; index < this.addPickingPlaceService.pickingPlaces.length; index++) {
    this.ppNames[index] = this.addPickingPlaceService.pickingPlaces[index].name;
    }
  }

}

  //public pp: PickingPlace [] = []

  selectedParent = this.ppNames[2];

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
    this.readPickingPlaces();
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
