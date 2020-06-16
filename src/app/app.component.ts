import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, ViewChild} from '@angular/core';
import { WorkspaceComponent} from './workspace/workspace.component'

import { Pallet } from './pallet.model';
import { PalletsService } from './pallets.service';
import { SetWorkspaceService } from './set-workspace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'angular-palletizer2';
  @ViewChild(WorkspaceComponent) childWorkspaceComponent: WorkspaceComponent;

  parentsValue = true;
  mobileQuery: MediaQueryList;


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
      public palletsService: PalletsService,
      public setWorkspaceService: SetWorkspaceService,
      ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  public addPalletButton(event: MouseEvent): void {
    this.childWorkspaceComponent.addPallet();
     }

  public setWorkspaceButton(event: MouseEvent):void {
    this.childWorkspaceComponent.setWorkspaceFunc();
    console.log("save settings clicked");
  }

 /*
add(){
  this.palletsService.addPallet();
}
*/
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */

