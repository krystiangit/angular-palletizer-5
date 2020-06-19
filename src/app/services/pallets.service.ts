import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from '../models/pallet.model';

@Injectable({providedIn: 'root'})
export class PalletsService{

  public pallets: Pallet[] = [];
  public palletSets : Pallet;
  //private palletsUpdated  = new Subject<Pallet[]>()
  addPallet(){


//if (this.pallets.length>0)


    let temp = new Pallet();
    //let temp:Pallet

    temp.name = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = this.palletSets.width/5;
    temp.length = this.palletSets.length/5;
    temp.height = this.palletSets.height/5;
    temp.posX = this.palletSets.posX/5;
    temp.posY = this.palletSets.posY/5;
    temp.posZ = this.palletSets.posZ/5;
    this.pallets.push(temp);
    console.log("from service pallets" +this.pallets)
    console.log("from service palletSets" +this.palletSets)
    console.log("from service temp" + temp)
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
