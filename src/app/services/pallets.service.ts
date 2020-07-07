import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from '../models/pallet.model';
import { Position3D }  from '../models/position3D'
import * as THREE from 'three'


@Injectable({providedIn: 'root'})
export class PalletsService{

  public pallets: Pallet[] = [];
  public palletSets : Pallet;

  geometries:THREE.BoxGeometry[]
  material = new THREE.MeshPhongMaterial({ color: 0xff7f50 });
  pallets3D = [];
  public positions3D :Position3D[] = []


  //private palletsUpdated  = new Subject<Pallet[]>()
  addPallet(){


//if (this.pallets.length>0)


    let temp = new Pallet();
    //let temp:Pallet

    temp.name = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = this.palletSets.width;
    temp.length = this.palletSets.length;
    temp.height = this.palletSets.height;
    temp.posX = this.palletSets.posX;
    temp.posY = this.palletSets.posY;
    temp.posZ = this.palletSets.posZ;
    this.pallets.push(temp);
    console.log("from service pallets" +this.pallets)
    console.log("from service palletSets" +this.palletSets)
    console.log("from service temp" + temp)
    return this.pallets;


  }




  addPallet3D(){
    let tempGeometry = new THREE.BoxGeometry(this.palletSets.width, this.palletSets.height, this.palletSets.length);

    let tempPallets3D = new THREE.Mesh(tempGeometry, this.material);
    this.pallets3D.push(tempPallets3D);

    console.log("pallets3d from serive: " + this.pallets3D);
    return this.pallets3D;

  }
  addPosition3D(){
    let tempPosition3D  = new Position3D()
    tempPosition3D.posX = this.palletSets.posX;
    tempPosition3D.posY = this.palletSets.posY;
    tempPosition3D.posZ = this.palletSets.posZ;
    this.positions3D.push(tempPosition3D)
    console.log("positions form service: " + this.positions3D)
    return this.positions3D;
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
