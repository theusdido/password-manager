import { Component, OnInit, ViewChild } from '@angular/core';
import { Credencial } from '../classe/credencial';
import { FirebaseService } from '../service/firebase.service';
import { LocalStorageService } from '../service/local-storage.service';
import { 
  IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonItem,
	IonLabel,
	IonButton,
	IonAccordionGroup,
	IonAccordion,
	IonIcon,
	IonFab,
	IonFabButton,
  IonInput, 
  IonList, 
  IonSearchbar, 
  IonButtons, 
  IonListHeader,
  AlertController, IonCard, IonCardContent, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { add,create,createOutline,eye,eyeOff,pencil,trash, warning } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RodapePage } from "../rodape/rodape.page";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonAccordionGroup,
    IonAccordion,
    IonIcon,
    RouterLink,
    IonFab,
    IonFabButton,
    IonInput,
    IonButton,
    IonList,
    IonSearchbar,
    IonButtons,
    IonListHeader,
    IonCard,
    IonCardContent,
    IonText,
    RodapePage
]
})
export class ListarPage implements OnInit {
  public data:Array<Credencial> = [];
  public filter_data:Array<Credencial> = [];
  public icon_type:string = 'eye-outline';
  public pwd_type:string = 'password';
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup;

  constructor(
    public local_storage:LocalStorageService,    
    private alert_controller: AlertController
  ) {
    addIcons({ add,eye,eyeOff,trash,create,warning });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.carregar();
  }

  carregar(){
    this.data = this.local_storage.getJSON('credenciais');
    this.filter_data = this.data.map(d => ({
      ...d,
      senhaVisivel: false,
      is_nao_consolidado: (d.id == 0 || d.id == null || d.id == undefined)
    }))
    .reverse();
  }

  toggleSenha(item: any) {
    item.senhaVisivel = !item.senhaVisivel;
  }
  
  getTipoSenha(item: any): string {
    return item.senhaVisivel ? 'text' : 'password';
  }
  
  getIconeSenha(item: any): string {
    return item.senhaVisivel ? 'eye-off' : 'eye';
  }

  pesquisar(termo: string) {
    const termoNormalizado = termo.toLowerCase();
    this.filter_data = this.data
      .filter(item =>
        item.site.toLowerCase().includes(termoNormalizado) ||
        item.url.toLowerCase().includes(termoNormalizado) ||
        item.login.toLowerCase().includes(termoNormalizado)
      )
      .map(d => ({ ...d, senhaVisivel: false }));
  }

  async excluir(indice:number){
    const alert = await this.alert_controller.create({
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: () => {
            this.data.splice(indice,1);
            this.local_storage.set('credenciais',this.data);
            this.carregar();
          },
        },
      ]
    });

    await alert.present();    
  }
}