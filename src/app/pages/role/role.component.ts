import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { count } from 'console';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../@core/data/smart-table';
import { AccountService } from '../../services/account.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  accept = localStorage.getItem('rolePage');
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
      roleName: {
        title: 'ชื่อบทบาท',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  myParam: string;
  
  constructor(private accountService: AccountService,private roleService: RoleService,
    private router: Router,private toastrService: NbToastrService,private route: ActivatedRoute) {

      // this.accountService.getAccount().subscribe((res: any) => {
      //   this.source.load(res);
      // })

      this.roleService.getRole().subscribe((res: any) => {
        res.forEach(x => {
          
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
    this.router.navigate(['/pages/role/role-form']);

  }

  routeFormEdit(event:any) {
    console.log('edit');
    this.router.navigate(['/pages/role/role-form',{dataFormParam: event.data.id}]);
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('คุณแน่ใจใช่ไหมว่าต้องการลบ?')) {
      
      this.roleService.deleteRole(event.data).subscribe(
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

