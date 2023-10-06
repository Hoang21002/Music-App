import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  imgAlbums : any[]=[]
  nameAlbums : any[]=[]
  cards: any[] = [];
  constructor(private apiservice: ApiService) { }


  ngOnInit() {
    Promise.all([this.GetDataImgAlbums(), this.GetDataNamesAlbums()])
    .then(() => this.CreateCard());
  }
  async GetDataImgAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < 8; index++) {
      this.imgAlbums.push(data[index]);
    }
    console.log(this.imgAlbums)
    // console.log(data)
  }
  async GetDataNamesAlbums(){
    const data = await this.apiservice.GetDataNamesAlbums()
    for (let index = 0; index < 8; index++) {
      this.nameAlbums.push(data[index]);
    }
    console.log(this.nameAlbums)

  }
  async CreateCard(){
    this.cards = this.imgAlbums.map((img, index) => ({
      img: img,
      title: this.nameAlbums[index]
    }));
  }
}
