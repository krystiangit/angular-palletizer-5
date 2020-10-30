import { Component, OnInit, ElementRef, ViewChild, ViewContainerRef, AfterViewInit, TemplateRef} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Connection } from '../models/connection.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { AddBoxService } from '../services/add-box.service';
import { AddPickingPlaceService } from '../services/add-picking-place.service';
import { PalletsService } from '../services/pallets.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-plc-connect',
  templateUrl: './plc-connect.component.html',
  styleUrls: ['./plc-connect.component.css'],
})
export class PlcConnectComponent implements OnInit {

  @ViewChild(TemplateRef) _dialogTemplate: TemplateRef<any>;
  @ViewChild('preview') private previewRef: ElementRef;
  private _overlayRef: OverlayRef;
  private _portal: TemplatePortal;

  constructor(private httpClient: HttpClient,
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef,
    public addBoxervice: AddBoxService,
    public addPickingPlaceService: AddPickingPlaceService,
    public palletService: PalletsService,
    public appComponent: AppComponent
    ) {}

  public connection: Connection = { ip: '192.168.1.5', rack: 0, slot: 1 };

  sendToPLC(){
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json',
        //'Authorization': 'my-auth-token'
      }),
    };
    const url = '/api/send-to-plc';

    this.httpClient
      .post(url, 'sending data to PLC', httpOptions)
      .toPromise()
      .then((data) => {

        //console.log(data)
      }).catch((error)=>{console.log(error)});

  }

  openDialog() {

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
