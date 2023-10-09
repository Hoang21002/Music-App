import { Component, OnInit } from '@angular/core';

import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../app.component.scss'],
})
export class HomePage implements OnInit {
  dataAll: any[] = []
  imgAlbums: any[] = []
  genreMusic: any[] = []
  nameAlbums: any[] = []
  nameSinger: any[] = []
  genreSong: any[] = []
  urlMp3: any[] = []
  uniqeuGenre: any[] = []
  playLists: any[] = []
  nameSong: any[] = []
  constructor(private apiservice: ApiService) { }
  cards: any[] = [];
  imgSong: any[] = []
  cardsMusic: { imgsong: string; genre: number; namesong: string }[] = [];
  cardsPlaylist: { imgsong: string; genre: number; namesong: string }[] = [];
  async ngOnInit() {
    await Promise.all([this.CreateFunc()])
      .then(() => this.RunCreateCard());
  }

  async CreateFunc() {
    await this.GetDataAll()
    await this.GetUrl()
    await this.GetDataAlbums()

    await this.GetDataImgAlbums()

    await this.GetDataGenre()

    await this.GetDataNameSinger()

    await this.GetDataNamesAlbums()

    await this.GetDataSongsAlbums()

    await this.GetDataGenreSongs()

    await this.GetDataImgSongs()
  }
  async RunCreateCard(): Promise<any> {

    await this.CreateCard(this.cardsMusic, this.nameSong, this.imgSong, this.genreSong)

    await this.CreateCard(this.cardsPlaylist, this.nameAlbums, this.imgAlbums, this.nameSinger)
  }
  async GetDataGenre() {
    const data = await this.apiservice.GetDataGenre()
    for (let index = 0; index < data.length; index++) {
      this.genreMusic.push(data[index]);
    }
    this.uniqeuGenre = [...new Set(this.genreMusic)];
    this.GetPlayLists(this.uniqeuGenre)
    this.uniqeuGenre.unshift('All')
  }
  async GetDataAll(): Promise<any> {
    const data = await this.apiservice.GetDataAll()
    console.log(data);
    return data
    // let uniqueArray: string[] = [...new Set(this.dataAll)];
    // console.log(uniqueArray);
  }
  async GetUrl(): Promise<any> {
    const data = await this.apiservice.GetUrlMp3()
    console.log(data)

  }
  GetPlayLists(array: any[]) {
    for (let index = 0; index < 6; index++) {
      this.playLists.push(array[index]);
    }
  }
  async GetDataAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataAlbums()
  }
  async GetDataImgAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < 8; index++) {
      this.imgAlbums.push(data[index]);
    }
  }
  // Get Name Albums
  async GetDataNameSinger(): Promise<any> {
    const data = await this.apiservice.GetDataNameSinger()
    this.nameSinger = data
  }
  async GetDataNamesAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataNamesAlbums()
    this.nameAlbums = data
  }
  async GetDataSongsAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataSongs()
    this.nameSong = data
  }

  async GetDataGenreSongs(): Promise<any> {
    const data = await this.apiservice.GetDataGenreSongs()
    this.genreSong = data
  }
  async GetDataImgSongs(): Promise<any> {
    const data = await this.apiservice.GetDataImgSongs()
    this.imgSong = data
  }
  async CreateCard(cards: any, arrayName: any, arrayImg: any, arrayTitle: any) {
    for (let i = 0; i < arrayName.length; i++) {
      const Songs = {
        imgsong: arrayImg[i],
        namesong: arrayName[i],
        genre: arrayTitle[i],
      };
      // Đưa đối tượng vào mảng people
      cards.push(Songs);
    }
  }
}

