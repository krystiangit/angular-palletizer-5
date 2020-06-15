import { Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

import {Pallet} from './pallet.model';

@Injectable({providedIn: 'root'})
export class PalletsService{
  private pallets: Pallet[] = [];
  //private palletsUpdated  = new Subject<Pallet[]>()

  addPallet(){

    let temp = new Pallet();
    temp.palletName = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = "500";
    this.pallets.push(temp);
    //var _pallet = document.getElementById((this.pallets.length).toString())

    //console.log(document);
    //console.log(this.pallets.length)
    //console.log(_pallet);

    return this.pallets
  }
 // updatePallets(){
 //   return this.palletsUpdated.asObservable();
 // }
}
