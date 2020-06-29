
import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
//import { PickingPlace } from '../models/pickingPlace.model';



@Injectable({providedIn: 'root'})
export class AddBoxService{

  public boxesOfPallet: Box[] = [];
  public boxesOfPickingPlace: Box[] = [];
  public boxSets : Box;
  //public pps: PickingPlace[] =[];
  private scale:number = 5;
  private addPosX:number = 0;
  private addPosY:number = 0;
  private centerPosX:number = 0;
  private centerPosY:number = 0;

  addBox(){


    //place box in center of Pixking place
    if (this.boxSets.membership.search("Picking")==0){
      this.centerPosX = (this.boxSets.width/this.scale)/2;
      this.centerPosY = (this.boxSets.length/this.scale)/2;
    }
    if (this.boxSets.membership.search("Pallet")==0){
      this.centerPosX = 0;
      this.centerPosY = 0;
    }



    //changing position of the box when orientation is different than 0deg
    var orientationFactorX =this.boxSets.length/this.scale/2 - this.boxSets.width/2/this.scale//this.boxSets.width/this.scale;
    var orientationFactorY = this.boxSets.length/this.scale/2 - this.boxSets.width/2/this.scale
    //console.log("width" + this.boxSets.width/this.scale)
    //console.log("width /4" +this.boxSets.width/4/this.scale)
    //console.log("length" + this.boxSets.length/this.scale)
    //console.log("length /4" +this.boxSets.length/4/this.scale)
    //console.log("add box clicked in service")
    if (this.boxSets.membership.search("Pallet")==0){
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
  }


    let temp = new Box();
    temp.width = this.boxSets.width/this.scale;
    temp.length = this.boxSets.length/this.scale;
    temp.height = this.boxSets.height/this.scale;
    temp.posX = (this.boxSets.posX/this.scale)+this.boxSets.posXParent+this.addPosX-this.centerPosX;
    temp.posY = (this.boxSets.posY/this.scale)+this.boxSets.posYParent+this.addPosY-this.centerPosY;
    temp.posZ = (this.boxSets.posZ/this.scale)+this.boxSets.posZParent;
    temp.orientation = this.boxSets.orientation;
    temp.membership = this.boxSets.membership;
    temp.source = this.boxSets.source;



    //checking if box belongs to parent or Picking place
    if (this.boxSets.membership.search("Pallet")==0){
      temp.name = 'BoxOfPallet'+(this.boxesOfPallet.length+1);
      temp.id=(this.boxesOfPallet.length+1).toString();
      this.boxesOfPallet.push(temp);
      return this.boxesOfPallet;
    }
    if (this.boxSets.membership.search("Picking")==0){
      temp.name = 'BoxOfPp'+(this.boxesOfPickingPlace.length+1);
      temp.id=(this.boxesOfPickingPlace.length+1).toString();
      this.boxesOfPickingPlace.push(temp);
      return this.boxesOfPickingPlace;
    }




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
