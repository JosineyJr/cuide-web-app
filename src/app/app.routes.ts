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
  },
  {
    path: 'attendance-type',
    loadComponent: () =>
      import(
        './features/management/pages/attendance-types/attendance-types.component'
      ).then((m) => m.AttendanceTypesComponent),
  },
  {
    path: 'attendance-types/:id',
    loadComponent: () =>
      import(
        './features/management/pages/attendance-types/attendance-types.component'
      ).then((m) => m.AttendanceTypesComponent),
  },
  {
    path: 'reference-way',
    loadComponent: () =>
      import(
        './features/management/pages/reference-ways/reference-ways.component'
      ).then((m) => m.ReferenceWaysComponent),
  },
  {
    path: 'reference-ways/:id',
    loadComponent: () =>
      import(
        './features/management/pages/reference-ways/reference-ways.component'
      ).then((m) => m.ReferenceWaysComponent),
  },
  {
    path: 'regional',
    loadComponent: () =>
      import('./features/management/pages/regionals/regionals.component').then(
        (m) => m.RegionalsComponent
      ),
  },
  {
    path: 'regionals/:id',
    loadComponent: () =>
      import('./features/management/pages/regionals/regionals.component').then(
        (m) => m.RegionalsComponent
      ),
  },
  {
    path: 'segment',
    loadComponent: () =>
      import('./features/management/pages/segments/segments.component').then(
        (m) => m.SegmentsComponent
      ),
  },
  {
    path: 'segments/:id',
    loadComponent: () =>
      import('./features/management/pages/segments/segments.component').then(
        (m) => m.SegmentsComponent
      ),
  },
  {
    path: 'service-type',
    loadComponent: () =>
      import(
        './features/management/pages/service-types/service-types.component'
      ).then((m) => m.ServiceTypesComponent),
  },
  {
    path: 'service-types/:id',
    loadComponent: () =>
      import(
        './features/management/pages/service-types/service-types.component'
      ).then((m) => m.ServiceTypesComponent),
  },
  {
    path: 'place',
    loadComponent: () =>
      import('./features/management/pages/places/places.component').then(
        (m) => m.PlacesComponent
      ),
  },
  {
    path: 'places/:id',
    loadComponent: () =>
      import('./features/management/pages/places/places.component').then(
        (m) => m.PlacesComponent
      ),
  },
];
