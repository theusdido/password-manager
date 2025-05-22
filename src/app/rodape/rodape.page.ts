import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonText, IonFooter, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone';
import { construct, settings } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.page.html',
  styleUrls: ['./rodape.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonButtons, IonFooter, IonText, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,RouterLink]
})
export class RodapePage implements OnInit {

  constructor() {
    addIcons({settings,construct});
  }

  ngOnInit() {
  }

}
