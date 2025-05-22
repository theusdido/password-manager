import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { RealtimeDatabaseService } from './realtime-database.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private rt:RealtimeDatabaseService,
    public ls:LocalStorageService
  ) { }

  async upload(){
    let credenciais_rt:Array<any> = await this.all();
    let credenciais_ls = this.ls.getJSON('credenciais')
    .filter((d:any) => d.id == 0 || d.id == null || d.id == undefined);

    let total_rt = credenciais_rt.length;
    for (const c of credenciais_ls) {
        c.id = ++total_rt;
        const add:boolean = await this.add(c);
    };    
  }

  download(){
    this.rt.query('/credenciais',(snapshot:any)=>{      
      const _data = Object.values(snapshot.val() || []);
      this.ls.set('credenciais',_data);
    })();
  }

  all(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.rt.query('/credenciais', (snapshot: any) => {
        const _data = Object.values(snapshot.val() || []);
        resolve(_data);
      });
    });
  }

  add(data:any): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.rt.add('/credenciais',data).subscribe(()=>{
        resolve(true);
      });
    });    
    
  }

}