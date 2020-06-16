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
import {Workspace} from '../workspace.model';
import  {SetWorkspaceService} from '../set-workspace.service'




@Component({
  selector: 'app-set-workspace',
  templateUrl: './set-workspace.component.html',
  styleUrls: ['./set-workspace.component.css']

})



export class SetWorkspaceComponent implements AfterViewInit, OnDestroy {

  public workspace: Workspace = {
    width: 5,
    height: 5,
  };



  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(private _overlay: Overlay,
     private _viewContainerRef: ViewContainerRef,
     setWorkspaceService: SetWorkspaceService
     ) {
       setWorkspaceService.workspaceSets = this.workspace;
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
