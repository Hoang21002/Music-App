import { Component, OnInit } from '@angular/core';

import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss','../app.component.scss'],
})
export class HomePage implements OnInit {
  dataAll: any[] = []
  imgAlbums : any[]=[]
  genreMusic: any[]=[]
  genreSong:any[]=[]
  uniqeuGenreMusic:any[] = []
  playLists:any[]=[]
  nameSong:any[]=[]
  constructor(private apiservice: ApiService) { }
  cards: any[] = [];
  imgSong:any[]=[]
  cardsMusic: { imgsong: string; genre: number; namesong: string }[] = [];
  async ngOnInit() {
    Promise.all([this.GetDataImgSongs(), this.GetDataSongsAlbums(), this.GetDataGenreSongs()])
    .then(() => this.CreateCardMusic());

    await this.Run()
    
  }

  async Run(): Promise <any>{
    await this.GetDataAll()

    await this.GetDataAlbums()

    await this.GetDataImgAlbums()

    await this.GetDataGenre()

    // await this.GetDataNamesAlbums()
    await this.GetDataSongsAlbums()

    await this.GetDataGenreSongs()

    await this.GetDataImgSongs()

    await this.GetDataSongsAlbums()

    await this.CreateCardMusic()
  }
  async GetDataGenre() {
    const data = await this.apiservice.GetDataGenre()
    for (let index = 0; index < data.length; index++) {
      this.genreMusic.push(data[index]);
    }
    this.uniqeuGenreMusic = [...new Set(this.genreMusic)];
    this.GetPlayLists(this.uniqeuGenreMusic)
    this.uniqeuGenreMusic.unshift('All')
  }
  async GetDataAll(): Promise<any> {
    const data = await this.apiservice.GetDataAll()
    console.log(data);
    return data
    // let uniqueArray: string[] = [...new Set(this.dataAll)];
    // console.log(uniqueArray);
  }
  GetPlayLists(array: any[]){
    for (let index = 0; index < 6; index++) {
      this.playLists.push(array[index]);    
    }
  }
  async GetDataAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataAlbums()
  }
  async GetDataImgAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < 8; index++) {
      this.imgAlbums.push(data[index]);
    }
  }
  // Get Name Albums
  async GetDataNamesAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataNamesAlbums()
  }
  async GetDataSongsAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataSongs()
    this.nameSong=data
  }
  async GetDataGenreSongs(): Promise<any>{
    const data = await this.apiservice.GetDataGenreSongs()
    this.genreSong = data
  }
  async GetDataImgSongs(): Promise<any>{
    const data = await this.apiservice.GetDataImgSongs()
    this.imgSong = data
  }
  async CreateCardMusic() {
    for (let i = 0; i < this.nameSong.length; i++) {
      const Songs = {
        imgsong: this.imgSong[i],
        namesong: this.nameSong[i],
        genre: this.genreSong[i],
      };
      // Đưa đối tượng vào mảng people
      this.cardsMusic.push(Songs);
    }
    console.log(this.cardsMusic)
  }
}

