import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { AccountComponent } from './account/account.component';
import { AccountRoleComponent } from './account-role/account-role.component';
import { RoleComponent } from './role/role.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddressComponent } from './address/address.component';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { componentFactoryName } from '@angular/compiler';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { NotAcceptComponent } from './not-accept/not-accept.component';
import { AddressFormComponent } from './address/address-form/address-form.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import { TaskTransportFormComponent } from './task-transport/task-transport-form/task-transport-form.component';
import { TaskTransportComponent } from './task-transport/task-transport.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'account',
      component: AccountComponent,
    },
    {
      path: 'account/account-form',
      component: AccountFormComponent,
    },
    {
      path: 'account-role',
      component: AccountRoleComponent,
    },
    {
      path: 'role',
      component: RoleComponent,
    },
    {
      path: 'role/role-form',
      component: RoleFormComponent,
    },
    {
      path: 'address',
      component: AddressComponent,
    },
    {
      path: 'address/address-form',
      component: AddressFormComponent,
    },
    {
      path: 'vehicle',
      component: VehicleComponent,
    },
    {
      path: 'vehicle/vehicle-form',
      component: VehicleFormComponent,
    },
    {
      path: 'task-transport',
      component: TaskTransportComponent,
    },
    {
      path: 'task-transport/task-transport-form',
      component: TaskTransportFormComponent,
    },
    {
      path: 'Not-Accept',
      component: NotAcceptComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'account',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
