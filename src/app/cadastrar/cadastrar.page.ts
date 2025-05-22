import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonInput, IonButton, IonFab, IonFabButton, IonIcon, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Credencial } from '../classe/credencial';
import { LocalStorageService } from '../service/local-storage.service';
import { FormsModule } from '@angular/forms';
import { save, checkmark, lockClosed, eye, link, globe, person, eyeOff } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonIcon, IonFabButton, IonFab, 
    IonInput,
    IonLabel,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
    IonButton
  ],
})
export class CadastrarPage implements OnInit {

  public _credencial = {} as Credencial;
  public eye_icon_pwd:string = 'eye';
  public type_pwd:string = 'password';
  private is_edit_mode:boolean = false;
  private data:Array<any> = [];
  private codigo:number = 0;
  private indice:number = -1;

  constructor(
    public local_storage: LocalStorageService,
    private activated_route:ActivatedRoute,
    private router:Router
  ) {
    addIcons({checkmark,globe,link,person,lockClosed,eye,save,eyeOff});

    this.activated_route.params.subscribe((params:any) => {
      if (params.codigo != undefined && !isNaN(params.codigo))
        {
        this.is_edit_mode = true;
        this.codigo = params.codigo;
      }
    });
  }

  ngOnInit(): void {
    this.carregar();
  }
  carregar() {
    const _data = this.local_storage.getJSON('credenciais');
    if (_data != null){
      this.data = _data;
      if (this.is_edit_mode){
        this._credencial = this.data.find((d,i) => {
          if (d.codigo == this.codigo){
            this.indice = i;
            return d;
          }
        });
      }
    }
  }
  armazenar(){
    if (this.is_edit_mode){
      this.data[this.indice] = this._credencial;
      this.local_storage.set('credenciais',this.data);
    }else{
      this._credencial.codigo = this.data.length + 1;
      this.local_storage.append('credenciais',this._credencial);
    }
    this.limpar();
    this.router.navigate(['/listar']);
  }
  limpar() {
    this.codigo = 0;
    this._credencial.login  = '';
    this._credencial.senha  = '';
    this._credencial.site   = '';
  }

  togglePwd()
  {
    this.type_pwd = this.type_pwd == 'password' ? 'text' : 'password';
    this.eye_icon_pwd = this.eye_icon_pwd == 'eye' ? 'eye-off' : 'eye';
  }
}
