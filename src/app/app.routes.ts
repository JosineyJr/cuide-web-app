import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'places',
    loadComponent: () =>
      import(
        './features/places/pages/browse-places/browse-places.component'
      ).then((m) => m.BrowsePlacesComponent),
  },
  {
    path: 'place-details/:id',
    loadComponent: () =>
      import(
        './features/places/pages/place-details/place-details.component'
      ).then((m) => m.PlaceDetailsComponent),
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
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'management',
    loadComponent: () =>
      import(
        './features/management/pages/management/management.component'
      ).then((m) => m.ManagementComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'regional',
    loadComponent: () =>
      import('./features/management/pages/regionals/regionals.component').then(
        (m) => m.RegionalsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'regionals/:id',
    loadComponent: () =>
      import('./features/management/pages/regionals/regionals.component').then(
        (m) => m.RegionalsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'segment',
    loadComponent: () =>
      import('./features/management/pages/segments/segments.component').then(
        (m) => m.SegmentsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'segments/:id',
    loadComponent: () =>
      import('./features/management/pages/segments/segments.component').then(
        (m) => m.SegmentsComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'service-type',
    loadComponent: () =>
      import(
        './features/management/pages/service-types/service-types.component'
      ).then((m) => m.ServiceTypesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'service-types/:id',
    loadComponent: () =>
      import(
        './features/management/pages/service-types/service-types.component'
      ).then((m) => m.ServiceTypesComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'place',
    loadComponent: () =>
      import('./features/management/pages/places/places.component').then(
        (m) => m.PlacesComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'places/:id',
    loadComponent: () =>
      import('./features/management/pages/places/places.component').then(
        (m) => m.PlacesComponent
      ),
    canActivate: [AuthGuard],
  },
];
