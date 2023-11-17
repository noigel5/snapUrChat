import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.component').then((m) => m.MapComponent),
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera.component').then((m) => m.CameraComponent),
  },
  {
    path: 'picture-overview',
    loadComponent: () => import('./picture-overview/picture-overview.component').then((m) => m.PictureOverviewComponent),
  },
  {
    path: '',
    redirectTo: 'camera',
    pathMatch: 'full',
  },
];
