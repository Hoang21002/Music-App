import { Injectable, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  dataAll: any[] = [];
  dataName : any[] = []

  constructor() { }
  async ngOnInit() {
    await this.GetApi()
  }
  async GetApi(): Promise<any> {
    try {

      const firebaseApp = initializeApp(environment.firebase);
      const firestore = getFirestore(firebaseApp);
      const collectionReference = collection(firestore, 'artists');
      const querySnapshot = await getDocs(collectionReference);
      const database = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));   

      return database

    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  }

  async GetDataAll(){
    const dataAll = await this.GetApi()
    return dataAll
  }
  // Get Name Singer
  async GetDataNameSinger(){
    const dataAll = await this.GetApi()
    const dataName =  this.GetValues('name',dataAll)
    return dataName
  }
  // Get Genre Albums
  async GetDataGenre(){
    const dataAll = await this.GetApi()
    const dataGenre =  this.GetValues('genre',dataAll)
    return dataGenre
  }
  // Get Img Singer
  async GetDataImgSinger(){
    const dataAll = await this.GetApi()
    const dataImgsinger =  this.GetValues('imgsinger',dataAll)
    return dataImgsinger
  }
  // Get Albums
  async GetDataAlbums(){
    const dataAll = await this.GetApi()
    const dataAlbums =  this.GetValues('albums',dataAll)
    return dataAlbums
  }
  async GetDataImgAlbums(){
    const dataAlbums = await this.GetDataAlbums()
    const getValues = this.GetValuesAlbums('cover',dataAlbums)
    return getValues
  }
  // Get Name Albums
  async GetDataNamesAlbums(){
    const dataAlbums = await this.GetDataAlbums()
    const getValues = this.GetValuesAlbums('title',dataAlbums)
    return getValues

  }
  // Get Name Songs in Albums
  async GetDataSongs(){
    const dataAlbums = await this.GetDataAlbums()
    const getValues = this.GetValuesAlbums('songs',dataAlbums)
    const NameSongs = this.GetValuesAlbums('title',getValues)

    return NameSongs
    
  }
  // Funtion loop use get value in albums
  GetValuesAlbums(key: string,array: any){
    const getValues = []
    for (let index = 0; index < array.length; index++) {
      for (let a = 0; a < array[index].length; a++) {
        getValues.push(array[index][a][key]);
      }      
    }
    return getValues
  }
  // Funtion loop use get value in artists
  GetValues(key : string, array : any){
    const getValues = []
    for (let index = 0; index < array.length; index++) {
      getValues.push(array[index][key]);
    }
    return getValues
  }

}
