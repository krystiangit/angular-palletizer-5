import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from './pallet.model';

@Injectable({providedIn: 'root'})
export class PalletsService{

  public pallets: Pallet[] = [];
  public palletSets : Pallet;
  //private palletsUpdated  = new Subject<Pallet[]>()
  addPallet(){


//if (this.pallets.length>0)


    let temp = new Pallet();
    temp.palletName = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = this.palletSets.width/5;
    temp.length = this.palletSets.length/5;
    temp.height = this.palletSets.height/5;
    temp.posX = this.palletSets.posX;
    temp.posY = this.palletSets.posY;
    temp.posZ = this.palletSets.posZ;
    this.pallets.push(temp);
    return this.pallets;

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
