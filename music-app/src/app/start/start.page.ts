import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../API/api.service';
import { Swiper } from 'swiper/types';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss', '../app.component.scss'],

})
export class StartPage implements OnInit {
  imgAlbums: any[] = []
  nameAlbums: any[] = []
  cards: any[] = [];
  genres:any[]=[]
  // isSelect: boolean = false
  isSelected: boolean[] = Array(this.cards.length).fill(false);
  constructor(private apiservice: ApiService) { }


  async ngOnInit() {

    Promise.all([this.GetDataImgAlbums(), this.GetDataNamesAlbums(),this.GetDataGenre()])
      .then(() => this.CreateCard());
  }

  AddClass(index:number){
    this.isSelected[index] = !this.isSelected[index];
  }
  Nextslide() {
    const swiperEl = document.querySelector('swiper-container');
    swiperEl?.swiper.slideNext()
  }

  Prevslide() {
    const swiperEl = document.querySelector('swiper-container');
    swiperEl?.swiper.slidePrev()
  }
  async GetDataImgAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < data.length; index++) {
      this.imgAlbums.push(data[index]);
    }
    console.log(this.imgAlbums)
    // console.log(data)
  }
  async GetDataNamesAlbums() {
    const data = await this.apiservice.GetDataNamesAlbums()
    for (let index = 0; index < data.length; index++) {
      this.nameAlbums.push(data[index]);
    }
    console.log(this.nameAlbums)
  }
  async GetDataGenre(){
    const data = await this.apiservice.GetDataGenre()
    for (let index = 0; index < data.length; index++) {
      this.genres.push(data[index]);
    }
    
  }
  async CreateCard() {
    this.cards = this.imgAlbums.map((img, index) => ({
      img: img,
      title: this.genres[index]
    }));
  }
}
