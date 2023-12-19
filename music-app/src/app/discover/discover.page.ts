import { Component, OnInit } from '@angular/core';
import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss','../app.component.scss'],
})
export class DiscoverPage implements OnInit {

  constructor( private apiservice: ApiService) { }
  cardsAlbums:any[]=[]
  imgAlbums: any[] = []
  genres: any[] = []
  nameAlbums: any[] = []
  imgSinger:any[]=[]
  cardsGenre: any[] = [];
  async ngOnInit() {
    Promise.all([this.GetDataImgAlbums(), this.GetDataNamesAlbums(), this.GetDataGenre(),this.GetImgSinger()])
      .then(() => this.Run());
  }
  async CreateCard(arrayimg: any,arrayGenre: any) {
    return  arrayimg.map((img: any, index: string | number) => ({
      img: img,
      title: arrayGenre[index]
    }));
  }
  async Run(): Promise<any>{
    this.cardsGenre =await this.CreateCard(this.imgAlbums,this.genres)
    this.cardsAlbums =await this.CreateCard(this.imgAlbums,this.nameAlbums)
  }

  async GetDataImgAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < data.length; index++) {
      this.imgAlbums.push(data[index]);
    }

  }
  async GetDataNamesAlbums() {
    const data = await this.apiservice.GetDataNamesAlbums()
    for (let index = 0; index < data.length; index++) {
      this.nameAlbums.push(data[index]);
    }

  }
  async GetImgSinger(){
    const data = await this.apiservice.GetDataImgSinger()
    this.imgSinger = data
  }
  async GetDataGenre() {
    const data = await this.apiservice.GetDataGenre()
    for (let index = 0; index < data.length; index++) {
      this.genres.push(data[index]);
    }
  }
}
