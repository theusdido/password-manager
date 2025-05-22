import { inject, Injectable } from '@angular/core';
import { Database, ref, list, set, onValue, remove } from '@angular/fire/database';
import { firstValueFrom, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RealtimeDatabaseService {

  constructor(
    private db: Database = inject(Database)
  ) { }

  ref(url: string) {
    return ref(this.db, url);
  }

  list(url: string){
    return list(this.ref(url));
  }

  add(url: string, data: any, id:number = 0)
  {    
    return from(
      (async () => {
        let indice = 1;
        const snapshot: any = await firstValueFrom(this.list(url));
  
        if (snapshot !== undefined) {
          indice = snapshot.length + 1;
        }
        
        const url_indice = id == 0 ? indice : id;
        const url_full = `${url}/${url_indice}`;
        const ref = this.ref(url_full);
  
        return set(ref, data);
      })()
    );

  }

  query(url: string, callback: any = () => {}) : () => void{
    return onValue(this.ref(url), callback);
  }

  remove(url: string) {
    return remove(this.ref(url));
  }

  set(url: string, data: any)
  {
    return set(this.ref(url), data);
  }
}
