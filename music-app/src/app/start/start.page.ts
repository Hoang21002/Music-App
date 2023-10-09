import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../API/api.service';
import { AppComponent } from '../app.component';
import { Swiper } from 'swiper/types';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss', '../app.component.scss'],
})
export class StartPage implements OnInit {
  imgAlbums: any[] = []
  nameAlbums: any[] = []
  nameSinger:any[]=[]
  imgSinger:any[]=[]
  cardsGenre: any[] = [];
  cardsArtist:any[]=[]
  cardsAlbums:any[]=[]
  genres: any[] = []
  isSelectedGenre: boolean[] = [];
  isSelectedArtist: boolean[] = [];
  isSelectedAlbums: boolean[] = [];
  // showtabs: boolean = false
  count: number = 0
  isModalOpen: boolean = false;
  isShowPageChoice: boolean = false
  isShowPageStart: boolean = true
  constructor(private router:Router,private appcomponent: AppComponent, private apiservice: ApiService) {
  }


  async ngOnInit() {
    Promise.all([this.GetDataImgAlbums(), this.GetDataNamesAlbums(), this.GetDataGenre(),this.GetNameSinger(),this.GetImgSinger()])
      .then(() => this.Run());


  }
  async Run(): Promise<any>{
    this.cardsGenre =await this.CreateCard(this.imgAlbums,this.genres)
    this.cardsArtist =await this.CreateCard(this.imgSinger,this.nameSinger)
    this.cardsAlbums =await this.CreateCard(this.imgAlbums,this.nameAlbums)
    this.SelectCards(this.cardsGenre,this.isSelectedGenre)
    this.SelectCards(this.cardsArtist,this.isSelectedArtist)
    this.SelectCards(this.cardsAlbums,this.isSelectedAlbums)
  }
  GoPageChoice(){
    this.isShowPageChoice = true
    this.isShowPageStart = false
  }
  GoPageHome(){
    this.router.navigate(['/home'])
  }
  SelectCards(cards:any,isSelected :any) {
    if (cards.length > 0) {
      isSelected = Array(cards.length).fill(false);
    }
  }

  AddClass(index: number,isSelected :any) {
    isSelected[index] = !isSelected[index];
  }
  Nextslide() {
    const swiperEl = document.querySelector('swiper-container');
    swiperEl?.swiper.slideNext()
    this.count += 1
    this.ShowModal(this.count)
    console.log(this.count)
  }
  ShowModal(value: number) {
    if (value >= 3) {
      this.count = 2
      this.isModalOpen = true
    }
    else if (value < 0) {
      this.count = 0
    }
  }
  Prevslide() {
    const swiperEl = document.querySelector('swiper-container');
    swiperEl?.swiper.slidePrev()
    this.count -= 1
    this.ShowModal(this.count)
    console.log(this.count)

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
  async GetDataGenre() {
    const data = await this.apiservice.GetDataGenre()
    for (let index = 0; index < data.length; index++) {
      this.genres.push(data[index]);
    }
  }

  async GetNameSinger(){
    const data = await this.apiservice.GetDataNameSinger()
    this.nameSinger = data
  }

  async GetImgSinger(){
    const data = await this.apiservice.GetDataImgSinger()
    this.imgSinger = data
  }
  // async CreateCard(object: any, array: any) {
  //   this.cards = this.imgAlbums.map((img, index) => ({
  //     img: img,
  //     title: this.genres[index]
  //   }));
  // }
  async CreateCard(arrayimg: any,arrayGenre: any) {
    return  arrayimg.map((img: any, index: string | number) => ({
      img: img,
      title: arrayGenre[index]
    }));
  }
}
