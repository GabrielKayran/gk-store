import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'purchase',
    pathMatch: 'full',
    loadComponent: () => import('./pages/purchase/purchase.component').then(m => m.PurchaseComponent)
  },
  { path: '**', pathMatch: 'full', redirectTo: ''},
  { path: 'home', pathMatch: 'full', redirectTo: ''}
];
