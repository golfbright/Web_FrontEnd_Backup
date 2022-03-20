import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as internal from 'assert';
import { AccountService } from '../../../services/account.service';
import { RoleService } from '../../../services/role.service';



@Component({
  selector: 'ngx-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  accept = localStorage.getItem('roleFormPage');

  formType: string;
  dataId: number;
  apiData: any = {};
  allRole: any[];
  selectedRoles: string[] = [];
  getConfigValue(key: string): any{};

  constructor(private roleService: RoleService,private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe((params: Params) => this.dataId = params['dataFormParam']);
    console.log(this.dataId);


    if (this.dataId != undefined && this.dataId != null) {
      this.formType = "แก้ไข";
      this.roleService.getRoleById(this.dataId).subscribe((res: any) => {
        this.apiData = res;
        console.log(this.apiData.accountRoles);
        this.apiData.roleIds = this.apiData.accountRoles.map(x => {
          return x.roleId;
        });

      })
    } 
    else {
      this.formType = "สร้าง";
    }
  }

  ngOnInit(): void {
      this.roleService.getRole().subscribe((res: any) => {
      // this.allRole.load(res);
      this.allRole = res;
    });
  }



  OnClickSave() {
    
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการบันทึก?')) {
      console.log(this.apiData);
  
      this.roleService.addRole(this.apiData).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/pages/role', { formTypeParam: 'success' }]);
        }, (error) => {
          this.router.navigate(['/pages/role', { formTypeParam: 'danger' }]);
        });
    }
  }

  OnClickCancel() {
    this.router.navigate(['/pages/role']);
  }

}
