import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms'
import { addIcons } from 'ionicons';
import { triangle, ellipse, square } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ],
})
export class AppComponent {
  constructor() {
    addIcons({triangle, ellipse, square})
  }
}
