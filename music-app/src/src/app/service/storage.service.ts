import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  public async set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getLogin(key: string): any {
    let value = localStorage.getItem(key);
    return value;
  }

  public exist(key: string): boolean {
    if (localStorage.getItem(key) !== null) {
      return true;
    } else {
      return false
    }
  }

  public async remove(key: string) {
    localStorage.removeItem(key);
  }
}
