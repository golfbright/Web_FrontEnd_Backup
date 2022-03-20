import { NbMenuItem } from '@nebular/theme';
import { AuthService } from '../services/auth.service';

export const MENU_ITEMS: NbMenuItem[] = [
  {
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
  },
  
];