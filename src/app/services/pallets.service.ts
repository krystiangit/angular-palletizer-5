import { Injectable, AfterViewInit } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from '../models/pallet.model';
import { Position3D }  from '../models/position3D'
import * as THREE from 'three'
import { saveAs } from 'file-saver';
import palletsJson from '../../assets/pallets.json'
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PalletsService implements AfterViewInit{
  public palletSets : Pallet
  public color;
  //material = null;
  ngAfterViewInit(){
this.color = this.palletSets.color
  }
  ngOnInit(){
  }

  public pallets: Pallet[] = [];

  constructor(private httpClient: HttpClient){

  }
  geometries:THREE.BoxGeometry[]

  pallets3D = [];
  public positions3D :Position3D[] = []
  helpersOfPallet = [];
  test:any = []

  addPallet(){
    let temp = new Pallet();
    temp.name = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = this.palletSets.width;
    temp.length = this.palletSets.length;
    temp.height = this.palletSets.height;
    temp.posX = this.palletSets.posX;
    temp.posY = this.palletSets.posY
    temp.posZ = (this.palletSets.posZ+this.palletSets.height/2)
    temp.orientation = this.palletSets.orientation;




    temp.color = this.palletSets.color;
    this.pallets.push(temp);
    //console.log("from service pallets" +this.pallets)
    //console.log("from service palletSets" +this.palletSets)
    //console.log("from service temp" + temp)
    return this.pallets;
  }

  addPallet3D(){
    const material = new THREE.MeshPhongMaterial({ color: this.palletSets.color });
    let tempGeometry = new THREE.BoxGeometry(this.palletSets.width, this.palletSets.height, this.palletSets.length);
    let tempPallet3D = new THREE.Mesh(tempGeometry, material);
    tempPallet3D.position.x=this.palletSets.posX
    tempPallet3D.position.y=this.palletSets.posZ+this.palletSets.height/2;
    tempPallet3D.position.z=-this.palletSets.posY
    tempPallet3D.rotation.y=this.palletSets.orientation*(Math.PI/180);
    this.pallets3D.push(tempPallet3D);
    return this.pallets3D;
  }

  addHelper3D(){
      var tempHelper = null
      tempHelper = new THREE.BoxHelper(this.pallets3D[this.pallets3D.length-1], 0x000000)
      tempHelper.name=this.pallets[this.pallets.length-1].name + "helper"
      this.helpersOfPallet.push(tempHelper);
      return this.helpersOfPallet
  }


saveToJson(){
    let _palletsJson = JSON.stringify(this.pallets);
    const blob1 = new Blob([_palletsJson], {type : 'application/json'});
    saveAs(blob1, 'pallets.json');
}

postPallets(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
  };
  //const urlPallets='http://127.0.0.1:32769/api/pallets'
  const urlPallets='/api/pallets'
    this.httpClient.post(urlPallets,JSON.stringify(this.pallets), httpOptions ).toPromise().then(data=> console.log(data))

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

getPallets():Promise<any>{
  return new Promise((resolve) => {
    //console.log('reaches');
    //this.fetchData('http://127.0.0.1:32769/api/pallets').then(data => {
  this.fetchData('/api/pallets').then(data => {
    this.test = data;
    //console.log("test: ...")
    //console.log(JSON.stringify(this.test));
  });
    resolve();
});

}




loadProject(){

  this.pallets  = []
  this.pallets3D = []
  //this.getPallets();
  //let _pallets = JSON.parse(JSON.stringify(palletsJson));
  //this.pallets = _pallets;
  this.pallets = JSON.parse(JSON.stringify(this.test));
  const material = new THREE.MeshPhongMaterial({
    color: this.palletSets.color,
  });

    let tempPallet3D = null
    var tempHelper = null

for (let index = 0; index < this.pallets.length; index++) {
  let tempGeometry = new THREE.BoxBufferGeometry(
    this.pallets[index].width,
    this.pallets[index].height,
    this.pallets[index].length,
    10,10,10
    );
    tempPallet3D = new THREE.Mesh(tempGeometry, material);
    tempPallet3D.position.x=this.pallets[index].posX;
    tempPallet3D.position.y=(this.pallets[index].posZ);
    tempPallet3D.position.z=-(this.pallets[index].posY);
    tempPallet3D.rotation.y=this.pallets[index].orientation*(Math.PI/180);
    //console.log("orientation of pallet: "  + this.pallets[index].orientation)
        this.pallets3D.push(tempPallet3D);
        tempHelper = new THREE.BoxHelper(this.pallets3D[index], 0x000000)
        tempHelper.name=this.pallets[index].name + "helper"
        this.helpersOfPallet.push(tempHelper);
    }




}



 // updatePallets(){
 //   return this.palletsUpdated.asObservable();
 // }
}




/*
let temp = new Pallet();
    temp.palletName = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = "500";

    this.pallets.push(temp);


    console.log("paleta" + this.pallet.width);
    console.log("palety" + this.pallets);
    return this.pallets;

    */
