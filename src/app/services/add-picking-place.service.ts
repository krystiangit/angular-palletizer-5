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
    temp.id = (this.pickingPlaces.length+1).toString();
    temp.posX = this.pickingPlaceSets.posX/5;
    temp.posY = this.pickingPlaceSets.posY/5;


    //this.workspace.width= this.workspaceSets.width;
    //this.workspace.height= this.workspaceSets.height;
    this.pickingPlaces.push(temp);
    console.log("picking places" + this.pickingPlaces)
    return this.pickingPlaces


  }
}


