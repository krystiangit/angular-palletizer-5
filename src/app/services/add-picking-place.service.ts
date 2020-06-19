import { Injectable } from '@angular/core';
import { PickingPlace } from '../models/pickingPlace.model';

@Injectable({
  providedIn: 'root'
})
export class AddPickingPlaceService {

  constructor() { }

  public pickingPlaces: PickingPlace[] = [];
  public pickingPlaceSets: PickingPlace;



  addPickingPlace(){
    var temp = new PickingPlace()
    temp.name = 'Picking Place '+(this.pickingPlaces.length+1);
    temp.posX = this.pickingPlaceSets.posX;
    temp.posY = this.pickingPlaceSets.posY;
    //this.workspace.width= this.workspaceSets.width;
    //this.workspace.height= this.workspaceSets.height;
    this.pickingPlaces.push(temp);
    console.log("picking places" + this.pickingPlaces)
    return this.pickingPlaces


  }
}


