


import { Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
  OnChanges,
  Input,
OnInit
   } from "@angular/core";
//import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
//import { transition } from '@angular/animations';
import { Pallet } from '../pallet.model';
import { PalletsService } from '../pallets.service'
//import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-test-child',
  templateUrl: './test-child.component.html',
  styleUrls: ['./test-child.component.css']

})

export class TestChildComponent implements OnInit{
  @Input() parentsValue:boolean;
  getPosValY="";
  getPosValX="";
  setPosValY="400px";
  setPosValX="400px";
  containers = [];
  pallets: Pallet[] = [];


  constructor(public palletsService: PalletsService) {};

/*
  ngOnChanges() {

    this.pallets = this.palletsService.addPallet();
    this.push();
  }
*/
  _width = "300px";

  ngOnInit(){

    console.log(this.pallets.length);
    //this.palletsService.updatePallets();
    }

  push(){
    console.log("before" + this.pallets)
    this.pallets = this.palletsService.addPallet();
    console.log("after" +this.pallets)
  }

  addPallet1(){

    let temp = new Pallet();
    temp.palletName = 'Pallet'+(this.pallets.length+1);
    temp.id=(this.pallets.length+1).toString();
    temp.width = "500";
    this.pallets.push(temp);

  return this.pallets

    //console.log(this.pallets.length)
    //console.log(document);
    console.log(temp);
    //console.dir(temp)
    //_pallet.style.width = width;
    //_pallet.style.height = height;

  }

 getPos(_id){

  var _btn3=document.getElementById("btn3");
  this.getPosValY = `position Top = ${_btn3.style.top}`;
  this.getPosValX = `position Left = ${_btn3.style.left}`;
  console.log(_id);
}

setPos(){
  var _btn3=document.getElementById("btn3");
  _btn3.style.top = this.setPosValY;
  _btn3.style.left = this.setPosValX;
  //this.getPos(this.id);
}

deletePallet(id: string){
  this.pallets.splice(this.pallets.findIndex( (pallet)  =>  pallet.id === id ), 1 );
}


//private palletsUpdated  = new Observable<Pallet[]>()

check(){
  console.log(this.pallets.length);

}





}

/*
addPallet(){
  this.pallets = this.palletsService.addPallet();

}
*/
/*
add() {
  this.containers.push(this.containers.length);
  this.id=this.containers.length.toString();
  var _id=this.containers.length.toString();
  var item = document.getElementById(this.containers.length.toString());
  item.style.width="200px";
  item.style.height="100px";
  //this.setPos(_id);

}

*/
/*
add1(){
  let newElement = document.createElement('input');
  document.appendChild(newElement);
  document.body.appendChild(newElement);
}

*/



/*
addPallet(){

  let temp = new Pallet();
  temp.palletName = 'Pallet'+(this.pallets.length+1);
  temp.id=(this.pallets.length+1).toString();
  temp.width = "500";
  this.pallets.push(temp);



  console.log(this.pallets.length)
  console.log(document);
  console.log(temp);
  //_pallet.style.width = width;
  //_pallet.style.height = height;
}
*/



