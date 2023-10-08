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
  cards: any[] = [];
  genres: any[] = []
  isSelected: boolean[] = [];
  // showtabs: boolean = false
  count: number = 0
  isModalOpen: boolean = false;
  isShowPageChoice: boolean = false
  isShowPageStart: boolean = true
  constructor(private router:Router,private appcomponent: AppComponent, private apiservice: ApiService) {
  }


  async ngOnInit() {
    Promise.all([this.GetDataImgAlbums(), this.GetDataNamesAlbums(), this.GetDataGenre()])
      .then(() => this.CreateCard());

    this.SelectCards()

  }

  GoPageChoice(){
    this.isShowPageChoice = true
    this.isShowPageStart = false
  }
  GoPageHome(){
    this.router.navigate(['/home'])
  }
  SelectCards() {
    if (this.cards.length > 0) {
      this.isSelected = Array(this.cards.length).fill(false);
    }
  }

  AddClass(index: number) {
    this.isSelected[index] = !this.isSelected[index];
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
  async CreateCard() {
    this.cards = this.imgAlbums.map((img, index) => ({
      img: img,
      title: this.genres[index]
    }));
  }
}
