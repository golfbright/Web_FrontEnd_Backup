import { NgModule } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AccountComponent } from './account/account.component';
import { RoleComponent } from './role/role.component';
import { AccountRoleComponent } from './account-role/account-role.component';
import { AddressComponent } from './address/address.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesRoutingModule } from './tables/tables-routing.module';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { FormsRoutingModule } from './forms/forms-routing.module';
import { FormsModule } from '@angular/forms';
import {CheckboxModule} from 'primeng-lts/checkbox';
import { NbAuthModule } from '@nebular/auth';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { NotAcceptComponent } from './not-accept/not-accept.component';
import { AddressFormComponent } from './address/address-form/address-form.component';
import { TaskTransportFormComponent } from './task-transport/task-transport-form/task-transport-form.component';
import { TaskTransportComponent } from './task-transport/task-transport.component';
import { VehicleFormComponent } from './vehicle/vehicle-form/vehicle-form.component';
import {DropdownModule} from 'primeng-lts/dropdown';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    FormsModule,
    CheckboxModule,
    DropdownModule
  ],
  declarations: [
    PagesComponent,
    AccountComponent,
    RoleComponent,
    AccountRoleComponent,
    AddressComponent,
    VehicleComponent,
    AccountFormComponent,
    RoleFormComponent,
    NotAcceptComponent,
    TaskTransportComponent,
    TaskTransportFormComponent,
    VehicleFormComponent,
    AddressFormComponent,
  ],
})
export class PagesModule {
}
