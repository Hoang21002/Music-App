import { Component, OnInit } from '@angular/core';

import { ApiService } from '../API/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dataAll: any[] = []
  imgAlbums : any[]=[]
  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
    // this.GetDataAll()
    this.GetDataAlbums()
    this.GetDataImgAlbums()
    // this.GetDataNamesAlbums()
    // this.GetDataSongsAlbums()
  }

  async GetDataAll(): Promise<any> {
    const data = await this.apiservice.GetDataAll()
    console.log(data);
    return data
    // let uniqueArray: string[] = [...new Set(this.dataAll)];
    // console.log(uniqueArray);
  }
  async GetDataAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataAlbums()
    console.log(data)
  }
  async GetDataImgAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < 8; index++) {
      this.imgAlbums.push(data[index]);
    }
    console.log(this.imgAlbums)
    console.log(data)
  }
  // Get Name Albums
  async GetDataNamesAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataNamesAlbums()
    console.log(data)
  }
  async GetDataSongsAlbums(): Promise<any>{
    const data = await this.apiservice.GetDataSongs()
    console.log(data)
  }
  

}

