import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { addIcons } from 'ionicons';
import { navigateCircleOutline, cameraOutline, albumsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class AppComponent {

  constructor() {
    addIcons( {navigateCircleOutline, cameraOutline, albumsOutline } )
  }
}
