
import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';

@Injectable({providedIn: 'root'})
export class AddBoxService{

  public boxes: Box[] = [];
  public boxSets : Box;

  private scale:number =5;
  private addPosX:number =0;
  private addPosY:number =0;


  addBox(){
    var orientationFactorX =this.boxSets.length/this.scale/2 - this.boxSets.width/2/this.scale//this.boxSets.width/this.scale;
    var orientationFactorY = this.boxSets.length/this.scale/2 - this.boxSets.width/2/this.scale
    console.log("width" + this.boxSets.width/this.scale)
    console.log("width /4" +this.boxSets.width/4/this.scale)
    console.log("length" + this.boxSets.length/this.scale)
    console.log("length /4" +this.boxSets.length/4/this.scale)
    if(this.boxSets.orientation==0){
      this.addPosX=0;
      this.addPosY=0;
    }
    if(this.boxSets.orientation==90){
      this.addPosX=orientationFactorX;
      this.addPosY=-orientationFactorY;
    }
    if(this.boxSets.orientation==180){
      this.addPosX=0;
      this.addPosY=0;
    }
    if(this.boxSets.orientation==270){
      this.addPosX=orientationFactorX;
      this.addPosY=-orientationFactorX;
    }


    let temp = new Box();
    temp.name = 'Box'+(this.boxes.length+1);
    temp.id=(this.boxes.length+1).toString();

    temp.width = this.boxSets.width/this.scale;
    temp.length = this.boxSets.length/this.scale;
    temp.height = this.boxSets.height/this.scale;
    temp.posX = (this.boxSets.posX/5)+this.addPosX;
    temp.posY = (this.boxSets.posY/5)+this.addPosY;
    temp.posZ = (this.boxSets.posZ/5);
    temp.orientation = this.boxSets.orientation;
    this.boxes.push(temp);
    console.log("from service pallets" +this.boxes)
    console.log("from service palletSets" +this.boxSets)
    console.log("from service temp" + temp)
    return this.boxes;


  }

}


/*
let temp = new Box();
    temp.name = 'Box'+(this.boxes.length+1);
    temp.id=(this.boxes.length+1).toString();
    temp.width = this.boxSets.width/5;
    temp.length = this.boxSets.length/5;
    temp.height = this.boxSets.height/5;
    temp.posX = (this.boxSets.posX);
    temp.posY = this.boxSets.posY/5;
    temp.posZ = this.boxSets.posZ/5;
    temp.orientation = this.boxSets.orientation;
    this.boxes.push(temp);
    console.log("from service pallets" +this.boxes)
    console.log("from service palletSets" +this.boxSets)
    console.log("from service temp" + temp)
    return this.boxes;
    */
