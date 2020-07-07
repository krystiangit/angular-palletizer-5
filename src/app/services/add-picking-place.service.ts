import { Injectable } from '@angular/core';
import { PickingPlace } from '../models/pickingPlace.model';
import { Position3D }  from '../models/position3D'
import * as THREE from 'three'
@Injectable({
  providedIn: 'root'
})
export class AddPickingPlaceService {

  constructor() { }

  public pickingPlaces: PickingPlace[] = [];
  public pickingPlaceSets: PickingPlace;
  geometries:THREE.BoxGeometry[]
  material = new THREE.MeshPhongMaterial({ color: 0xff7f50 });
  pps3D = [];
  public positions3D :Position3D[] = []


  addPickingPlace(){
    var temp = new PickingPlace()
    temp.name = 'Picking Place '+(this.pickingPlaces.length+1);
    temp.id = (this.pickingPlaces.length+1).toString();
    temp.posX = this.pickingPlaceSets.posX;
    temp.posY = this.pickingPlaceSets.posY;
    temp.posZ = this.pickingPlaceSets.posZ;


    //this.workspace.width= this.workspaceSets.width;
    //this.workspace.height= this.workspaceSets.height;
    this.pickingPlaces.push(temp);
    console.log("picking places" + this.pickingPlaces)
    return this.pickingPlaces


  }



  addPp3D(){
    let tempGeometry = new THREE.BoxGeometry(50, 0, 50);

    let tempPps3D = new THREE.Mesh(tempGeometry, this.material);
    this.pps3D.push(tempPps3D);

    console.log("pps3d from serive: " + this.pps3D);
    return this.pps3D;

  }
  addPosition3D(){
    let tempPosition3D  = new Position3D()
    tempPosition3D.posX = this.pickingPlaceSets.posX;
    tempPosition3D.posY = this.pickingPlaceSets.posY;
    tempPosition3D.posZ = this.pickingPlaceSets.posZ;
    this.positions3D.push(tempPosition3D)
    console.log("positions form service: " + this.positions3D)
    return this.positions3D;
  }
}


