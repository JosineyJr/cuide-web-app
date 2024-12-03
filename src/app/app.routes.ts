import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'places',
    loadComponent: () =>
      import(
        './features/places/pages/browse-places/browse-places.component'
      ).then((m) => m.BrowsePlacesComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: '',
    redirectTo: '/places',
    pathMatch: 'full',
  },
  {
    path: 'place/:id',
    loadComponent: () =>
      import(
        './features/places/pages/place-details/place-details.component'
      ).then((m) => m.PlaceDetailsComponent),
  },
  {
    path: 'place',
    loadComponent: () =>
      import(
        './features/places/pages/upsert-place/upsert-place.component'
      ).then((m) => m.UpsertPlaceComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then((m) => m.LoginComponent),
  },
];
