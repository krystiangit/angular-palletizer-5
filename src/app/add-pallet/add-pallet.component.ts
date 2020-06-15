import { Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,

   } from "@angular/core";
import {FormControl, Validators} from '@angular/forms';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {PalletsService} from '../pallets.service'

interface PredefinedPallet {
  name: string;
}

@Component({
  selector: 'app-add-pallet',
  templateUrl: './add-pallet.component.html',
  styleUrls: ['./add-pallet.component.css']

})

export class AddPalletComponent implements AfterViewInit, OnDestroy {

  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(private _overlay: Overlay, private _viewContainerRef: ViewContainerRef, public palletsService: PalletsService) {}

  ngAfterViewInit() {
    this._portal = new TemplatePortal(this._dialogTemplate, this._viewContainerRef);
    this._overlayRef = this._overlay.create({
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    this._overlayRef.backdropClick().subscribe(() => this._overlayRef.detach());

  }

  ngOnDestroy() {
    this._overlayRef.dispose();
  }

  openDialog() {
    this._overlayRef.attach(this._portal);
  }

  ngOnInit (){}


  palletControl = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  pallets: PredefinedPallet[] = [
    {name: 'Pallet1'},
    {name: 'Pallet1'},
    {name: 'Pallet1'},
    {name: 'Pallet1'},
    {name: 'Pallet1'},
  ];



}
