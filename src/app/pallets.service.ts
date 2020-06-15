import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from './pallet.model';

@Injectable({providedIn: 'root'})
export class PalletsService{
  public pallets: Pallet[] = [];

  //private palletsUpdated  = new Subject<Pallet[]>()


  addPallet(){
/*
    let temp = new Pallet();
    temp.palletName = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = "500";
    this.pallets.push(temp);
    */
    console.log(this.pallets);

    return this.pallets
  }
 // updatePallets(){
 //   return this.palletsUpdated.asObservable();
 // }
}
