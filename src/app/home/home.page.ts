import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public site:string  = '';
  public login:string = '';
  public senha:string = '';
  constructor(
    public local_storage:LocalStorageService
  ) {
    this.site   = this.local_storage.get('site');
    this.login  = this.local_storage.get('login');
    this.senha  = this.local_storage.get('senha');
  }

  armazenar(){
    this.local_storage.set('site',this.site);
    this.local_storage.set('login',this.login);
    this.local_storage.set('senha',this.senha);
  }
  limpar(){
    //this.local_storage.clear();
    this.local_storage.del('senha');
    //this.local_storage.rm('senha');
  }
}