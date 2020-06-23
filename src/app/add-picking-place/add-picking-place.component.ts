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
import { PickingPlace } from '../models/pickingPlace.model';
import { AddPickingPlaceService } from '../services/add-picking-place.service';


@Component({
  selector: 'app-add-picking-place',
  templateUrl: './add-picking-place.component.html',
  styleUrls: ['./add-picking-place.component.css']

})


export class AddPickingPlaceComponent implements AfterViewInit, OnDestroy {

  public pickingPlace: PickingPlace = {
    name: "picking place 1",
    posX: 1000,
    posY: 1000,
    posZ: 0
  };



  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(private _overlay: Overlay,
     private _viewContainerRef: ViewContainerRef,
     public addPickingPlaceService: AddPickingPlaceService
     ) {
      this.addPickingPlaceService.pickingPlaceSets= this.pickingPlace;
     }



  @Output() addPickingPlaceButton: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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




}

