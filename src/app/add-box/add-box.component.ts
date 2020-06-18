
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
import {PalletsService} from '../services/pallets.service'
import { Pallet } from '../models/pallet.model';

interface PredefinedPallet {
  name: string;
}

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
    public palletsService: PalletsService) {
    this.palletsService.palletSets = this.pallet;
  }

  //public pallets: Pallet[] = []

  public pallet: Pallet = {
    name: 'Pallet1',
    id: '1',
    width: 800,
    length: 1200,
    height: 150,
    posX: 700,
    posY: 400,
    posZ: 0,
    orientation:0
  };

  ngAfterViewInit() {
console.log(this.pallet)


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
  }

  ngOnInit() {}

  palletControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  predefinedPallets: PredefinedPallet[] = [
    { name: 'Pallet1' },
    { name: 'Pallet1' },
    { name: 'Pallet1' },
    { name: 'Pallet1' },
    { name: 'Pallet1' },
  ];

  @Output() addBoxButton: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  /*
console(){
  console.log(this.pallet.width);
}
*/
}
