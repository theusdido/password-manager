import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public local_storage:any = window.localStorage;
  constructor() { }

  set(key:string,value:any){
    this.local_storage.setItem(key,value);
  }

  get(key:string){
    return this.local_storage.getItem(key);
  }

  del(key:string){
    this.set(key,'');
  }

  clear(){
    this.local_storage.clear();
  }

  rm(key:string){
    this.local_storage.removeItem(key)
  }
}