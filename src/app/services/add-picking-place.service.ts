import { Injectable } from '@angular/core';
import { PickingPlace } from '../models/pickingPlace.model';
import { Position3D }  from '../models/position3D'
import * as THREE from 'three'
import { saveAs } from 'file-saver';
import ppsJson from '../../assets/picking-places.json'
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AddPickingPlaceService {

  constructor(private httpClient: HttpClient){
  }
test:any = [];
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
    //e.log("picking places" + this.pickingPlaces)
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

postPps(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };
  //const urlPps='http://127.0.0.1:32769/api/picking-places'
  const urlPps='/api/picking-places'
    this.httpClient.post(urlPps,JSON.stringify(this.pickingPlaces), httpOptions ).toPromise().then(data=> console.log(data))

  }

fetchData(url:string): Promise<any> {
  return this.httpClient
  .get(url).toPromise()
  .then((response)=>{
    return response;
  })
  .catch((error)=>{
    console.log(error)
  })
}

getPps():Promise<any>{

  return new Promise((resolve) => {
    //
    // Your function implementation
    //

  //console.log('reaches');
  //this.fetchData('http://127.0.0.1:32769/api/picking-places').then(data => {
  this.fetchData('/api/picking-places').then(data => {
    this.test = data;
    //console.log("test: ...")
    //console.log(JSON.stringify(this.test));
  });
     // Resolve the promise at the end
     resolve();
    });
}



loadProject(){

this.pickingPlaces = []
this.pps3D=[]
//this.getPps();

  //let _pps = JSON.parse(JSON.stringify(ppsJson));
  //this.pickingPlaces = _pps;
  this.pickingPlaces = JSON.parse(JSON.stringify(this.test));


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


