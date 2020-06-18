
import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';

@Injectable({providedIn: 'root'})
export class AddBoxService{

  public boxes: Box[] = [];
  public boxSets : Box;

  addBox(){

    let temp = new Box();
    temp.name = 'Box'+(this.boxes.length+1);
    temp.id=(this.boxes.length+1).toString();
    temp.width = this.boxSets.width/5;
    temp.length = this.boxSets.length/5;
    temp.height = this.boxSets.height/5;
    temp.posX = this.boxSets.posX;
    temp.posY = this.boxSets.posY;
    temp.posZ = this.boxSets.posZ;
    this.boxes.push(temp);
    console.log("from service pallets" +this.boxes)
    console.log("from service palletSets" +this.boxSets)
    console.log("from service temp" + temp)
    return this.boxes;


  }

}
