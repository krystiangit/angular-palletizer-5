import { Injectable } from '@angular/core';
import { PickingPlace } from '../models/pickingPlace.model';
import { Position3D }  from '../models/position3D'
import * as THREE from 'three'
import { saveAs } from 'file-saver';
import ppsJson from '../../assets/picking-places.json'

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

    tempPps3D.position.x = this.pickingPlaceSets.posX;
    tempPps3D.position.y = this.pickingPlaceSets.posZ;
    tempPps3D.position.z = -this.pickingPlaceSets.posY


    this.pps3D.push(tempPps3D);

    console.log("pps3d from serive: " + this.pps3D);
    return this.pps3D;
  }
  /*
  addPosition3D(){
    let tempPosition3D  = new Position3D()
    tempPosition3D.posX = this.pickingPlaceSets.posX;
    tempPosition3D.posY = this.pickingPlaceSets.posY;
    tempPosition3D.posZ = this.pickingPlaceSets.posZ;
    this.positions3D.push(tempPosition3D)
    console.log("positions form service: " + this.positions3D)
    return this.positions3D;
  }
*/


  saveToJson(){
    let _PpsJson = JSON.stringify(this.pickingPlaces);
    const blob1 = new Blob([_PpsJson], {type : 'application/json'});
    saveAs(blob1, 'picking-places.json');
}

loadProject(){

this.pickingPlaces = []
this.pps3D=[]

  let _pps = JSON.parse(JSON.stringify(ppsJson));
  this.pickingPlaces = _pps;



    let tempPp3D = null


for (let index = 0; index < this.pickingPlaces.length; index++) {
  let tempGeometry = new THREE.BoxBufferGeometry(50,0,50);
  tempPp3D = new THREE.Mesh(tempGeometry, this.material);
  tempPp3D.position.x=this.pickingPlaces[index].posX;
  tempPp3D.position.y=(this.pickingPlaces[index].posZ);
  tempPp3D.position.z=-(this.pickingPlaces[index].posY);

        this.pps3D.push(tempPp3D);

    }




}








}


