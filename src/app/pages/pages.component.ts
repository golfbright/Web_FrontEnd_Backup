import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { find } from 'rxjs-compat/operator/find';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[] = [];
  accountData: any;
  constructor(
    private authService: AuthService) {
    this.accountData = authService.isLoggedIn();
    console.log(this.accountData.accountRoles[0]);


    const findRoleAdmin = this.accountData.accountRoles.find(x => x.roleName == "Admin");
    console.log(findRoleAdmin);

    if (findRoleAdmin) {
      this.menu = [{
        title: 'จัดการข้อมูล',
        group: true,
      },
      {
        title: 'บัญชีผู้ใช้',
        icon: 'people-outline',
        link: '/pages/account',
      },
      {
        title: 'บทบาท',
        icon: 'sbriefcase-outline',
        link: '/pages/role',

      },
      {
        title: 'ที่อยู่',
        icon: 'map-outline',
        link: '/pages/address',

      },
      {
        title: 'ยานพาหนะ',
        icon: 'car-outline',
        link: '/pages/vehicle',

      },
      {
        title: 'จัดการงานขนส่ง',
        icon: 'globe-2-outline',
        link: '/pages/task-transport',
      }];

      localStorage.setItem('accountFormPage', "true");
      localStorage.setItem('accountPage', "true");
      localStorage.setItem('rolePage', "true");
      localStorage.setItem('roleFormPage', "true");
      localStorage.setItem('addressPage', "true");
      localStorage.setItem('addressFormPage', "true");
      localStorage.setItem('vehiclePage', "true");
      localStorage.setItem('vehicleFormPage', "true");
      localStorage.setItem('taskTransportPage', "true");
      localStorage.setItem('taskTransportFormPage', "true");

    } else {
      const findRoleAOfficeWorker = this.accountData.accountRoles.find(x => x.roleName == "Office Worker");
      if (findRoleAOfficeWorker) {
        this.menu = [{
          title: 'จัดการข้อมูล',
          group: true,
        },
        {
          title: 'บัญชีผู้ใช้',
          icon: 'people-outline',
          link: '/pages/account',
        },
        {
          title: 'ที่อยู่',
          icon: 'map-outline',
          link: '/pages/address',
  
        },
        {
          title: 'ยานพาหนะ',
          icon: 'car-outline',
          link: '/pages/vehicle',
  
        },
        {
          title: 'จัดการงานขนส่ง',
          icon: 'globe-2-outline',
          link: '/pages/task-transport',
        }];
        localStorage.setItem('accountFormPage', "true");
        localStorage.setItem('accountPage', "true");
        localStorage.setItem('addressPage', "true");
        localStorage.setItem('addressFormPage', "true");
        localStorage.setItem('vehiclePage', "true");
        localStorage.setItem('vehicleFormPage', "true");
        localStorage.setItem('taskTransportPage', "true");
        localStorage.setItem('taskTransportFormPage', "true");
      }


    }

  }
}