
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

import { Kcs } from '../kcs.model';
import { SetKcsService } from '../set-kcs.service';




@Component({
  selector: 'app-set-kcs',
  templateUrl: './set-kcs.component.html',
  styleUrls: ['./set-kcs.component.css']

})



export class SetKcsComponent implements AfterViewInit, OnDestroy {

  public kcs: Kcs = {
    posX: 500,
    posY: 500,
  };



  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(private _overlay: Overlay,
     private _viewContainerRef: ViewContainerRef,
     setKcsService: SetKcsService
     ) {
       setKcsService.kcsSets = this.kcs;
     }

  @Output() saveSettingsButton: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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

