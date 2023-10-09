import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { ApiService } from '../API/api.service';
import { ModalController } from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
}


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss', '../app.component.scss'],
})

export class PlaylistPage implements OnInit {
  isModalOpen = false;
  urlMp3: any[] = []

  dataAll:any[]=[]

  songsOfAlbums:any

  imgSongUni:any;
  urlmp3SongUni :any;
  nameSongUni:any;

  nameAlbums: any[] = []
  imgAlbums: any[] = []
  nameSinger: any[] = []

  playlist: Track[] = [
    {
      name: 'Funny Song',
      path: 'https://firebasestorage.googleapis.com/v0/b/databasemusicapp.appspot.com/o/Alan%20Walker%20-%20Alone.mp3?alt=media&token=9a8b2ede-900f-47a7-9a85-d88821b5abe4&_gl=1*ezdz00*_ga*NDI2ODU0MjEuMTY5NjE4Mjg0OA..*_ga_CW55HF8NVT*MTY5Njg2NzQ1Ny4zOC4xLjE2OTY4NzI3NTUuNTcuMC4w',
    },
    {
      name: 'Jazzy Frenchie',
      path: 'https://firebasestorage.googleapis.com/v0/b/databasemusicapp.appspot.com/o/Alan%20Walker%20-%20Darkside%20(feat.%20Au-Ra%20and%20Tomine%20Harket).mp3?alt=media&token=5e8b1e9d-8861-4e58-bdff-ed1003832b55&_gl=1*3erdu0*_ga*NDI2ODU0MjEuMTY5NjE4Mjg0OA..*_ga_CW55HF8NVT*MTY5Njg2NzQ1Ny4zOC4xLjE2OTY4NzQwMDQuNDIuMC4w',
    },
    // Thêm các bài hát khác vào đây
  ];

  activeTrack: any ;
  player: Howl | any = null;
  isPlaying: Boolean = false;
  progress = 0;
  volume = 0.1
  currentTime = 0;
  totalTime = 0;
  imgSong: any[] = []
  nameSong: any[] = []
  showModal: boolean = false
  showModalFirst: boolean = false
  cardsMusic: { urlmp3: string; imgsong: number; namesong: string }[] = [];
  cardsPlaylist: { urlmp3: string; imgsong: number; namesong: string }[] = [];


  constructor(private apiservice: ApiService,private modalController: ModalController) { }

  Test(index:number){
    // this.nameSong[index]=this.nameSongUni
    // this.urlMp3[index]=this.urlmp3SongUni
    // this.imgSongUni[index]=this.imgSongUni
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: PlaylistPage,
    });
    return await modal.present();
  }
  
  // Hàm để ẩn modal mà không mất hoàn toàn
  async hideModal() {
    const modal = await this.modalController.getTop();
    if (modal) {
      modal.hidden = true; // Sử dụng thuộc tính hidden
    }
  }
  async ngOnInit() {
    await Promise.all([this.CreateFunc()])
      .then(() => this.RunCreateCard());
    await this.GetAllData()


  }

  TakeNameAlbums(index:number){
    const dataAlbums = this.cardsPlaylist[index]
    const nameAlbum = dataAlbums.imgsong
    const song = this.getSongsByAlbumTitle(this.dataAll,nameAlbum)
    this.songsOfAlbums = song
    this.showModalFirst = true
    console.log(nameAlbum)
    console.log(dataAlbums)
    console.log(song)
  }
// Lấy Nhạc theo tên albums
  getSongsByAlbumTitle(artistData: any, albumTitle: any): any[] | null {
    for (let i = 0; i < artistData.length; i++) {
      let albums = artistData[i].albums;
      for (let j = 0; j < albums.length; j++) {
        if (albums[j].title === albumTitle) {
          return albums[j].songs;
        }
      }
    }
    return null; // Trả về null nếu không tìm thấy album
  }
  async CreateFunc() {
    await this.GetUrlMp3()
    await this.GetDataImgSongs()
    await this.GetDataSongsAlbums()
    await this.GetDataNamesAlbums()
    await this.GetDataImgAlbums()
    await this.GetDataNameSinger()
  }
  async RunCreateCard(): Promise<any> {
    await this.CreateCard(this.cardsMusic, this.imgSong, this.urlMp3, this.nameSong)
    await this.CreateCard(this.cardsPlaylist, this.nameAlbums, this.imgAlbums, this.nameSinger)
  
  }
  async GetDataNamesAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataNamesAlbums()
    this.nameAlbums = data
  }
  async GetDataImgAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataImgAlbums()
    for (let index = 0; index < 8; index++) {
      this.imgAlbums.push(data[index]);
    }
  }
  async GetDataNameSinger(): Promise<any> {
    const data = await this.apiservice.GetDataNameSinger()
    this.nameSinger = data
  }
  async GetDataSongsAlbums(): Promise<any> {
    const data = await this.apiservice.GetDataSongs()
    this.nameSong = data
  }
  async GetDataImgSongs(): Promise<any> {
    const data = await this.apiservice.GetDataImgSongs()
    this.imgSong = data
  }
  async GetUrlMp3(): Promise<any>{
    const data = await this.apiservice.GetUrlMp3()
    this.urlMp3 = data
  }

  async GetAllData() {
    const data = await this.apiservice.GetDataAll()
    this.dataAll = data
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  setVolume(event: any) {
    const newVolume = +event.detail.value;
    if (this.player) {
      this.player.volume(newVolume);
    }
  }

  start(track: any,index: any) {
    this.showModal = true
    const datane = this.cardsMusic[index]
    this.urlmp3SongUni = datane.urlmp3
    console.log(this.urlmp3SongUni)
    console.log(datane)
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

  async CreateCard(cards: any, arrayName: any, arrayImg: any, arrayTitle: any) {
    for (let i = 0; i < arrayName.length; i++) {
      const Songs = {
        urlmp3: arrayImg[i],
        imgsong: arrayName[i],
        namesong: arrayTitle[i],
      };
      // Đưa đối tượng vào mảng people
      cards.push(Songs);
    }
  }
}

