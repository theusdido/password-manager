import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonFooter, IonToolbar, IonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonText, IonToolbar, IonFooter, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}
