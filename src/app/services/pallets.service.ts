import { Injectable, AfterViewInit } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from '../models/pallet.model';
import { Position3D }  from '../models/position3D'
import * as THREE from 'three'



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


  geometries:THREE.BoxGeometry[]

  pallets3D = [];
  public positions3D :Position3D[] = []
  helpersOfPallet = [];



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
    temp.orientation = this.palletSets.orientation;
    temp.color = this.palletSets.color;
    this.pallets.push(temp);
    console.log("from service pallets" +this.pallets)
    console.log("from service palletSets" +this.palletSets)
    console.log("from service temp" + temp)
    return this.pallets;


  }




  addPallet3D(){
    const material = new THREE.MeshPhongMaterial({ color: this.palletSets.color });
    let tempGeometry = new THREE.BoxGeometry(this.palletSets.width, this.palletSets.height, this.palletSets.length);

    let tempPallet3D = new THREE.Mesh(tempGeometry, material);

    tempPallet3D.position.x=this.palletSets.posX
    tempPallet3D.position.y=this.palletSets.posZ+this.palletSets.height/2;
    tempPallet3D.position.z=-this.palletSets.posX
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
