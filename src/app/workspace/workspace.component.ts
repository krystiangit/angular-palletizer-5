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
  id="1";
  constructor() { };

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
  this.getPos("2");
}


add() {
  this.containers.push(this.containers.length);
 this.id=this.containers.length.toString();
}






ngOnInit(){}


}

