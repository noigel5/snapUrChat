import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms'
import { GeolocatorService } from '../services/geolocator.service';

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

  latitude : number = 0
  longitude : number = 0
  altitude : number | null = 0

  constructor( public geolocationService : GeolocatorService) {  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
    this.altitude = position.coords.altitude
  }

  resetPosition () {
    this.latitude = 0
    this.longitude = 0
    this.altitude = 0
  }

  ngOnInit() {
    this.getCurrentPosition()
  }
}
