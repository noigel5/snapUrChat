import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class MapComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
