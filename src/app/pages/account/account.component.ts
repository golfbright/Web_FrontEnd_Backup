import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { count } from 'console';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { AccountService } from '../../services/account.service';
import { SetBaseUrlForApi } from '../../SetbaseUrlForApi';
import { AccountFormComponent } from './account-form/account-form.component';

@Component({
  selector: 'ngx-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent {

  accept = localStorage.getItem('accountPage');
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      // confirmDelete: true,
    },
    mode: 'external',
    columns: {
      employeeNo: {
        title: 'รหัสพนักงาน',
        type: 'number',
      },
      status: {
        title: 'สถานะ',
        type: 'string',
        width: '100px'
      },
      firstName: {
        title: 'ชื่อจริง',
        type: 'string',
        width: '100px',
      },
      lastName: {
        title: 'นามสกุล',
        type: 'string',
        width: '100px',
      },
      tel: {
        title: 'เบอร์โทรศัพท์',
        type: 'number',
      },
      cardId: {
        title: 'เลขประจำตัวประชาชน',
        type: 'number',
      },
      driverLicense: {
        title: 'เลขที่ใบขับขี่',
        type: 'string',
      },
      roleName: {
        title: 'ตำแหน่ง',
        type: 'string'
      },
      // imageProfilePath: {
      //   title: 'รูปถ่าย',
      //   type: 'string',
      // },

    },
  };

  source: LocalDataSource = new LocalDataSource();

  myParam: string;
  
  constructor(
    private http: HttpClient,private accountService: AccountService,
    private router: Router,private toastrService: NbToastrService,private route: ActivatedRoute) {

      // this.accountService.getAccount().subscribe((res: any) => {
      //   this.source.load(res);
      // })

      this.accountService.getAccount().subscribe((res: any) => {
        console.log(res);
        res.forEach(x => {
          x.roleName = x.accountRoles.map(x => x.roleName).join(',');
          
        });
        
        this.source.load(res);
        });
      
      this.route.params.subscribe((params: Params) => this.myParam = params['formTypeParam']);
      console.log(this.myParam);

      if(this.myParam !== undefined){
        const status = this.myParam;
        this.toastrService.show(status, `Add: ${status}`, {status});
        
      }
  }

  formType:string ;

  routeFormCreate() {
    console.log('create');
    this.router.navigate(['/pages/account/account-form']);

  }

  routeFormEdit(event:any) {
    console.log('edit');
    this.router.navigate(['/pages/account/account-form',{dataFormParam: event.data.id}]);
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('คุณแน่ใจใช่ไหมว่าต้องการลบ?')) {
      if(event.data.imageProfilePath)
      {
        const typeImgDelete = event.data.imageProfilePath.split('.').pop();
        this.http.get(SetBaseUrlForApi.baseUrl + 'api/Accounts/deleteImg/' + event.data.employeeNo + "." + typeImgDelete)
          .subscribe(event => {
            console.log(event);
          });
      }
      

      this.accountService.deleteAccount(event.data).subscribe(
        
        (res) => {
          console.log(res);
          const status:string = "success";
          this.toastrService.show(status, `Delete: success`, { status }  );
        }, (error) => {
          const status:string = "danger";
          this.toastrService.show(status, `Delete: failed`, { status }  );
        });
        window.location.reload();
    } else {
      const newAccount = new Account();
    }
  }
  
}

export class Account{
  id:number = 0;
}
