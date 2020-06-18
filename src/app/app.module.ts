import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
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


import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AddPalletComponent } from './add-pallet/add-pallet.component';
import { DemoMaterialModule } from "./left-navbar/material-module";
import { SetWorkspaceComponent } from "./set-workspace/set-workspace.component";
import { WorkspaceComponent } from "./workspace/workspace.component";
import { SetKcsComponent } from './set-kcs/set-kcs.component';
import { AddBoxComponent } from './add-box/add-box.component';






@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,

    AddPalletComponent,
    SetWorkspaceComponent,
    WorkspaceComponent,
    SetKcsComponent,
    AddBoxComponent,





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



    ReactiveFormsModule


  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },],
  bootstrap: [AppComponent],

  entryComponents: [AppComponent],





})
export class AppModule { }

