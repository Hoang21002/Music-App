import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private storageService: StorageService) { }

  start(): void {
    this.readFromStorage().then((accounts) => { });
  }
  readFromStorage(): Promise<any> {
    return this.storageService.getLogin('accounts');
  }
  addAccount(username: string, password: any) {
    this.storageService.set(username, password);
  }
  Login(username: string, password: string) {
    let isExist = this.storageService.getLogin(username);

    if (isExist !== null) {
      var account = JSON.parse(isExist);
      if (account.password == password) {
        return true;
      }
    }
    return false;
  }
  isExist(username: string): boolean {
    return this.storageService.exist(username);
  }
  removeAccount(username: string) {
    this.storageService.remove(username);
  }
  // getAllAccount(): any {
  //   return this.storageService.getAll();
  // }
}