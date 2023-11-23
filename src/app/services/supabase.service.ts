import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { BildBeschreibung } from "src/app/data/bild-beschreibung";
import { environment } from "src/environments/environment";

export const BILD_BESCHREIBUNG_TABLE = 'bildBeschreibung'

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async uploadBild(file: File) {
    const filePath = `uploads/${file.name}`;
    let { error } = await this.supabase.storage.from('bilder').upload(filePath, file);

    if (error) {
      throw error;
    }

    return `https://rsfjzoarcbrwoppspfst.supabase.co/storage/v1/object/public/bilder/${filePath}`;
  }

  async getBildBeschreibung (id: number) {
    const { data, error } = await this.supabase
      .from(BILD_BESCHREIBUNG_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data
  }

  async getBildBeschreibungen () {
    const { data, error} = await this.supabase
      .from(BILD_BESCHREIBUNG_TABLE)
      .select('*')

    return data
  }

  async updateBildBeschreibung (bildBeschreibung: BildBeschreibung, bildFile: File) {
    const bildUrl = bildFile?await this.uploadBild(bildFile):'';

    if (!bildBeschreibung.id || !bildBeschreibung.beschreibung || !bildBeschreibung.nutzername || !bildBeschreibung.koordinaten) {
        console.log
        ('Invalide Bild Beschreibung');
    }

    const {data, error} = await this.supabase
      .from(BILD_BESCHREIBUNG_TABLE)
      .update({
        id:bildBeschreibung.id,
        beschreibung:bildBeschreibung.beschreibung,
        nutzername:bildBeschreibung.nutzername,
        koordinaten:bildBeschreibung.koordinaten,
        bild:bildUrl})
      .eq('id', bildBeschreibung.id)
      .select()

    return data
  }

  async createBildBeschreibung (bildBeschreibung: BildBeschreibung, bildFile: File) {
    const bildUrl = bildFile?await this.uploadBild(bildFile):'';
    const { data, error } = await this.supabase
      .from(BILD_BESCHREIBUNG_TABLE)
      .insert({
        id:bildBeschreibung.id,
        beschreibung:bildBeschreibung.beschreibung,
        nutzername:bildBeschreibung.nutzername,
        koordinaten:bildBeschreibung.koordinaten,
        bild:bildUrl
      })
      .select('*')
      .single();

    return data
  }

  async deleteBildBeschreibung (bildBeschreibung: BildBeschreibung) {
    const {data, error} = await this.supabase
      .from(BILD_BESCHREIBUNG_TABLE)
      .delete()
      .eq('id', bildBeschreibung.id)
      .select()

    return data
  }

}
