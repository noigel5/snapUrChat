import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-picture-overview',
  templateUrl: 'picture-overview.component.html',
  styleUrls: ['picture-overview.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class PictureOverviewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
