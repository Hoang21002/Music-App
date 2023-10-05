import { Component, OnInit } from '@angular/core';

import { ApiService } from '../API/api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  dataAll: any[] = []
  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {
      this.GetApi()
  }
  
  async GetApi(): Promise<any>{
    await this.apiservice.GetApi()
    const data = this.apiservice.dataAll
    console.log(data)
  }
}
