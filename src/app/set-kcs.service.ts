import { Injectable } from '@angular/core';
import { Kcs } from './kcs.model';

@Injectable({
  providedIn: 'root'
})
export class SetKcsService {

  constructor() { }

  public kcs: Kcs;
  public kcsSets: Kcs;

  setKcs(){
    var temp = new Kcs()
    temp.posX = this.kcsSets.posX;
    temp.posY = this.kcsSets.posY;
    //this.workspace.width= this.workspaceSets.width;
    //this.workspace.height= this.workspaceSets.height;
    return this.kcs = temp;
  }
}






