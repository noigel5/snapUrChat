import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.component.html',
  styleUrls: ['camera.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class CameraComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
