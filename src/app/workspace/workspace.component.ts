import { Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  ViewContainerRef,
  OnDestroy,
OnInit
   } from "@angular/core";
import { getMatTooltipInvalidPositionError } from '@angular/material/tooltip';
import { transition } from '@angular/animations';
import { Pallet } from '../pallet.model';



@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']

})

export class WorkspaceComponent  {
  getPosValY="";
  getPosValX="";
  setPosValY="400px";
  setPosValX="400px";
  containers = [];

  constructor() { };

  _width = "300px";


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





pallets: Pallet[] = [];

addPallet(){
  //this.pallets.push(new Pallet());

  //var width = "200px";
  //var height = "100px";
  let temp = new Pallet();
  temp.palletName = 'Pallet'+(this.pallets.length+1);
  temp.id=(this.pallets.length+1).toString();
  temp.width = "500";
  this.pallets.push(temp);
  var _pallet = document.getElementById((this.pallets.length).toString())


  console.log(this.pallets.length)
  console.log(_pallet);
  console.log(temp);
  //_pallet.style.width = width;
  //_pallet.style.height = height;
}

deletePallet(id: string){
  this.pallets.splice(this.pallets.findIndex( (pallet)  =>  pallet.id === id ), 1 );
}


ngOnInit(){}


}

