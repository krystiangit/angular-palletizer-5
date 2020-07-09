import { Injectable } from '@angular/core';


import {Workspace} from '../models/workspace.model';
import {ConfigService} from './config.service'

@Injectable({providedIn: 'root'})
export class SetWorkspaceService{

  public workspace: Workspace;
  public workspaceSets: Workspace;

  setWorkspace(){
    var temp = new Workspace()
    temp.width = this.workspaceSets.width*1000;
    temp.height = this.workspaceSets.height*1000;
    //this.workspace.width= this.workspaceSets.width;
    //this.workspace.height= this.workspaceSets.height;
    return this.workspace = temp;
  }
}
