import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { ApiService } from '../API/api.service';
@Component({
  selector: 'app-recent',
  templateUrl: './recent.page.html',
  styleUrls: ['./recent.page.scss','../app.component.scss'],
})
export class RecentPage implements OnInit {

  constructor(private apiservice: ApiService) { }

  player: Howl | any = null;
  showModal: boolean = false
  urlmp3SongUni :any;
  isPlaying: Boolean = false;
  activeTrack: any ;
  progress = 0;
  volume = 0.1
  currentTime = 0;
  totalTime = 0;

  imgGenre:any[]=[]

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
  cards: any[] = [];
  imgSong: any[] = []
  cardsMusic: { imgsong: string; genre: number; namesong: string;urlmp3:string }[] = [];
  cardsPlaylist: { imgsong: string; genre: number; namesong: string }[] = [];
  async ngOnInit() {
    await Promise.all([this.CreateFunc()])
      .then(() => this.RunCreateCard());
  }

  async CreateFunc() {
    await this.GetDataAll()
    
    await this.GetUrlMp3()

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

    await this.CreateCardMusic(this.cardsMusic, this.nameSong, this.imgSong, this.genreSong,this.urlMp3)

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
    // console.log(data);
    return data
    // let uniqueArray: string[] = [...new Set(this.dataAll)];
    // console.log(uniqueArray);
  }
  async GetUrlMp3(): Promise<any>{
    const data = await this.apiservice.GetUrlMp3()
    this.urlMp3 = data
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
  async CreateCardMusic(cards: any, arrayName: any, arrayImg: any, arrayTitle: any,arrayUrlMp3:any) {
    for (let i = 0; i < arrayName.length; i++) {
      const Songs = {
        imgsong: arrayImg[i],
        namesong: arrayName[i],
        genre: arrayTitle[i],
        urlmp3:arrayUrlMp3[i]
      };
      // Đưa đối tượng vào mảng people
      cards.push(Songs);
    }
  }
  
  setVolume(event: any) {
    const newVolume = +event.detail.value;
    if (this.player) {
      this.player.volume(newVolume);
    }
  }

  start(track: any) {
    this.showModal = true
    // const datane = this.cardsMusic[index]
    // this.urlmp3SongUni = datane.urlmp3
    // console.log(this.urlmp3SongUni)
    // console.log(datane)
    // this.imgSongUni[index]=this.imgSongUni
    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: [track.urlmp3],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        // Xử lý khi kết thúc phát nhạc (nếu cần)
      },
    });

    this.player.play();
  }

  togglePlayer(pause: any) {
    this.isPlaying = !pause;
    if (pause) {
      this.player.pause();
    } else {
      this.player.play();
    }
  }

  seek(event: any) {
    const newValue = event.detail.value;
    const duration = this.player.duration();
    this.player.seek(duration * (newValue / 100));
  }

  updateProgress() {
    if (this.activeTrack && this.player) {
      const seek = this.player.seek();
      this.progress = (seek / this.player.duration()) * 100 || 0;
      this.currentTime = Math.floor(seek);
      this.totalTime = Math.floor(this.player.duration());

      if (this.isPlaying && seek < this.player.duration()) {
        requestAnimationFrame(() => this.updateProgress());
      }
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

