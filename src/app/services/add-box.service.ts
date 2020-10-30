import { Injectable } from '@angular/core';
import { Box } from '../models/box.model';
import { Position3D } from '../models/position3D';
import * as THREE from 'three';
//import { PickingPlace } from '../models/pickingPlace.model';
import BoxesOfPalletJson from '../../assets/boxes-of-pallet.json';
import BoxesOfPpJson from '../../assets/boxes-of-pp.json';
//import BoxesJson3D from '../../assets/boxes-of-pallet3D.json';
//import  *  as  data  from  '../../assets/boxes-of-pallet.json';

//const writeJsonFile = require('write-json-file');
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface Cat {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AddBoxService {
  constructor(private httpClient: HttpClient) {}

  products: any = [];

  public boxesOfPallet: Box[] = [];
  public boxesOfPickingPlace: Box[] = [];
  public boxSets: Box;
  //public pps: PickingPlace[] =[];

  public addPosX: number = 0;
  public addPosY: number = 0;
  public centerPosX: number = 0;
  public centerPosY: number = 0;
  public centerPosZ: number = 0;

  //materialofPp = new THREE.PointsMaterial({ color: "hsl(0, 100%, 35%, 0.208)" , size:0.02});

  boxesOfPallet3D = [];
  boxesOfPp3D = [];
  posOfPallet3D: Position3D[] = [];
  posOfPp3D: Position3D[] = [];
  helpersOfPp = [];
  helpersOfPallet = [];

  public testBoxes: Box[] = [];

  test: any = [];
  test1: any = [];

  fetchData(url: string): Promise<any> {
    return (
      this.httpClient
        .get(url)
        .toPromise()
        //.get('http://localhost:4600/api/boxes-of-pallet').toPromise()
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }

  getBoxes(): Promise<any> {
    return new Promise((resolve) => {
      //
      // Your function implementation
      //
      // Resolve the promise at the end


      /* to dziala na PG
      this.fetchData('http://localhost:4600/api/boxes-of-pallet').then(
        (data) => {
          this.test = data;
          this.boxesOfPallet = data;
          console.log('test: ...');
          console.log(JSON.stringify(this.test));
        }
      );
      this.fetchData('http://localhost:4600/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test1: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });
*/

// to dziala na panelu edge

//this.fetchData('http://127.0.0.1:32769/api/boxes-of-pallet').then((data) => {
this.fetchData('/api/boxes-of-pallet').then((data) => {

  this.test = data;
  this.boxesOfPallet = data;
  //console.log('test: ...');
  //console.log(JSON.stringify(this.test));
      });
      //this.fetchData('http://127.0.0.1:32769/api/boxes-of-pp').then((data) => {
this.fetchData('/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        //console.log('test5: ...');
        //console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

//////////////////////////test do usuniecia////////////////////////////
/*
this.fetchData('http://127.0.0.1/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test2: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('https://127.0.0.1/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test3: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('https://localhost/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test4: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('http://127.0.0.1:32769/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test5: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('https://127.0.0.1:32769/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test6: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('https://localhost:32769/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test7: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });


      this.fetchData('http://127.0.0.1:32770/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test5: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('https://127.0.0.1:32770/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test6: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });

      this.fetchData('https://localhost:32770/api/boxes-of-pp').then((data) => {

        this.test1 = data;
        console.log('test7: ...');
        console.log(JSON.stringify(this.test1));
        //this.loadProject();
      });
*/
/////////////////////////////////////////////////////////////////////////////////

      resolve();
    });

    /*
//this.httpClient.get('http://localhost:4600/api')
console.log(this.httpClient.get('http://localhost:4600/api'))
  this.httpClient.get('http://localhost:4600/api').toPromise().then(data=> {console.log(data); })
  //this.httpClient.get('http://localhost:4600/api').toPromise().then(data=> {console.log(data); this.test = data; console.log(JSON.stringify(this.test))})
  //this.httpClient.get('http://localhost:4600/api').subscribe(boxes => { this.test = boxes; console.log("any: " + this.test )})

  //console.log("get boxes: " + this.httpClient.get<Box[]>('http://localhost:4600/api/boxes'))
  //this.testBoxes = this.httpClient.get('http://localhost:4600/api/boxes')

*/
    //console.log('reaches');
  }
  /*
  getAllCats(): Observable<Box[]> {
    console.log(this.httpClient.get<Box[]>('http://localhost:4600/api/boxes'))
    return this.httpClient.get<Box[]>('http://localhost:4600/api/boxes')
  }

  getCat(name: string): Observable<Cat> {
    return this.httpClient.get<Cat>('http://localhost:8000/api/cats/' + name)
  }

  insertCat(cat: Cat): Observable<Cat> {
    return this.httpClient.post<Cat>('http://localhost:8000/api/cats/', cat)
  }

  updateCat(cat: Cat): Observable<void> {
    return this.httpClient.put<void>(
      'http://localhost:8000/api/cats/' + cat.name,
      cat
    )
  }

  deleteCat(name: string) {
    return this.httpClient.delete('http://localhost:8000/api/cats/' + name)
  }
*/

  postBoxes() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Authorization': 'my-auth-token'
      }),
    };
    const urlBoxesOfPallet = '/api/boxes-of-pallet';
    const urlBoxesOfPp = '/api/boxes-of-pp';
    //const urlBoxesOfPallet = 'http://127.0.0.1:32769/api/boxes-of-pallet';
    //const urlBoxesOfPp = 'http://127.0.0.1:32769/api/boxes-of-pp';
    const url1 = 'http://httpbin.org/post';

    this.httpClient
      .post(urlBoxesOfPallet, JSON.stringify(this.boxesOfPallet), httpOptions)
      .toPromise()
      .then((data) => {
        this.runNodeFunc();
        //console.log(data)
      });
    this.httpClient
      .post(urlBoxesOfPp, JSON.stringify(this.boxesOfPickingPlace), httpOptions)
      .toPromise()
      .then((data) => console.log(data) );
    //this.httpClient.post('http://localhost:4600/api/boxes-of-pallet', this.test )
  }

runNodeFunc(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //'Authorization': 'my-auth-token'
    }),
  };
  //const url= 'http://127.0.0.1:32769/api/node-func';
  const url= '/api/node-func';
  this.httpClient
  .post(url, {message:"run node function"}, httpOptions)
  .toPromise()
  .then((data) => console.log(data));
}

  saveToJson() {
    //this.getAllCats();
    let _boxesOfPalletJson = JSON.stringify(this.boxesOfPallet);
    const blob1 = new Blob([_boxesOfPalletJson], { type: 'application/json' });
    saveAs(blob1, 'boxes-of-pallet.json');

    let _boxesOfPpJson = JSON.stringify(this.boxesOfPickingPlace);
    const blob2 = new Blob([_boxesOfPpJson], { type: 'application/json' });
    saveAs(blob2, 'boxes-of-pp.json');
    /*
    const writeJsonFile1 = new writeJsonFile();
    (async () => {
      await  writeJsonFile1('assets/testboxes.json', this.boxesOfPallet);
  })();*/
    //this.httpClient.post('assets/testboxes.json',)
    /*
    this.httpClient.get('assets/boxes-of-pallet.json').subscribe(data =>{
      //console.log("data: " + data);
      this.products = data;
    })
    */
  }

  loadProject() {
    this.boxesOfPallet = [];
    this.boxesOfPickingPlace = [];
    this.boxesOfPallet3D = [];
    this.boxesOfPp3D = [];
    //this.getBoxes();
    //console.log("first")
    //console.log(JSON.parse(JSON.stringify(BoxesOfPalletJson)))
    //console.log('second');
    //console.log(JSON.parse(JSON.stringify(this.test)));
    //let _boxesOfPallet = JSON.parse(JSON.stringify(BoxesOfPalletJson));
    this.boxesOfPallet = JSON.parse(JSON.stringify(this.test));
    //console.log('boxes of pp');
    //console.log(this.test1);
    //let _boxesOfPp = JSON.parse(JSON.stringify(BoxesOfPpJson));
    this.boxesOfPickingPlace = JSON.parse(JSON.stringify(this.test1));
    /*
  const material = new THREE.MeshPhongMaterial({
    color: this.boxSets.color,
  });
*/
    let tempBox3D = null;
    var tempHelper = null;

    for (let index = 0; index < this.boxesOfPallet.length; index++) {
      let tempGeometry = new THREE.BoxBufferGeometry(
        this.boxesOfPallet[index].width,
        this.boxesOfPallet[index].height,
        this.boxesOfPallet[index].length,
        10,
        10,
        10
      );
      const material = new THREE.MeshPhongMaterial({
        color: this.boxesOfPallet[index].color,
      });
      tempBox3D = new THREE.Mesh(tempGeometry, material);
      tempBox3D.position.x = this.boxesOfPallet[index].posX;
      tempBox3D.position.y = this.boxesOfPallet[index].posZ;
      tempBox3D.position.z = -this.boxesOfPallet[index].posY;
      tempBox3D.rotation.y =
        this.boxesOfPallet[index].orientation * (Math.PI / 180);
      this.boxesOfPallet3D.push(tempBox3D);
      tempHelper = new THREE.BoxHelper(this.boxesOfPallet3D[index], 0x000000);
      tempHelper.name = this.boxesOfPallet[index].name + 'helper';
      this.helpersOfPallet.push(tempHelper);
    }

    for (let index = 0; index < this.boxesOfPickingPlace.length; index++) {
      let tempGeometry = new THREE.BoxBufferGeometry(
        this.boxesOfPickingPlace[index].width,
        this.boxesOfPickingPlace[index].height,
        this.boxesOfPickingPlace[index].length,
        10,
        10,
        10
      );
      const material = new THREE.MeshPhongMaterial({
        color: this.boxesOfPickingPlace[index].color,
      });
      tempBox3D = new THREE.Mesh(tempGeometry, material);
      tempBox3D.position.x = this.boxesOfPickingPlace[index].posX;
      tempBox3D.position.y = this.boxesOfPickingPlace[index].posZ;
      tempBox3D.position.z = -this.boxesOfPickingPlace[index].posY;
      tempBox3D.rotation.y =
        this.boxesOfPickingPlace[index].orientation * (Math.PI / 180);
      this.boxesOfPp3D.push(tempBox3D);
      tempHelper = new THREE.BoxHelper(this.boxesOfPp3D[index], 0x000000);
      tempHelper.name = this.boxesOfPickingPlace[index].name + 'helper';
      this.helpersOfPp.push(tempHelper);
    }
  }

  ngOnInit() {}

  addBox() {
    //place box in center of Picking place or in left bottom corner of Pallet

    if (this.boxSets.membership.search('Picking') == 0) {
      this.centerPosX = 0; //(this.boxSets.width/this.scale)/2;
      this.centerPosY = 0; //(this.boxSets.length/this.scale)/2;
      this.centerPosZ = this.boxSets.heightParent;
    }
    //changing position according to pallet orientation
    if (this.boxSets.membership.search('Pallet') == 0) {
      if (this.boxSets.orientationParent == 0) {
        this.centerPosX = this.boxSets.widthParent / 2 - this.boxSets.width / 2;
        this.centerPosY =
          this.boxSets.lengthParent / 2 - this.boxSets.length / 2;
      }
      if (this.boxSets.orientationParent == 90) {
        this.centerPosX =
          this.boxSets.lengthParent / 2 - this.boxSets.width / 2;
        this.centerPosY =
          this.boxSets.widthParent / 2 - this.boxSets.length / 2;
      }
      if (this.boxSets.orientationParent == 180) {
        this.centerPosX = this.boxSets.widthParent / 2 - this.boxSets.width / 2;
        this.centerPosY =
          this.boxSets.lengthParent / 2 - this.boxSets.length / 2;
      }
      if (this.boxSets.orientationParent == 270) {
        this.centerPosX =
          this.boxSets.lengthParent / 2 - this.boxSets.width / 2;
        this.centerPosY =
          this.boxSets.widthParent / 2 - this.boxSets.length / 2;
      }
      this.centerPosZ = this.boxSets.heightParent;
    }

    //changing position of the box when orientation is different than 0deg
    var orientationFactorX = this.boxSets.length / 2 - this.boxSets.width / 2; //this.boxSets.width/this.scale;
    var orientationFactorY = this.boxSets.length / 2 - this.boxSets.width / 2;

    if (this.boxSets.membership.search('Pallet') == 0) {
      if (this.boxSets.orientation == 0) {
        this.addPosX = 0;
        this.addPosY = 0;
      }
      if (this.boxSets.orientation == 90) {
        this.addPosX = orientationFactorX;
        this.addPosY = -orientationFactorY;
      }
      if (this.boxSets.orientation == 180) {
        this.addPosX = 0;
        this.addPosY = 0;
      }
      if (this.boxSets.orientation == 270) {
        this.addPosX = orientationFactorX;
        this.addPosY = -orientationFactorX;
      }
    }

    let temp = new Box();
    temp.width = this.boxSets.width;
    temp.length = this.boxSets.length;
    temp.height = this.boxSets.height;
    temp.posX =
      this.boxSets.posX +
      this.boxSets.posXParent +
      this.addPosX -
      this.centerPosX;
    temp.posY =
      this.boxSets.posY +
      this.boxSets.posYParent +
      this.addPosY -
      this.centerPosY;

    temp.posZ =
      this.boxSets.posZ +
      this.boxSets.posZParent +
      this.boxSets.height / 2 +
      this.centerPosZ;
    temp.orientation = this.boxSets.orientation;
    temp.membership = this.boxSets.membership;
    temp.source = this.boxSets.source;
    temp.layer = this.boxSets.layer;
    temp.isTexture = this.boxSets.isTexture;
    temp.visible = this.boxSets.visible;
    temp.color = this.boxSets.color;
    temp.orientationParent = this.boxSets.orientationParent;
    //console.log('box PosY' + temp.posZ);

    //console.log('1' + this.boxSets.posZ);
    //console.log('2' + this.boxSets.posZParent);
    //console.log('3' + this.boxSets.height / 2);
    //console.log('4' + this.centerPosZ);

    //checking if box belongs to parent or Picking place
    if (this.boxSets.membership.search('Pallet') == 0) {
      temp.name = 'BoxOfPallet' + (this.boxesOfPallet.length + 1);
      temp.id = (this.boxesOfPallet.length + 1).toString();
      this.boxesOfPallet.push(temp);
      return this.boxesOfPallet;
    }
    if (this.boxSets.membership.search('Picking') == 0) {
      temp.name = 'BoxOfPp' + (this.boxesOfPickingPlace.length + 1);
      temp.id = (this.boxesOfPickingPlace.length + 1).toString();
      this.boxesOfPickingPlace.push(temp);

      return this.boxesOfPickingPlace;
    }
  }

  addBox3D() {
    const material = new THREE.MeshPhongMaterial({
      color: this.boxSets.color,
    });

    const materials = [
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(
          '../../assets/Fabric_09_1K_Opacity.png'
        ), //right
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(
          '../../assets/Fabric_09_1K_Opacity.png'
        ), //left
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load('../../assets/cargill.jpg'), //top
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(
          '../../assets/Fabric_09_1K_Opacity.png'
        ), //bottom
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(
          '../../assets/Fabric_09_1K_Opacity.png'
        ), //front
      }),
      new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(
          '../../assets/Fabric_09_1K_Opacity.png'
        ), //back
      }),
    ];
    let tempGeometry = new THREE.BoxBufferGeometry(
      this.boxSets.width,
      this.boxSets.height,
      this.boxSets.length,
      10,
      10,
      10
    );

    //let tempBox3D = new THREE.Mesh(tempGeometry, material);
    let tempBox3D = null;
    if (this.boxSets.isTexture === true) {
      tempBox3D = new THREE.Mesh(tempGeometry, materials);
    } else tempBox3D = new THREE.Mesh(tempGeometry, material);

    if (this.boxSets.membership.search('Pallet') == 0) {
      tempBox3D.position.x =
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX -
        this.centerPosX;

      tempBox3D.position.y =
        this.boxSets.posZ +
        this.boxSets.posZParent +
        this.boxSets.height / 2 +
        this.centerPosZ;

      tempBox3D.position.z = -(
        this.boxSets.posY +
        this.boxSets.posYParent +
        this.addPosY -
        this.centerPosY
      );

      tempBox3D.rotation.y = this.boxSets.orientation * (Math.PI / 180);
      //console.log('PosZ3D: ' + tempBox3D.position.y);
      //console.log('PosZ3D 1: ' + this.boxSets.posZ);
      //console.log('PosZ3D 2: ' + this.boxSets.posZParent);
      //console.log('PosZ3D 3: ' + this.boxSets.height / 2);
      //console.log('PosZ3D 4: ' + this.centerPosZ);
    }

    if (this.boxSets.membership.search('Picking') == 0) {
      tempBox3D.position.x =
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX -
        this.centerPosX;

      tempBox3D.position.y =
        this.boxSets.posZ +
        this.boxSets.posZParent +
        this.boxSets.height / 2 +
        this.centerPosZ;

      tempBox3D.position.z = -(
        this.boxSets.posY +
        this.boxSets.posYParent +
        this.addPosY -
        this.centerPosY
      );
      tempBox3D.rotation.y = this.boxSets.orientation * (Math.PI / 180);
    }

    if (this.boxSets.membership.search('Pallet') == 0) {
      this.boxesOfPallet3D.push(tempBox3D);
      return this.boxesOfPallet3D;
    }
    if (this.boxSets.membership.search('Picking') == 0) {
      this.boxesOfPp3D.push(tempBox3D);
      return this.boxesOfPp3D;
    }
  }

  addHelper3D() {
    if (this.boxSets.membership.search('Picking') == 0) {
      var tempHelper = null;
      tempHelper = new THREE.BoxHelper(
        this.boxesOfPp3D[this.boxesOfPp3D.length - 1],
        0x000000
      );
      tempHelper.name =
        this.boxesOfPickingPlace[this.boxesOfPp3D.length - 1].name + 'helper';
      this.helpersOfPp.push(tempHelper);
      return this.helpersOfPp;
    }
    if (this.boxSets.membership.search('Pallet') == 0) {
      var tempHelper = null;
      tempHelper = new THREE.BoxHelper(
        this.boxesOfPallet3D[this.boxesOfPallet3D.length - 1],
        0x000000
      );
      tempHelper.name =
        this.boxesOfPallet[this.boxesOfPallet3D.length - 1].name + 'helper';
      this.helpersOfPallet.push(tempHelper);
      return this.helpersOfPallet;
    }
  }

  /*
  addPosition3D() {
    if (this.boxSets.membership.search('Pallet') == 0) {
      let tempPosition3D = new Position3D();
      tempPosition3D.posX =
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX -
        this.centerPosX;
      tempPosition3D.posY =
        this.boxSets.posY +
        this.boxSets.posYParent +
        this.addPosY -
        this.centerPosY;
      tempPosition3D.posZ =
        this.boxSets.posZ +
        this.boxSets.posZParent +
        this.boxSets.height / 2 +
        this.centerPosZ;
      tempPosition3D.orientation = this.boxSets.orientation;
      this.posOfPallet3D.push(tempPosition3D);
      return this.posOfPallet3D;
    }
    if (this.boxSets.membership.search('Picking') == 0) {
      let tempPosition3D = new Position3D();
      tempPosition3D.posX =
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX -
        this.centerPosX;
      tempPosition3D.posY =
        this.boxSets.posY +
        this.boxSets.posYParent +
        this.addPosY -
        this.centerPosY;
      tempPosition3D.posZ =
        this.boxSets.posZ +
        this.boxSets.posZParent +
        this.boxSets.height / 2 +
        this.centerPosZ;
      tempPosition3D.orientation = this.boxSets.orientation;
      this.posOfPp3D.push(tempPosition3D);


      console.log("temp.posx: " + tempPosition3D.posX)
      console.log("boxSets.Posx: " + this.boxSets.posX)
      console.log("boxSets.posXParent: " + this.boxSets.posXParent)
      console.log("addPosX: " + this.addPosX)
      console.log("this.centerPosx: " + this.centerPosX)
      console.log("pos x all: " + (
        this.boxSets.posX +
        this.boxSets.posXParent +
        this.addPosX-
        this.centerPosX))

        console.log("typeof" + typeof(this.boxSets.posX) + typeof(this.boxSets.posXParent) +typeof(this.addPosX) +typeof(this.centerPosX))

        console.log("temp.posy: " + tempPosition3D.posY)
        console.log("temp.posz: " + tempPosition3D.posZ)
      return this.posOfPp3D;
    }
  }
*/
  deleteBoxOfPp() {
    this.deleteElement(
      this.boxesOfPickingPlace.length - 1,
      this.boxesOfPickingPlace
    );
    this.deleteElement(this.boxesOfPp3D.length - 1, this.boxesOfPp3D);
    this.deleteElement(this.posOfPp3D.length - 1, this.posOfPp3D);
    this.deleteElement(this.helpersOfPp.length - 1, this.helpersOfPp);
  }

  deleteBoxOfPallet() {
    this.deleteElement(this.boxesOfPallet.length - 1, this.boxesOfPallet);
    this.deleteElement(this.boxesOfPallet3D.length - 1, this.boxesOfPallet3D);
    this.deleteElement(this.posOfPallet3D.length - 1, this.posOfPallet3D);
    this.deleteElement(this.helpersOfPallet.length - 1, this.helpersOfPallet);
  }

  deleteElement(id: number, array: any) {
    array.splice(
      array.findIndex((element) => element.id === id.toString()),
      1
    );
  }
}
