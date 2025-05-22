import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonButton, IonIcon, IonListHeader, IonAlert, AlertController } from '@ionic/angular/standalone';
import { cloudUpload, download, push, repeat, downloadOutline, trashBinOutline, swapVerticalOutline, removeCircleOutline, pushOutline, lockClosed, lockClosedOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { FirebaseService } from '../service/firebase.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
  standalone: true,
  imports: [IonAlert, IonListHeader, IonIcon, IonButton, IonLabel, IonItem, IonList, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfiguracaoPage implements OnInit {
  public alertButtons = [{
    text:'Ok',
    handler: async () => {
      if (this.upload_alert.el.processedInputs[0].value == 'pw-admin')
      {
        this.firebase.upload();
      }else{
        const alert = await this.alert_controller.create({
          message: 'Palavra Chave Incorreta.',
          buttons: ['Ok'],
        });
        await alert.present();   
      }
    }
  }];
  public alertInputs = [
    {
      placeholder:'Palavra Chave:'
    }
  ];

  @ViewChild('uploadAlert', { static: true }) upload_alert!: any;
  constructor(
    public firebase:FirebaseService,
    private ls:LocalStorageService,
    private alert_controller: AlertController
  ) {
    addIcons({swapVerticalOutline,downloadOutline,pushOutline,removeCircleOutline,trashBinOutline,repeat,push,download,cloudUpload,lockClosedOutline});
  }

  ngOnInit() {
  }

  async download(){

    const alert = await this.alert_controller.create({
      header: 'Baixar',
      subHeader: 'Tem certeza que deseja baixar as credenciais?',
      message: 'Essa operação irá apagar todas as credenciais salvas.',
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
            this.firebase.download();
          },
        },
      ]
    });

    await alert.present();            
  }  

  async limpar(){
    const alert = await this.alert_controller.create({
      message: 'Tem certeza que deseja apagar todas as credenciais?',
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
            this.clearRT();
          },
        },
      ]
    });

    await alert.present();
  }

  async sincronizar(){
    await this.firebase.upload();
    this.clearRT();
    this.firebase.download();
  }

  clearRT()
  {
    this.ls.set('credenciais',[]);
  }
}
