import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule} from '@angular/material/expansion';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddPalletComponent } from './add-pallet/add-pallet.component';
import { DemoMaterialModule } from "../app/material-module";
import { SetWorkspaceComponent } from "./set-workspace/set-workspace.component";
import { AddBoxComponent } from './add-box/add-box.component';
import { AddPickingPlaceComponent } from './add-picking-place/add-picking-place.component';
import { MeshComponent } from './mesh/mesh.component';
import { PlcConnectComponent } from './plc-connect/plc-connect.component';
import { DefineTrayComponent } from './define-tray/define-tray.component';

const Routes = [
  {
path:'',
//redirectTo: 'api',
redirectTo: '',
pathMatch: 'full'
  },
  {
    //path: 'api', component: AppComponent
    path: 'api', component: AppComponent
  }
]




@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,

    AddPalletComponent,
    SetWorkspaceComponent,
    AddBoxComponent,
    AddPickingPlaceComponent,
    MeshComponent,
    PlcConnectComponent,
    DefineTrayComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Routes)


  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent],

  entryComponents: [AppComponent],





})
export class AppModule { }

