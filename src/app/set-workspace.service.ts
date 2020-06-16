import { Injectable } from '@angular/core';


import {Workspace} from './workspace.model';

@Injectable({providedIn: 'root'})
export class SetWorkspaceService{

  public workspace: Workspace;

  setWorkspace(){

return this.workspace;
  }
}
