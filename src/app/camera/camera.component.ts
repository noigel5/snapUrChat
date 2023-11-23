import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'
import { BildBeschreibung } from '../data/bild-beschreibung';
import { SupabaseService } from '../services/supabase.service';
import { FormsModule, FormGroup, FormBuilder, FormControl, ReactiveFormsModule, Validators  } from '@angular/forms'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GeolocatorService } from '../services/geolocator.service';

@Component({
  selector: 'app-camera',
  templateUrl: 'camera.component.html',
  styleUrls: ['camera.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CameraComponent {

  bildBeschreibung : BildBeschreibung = new BildBeschreibung
  bildUrl : string | undefined
  latitude : number = 0
  longitude : number = 0
  altitude : number | null = 0
  bildFile: any;

  public bildForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    beschreibung: new FormControl(''),
    nutzername: new FormControl('')
  });

  constructor(
    private geolocationService : GeolocatorService,
    private supabaseService : SupabaseService,
    private router : Router) {  }

  takePicture = async () => {

    // const permissionStatus = await Camera.requestPermissions()

    // console.log(permissionStatus)

    const bild = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.bildUrl = bild.webPath;

  };

  resetPicture () {
    this.bildUrl = ''
  }

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

  ngOnInit() {}

  saveBild (formData : any) {
    this.getCurrentPosition()
    this.bildBeschreibung.beschreibung = formData.beschreibung
    this.bildBeschreibung.nutzername = formData.nutzername
    this.bildBeschreibung.koordinaten = this.latitude+","+this.longitude+","+this.altitude
    let bildUrl: string | undefined = this.bildBeschreibung.bildUrl;
    bildUrl = bildUrl || '';

    this.supabaseService.createBildBeschreibung(this.bildBeschreibung, this.bildFile)
      .then(payload=>{
        this.resetPicture()
      }
    )
  }
}
