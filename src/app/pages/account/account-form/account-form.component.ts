import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as internal from 'assert';
import { AccountService } from '../../../services/account.service';
import { RoleService } from '../../../services/role.service';
import { SetBaseUrlForApi } from '../../../SetbaseUrlForApi';



@Component({
  selector: 'ngx-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  formType: string;
  statusCon: boolean = false;
  dataId: number;
  apiData: any = {};
  allRole: any[];
  selectedRoles: string[] = [];
  getConfigValue(key: string): any { };
  showImgCon: boolean = false;

  loginForm: FormGroup;

  accept = localStorage.getItem('accountFormPage');

  constructor(private http: HttpClient, private sant: DomSanitizer, private roleService: RoleService, private route: ActivatedRoute, private accountService: AccountService, private router: Router) {
    this.route.params.subscribe((params: Params) => this.dataId = params['dataFormParam']);
    console.log( this.accept );


    if (this.dataId != undefined && this.dataId != null) {
      this.formType = "แก้ไข";
      this.statusCon = true;
      this.accountService.getAccountById(this.dataId).subscribe((res: any) => {
        this.apiData = res;
        console.log(this.apiData.accountRoles);
        this.apiData.roleIds = this.apiData.accountRoles.map(x => {
          return x.roleId;
        });

        console.log(this.apiData);

        if (this.apiData.imageProfilePath !== null) {
          this.showImgCon = true;

        }
      })
    }
    else {
      this.formType = "สร้าง";
      this.apiData.status = "Not-Active";

    }

  }

  ngOnInit(): void {
    this.roleService.getRole().subscribe((res: any) => {
      // this.allRole.load(res);
      this.allRole = res;
    });


  }



  showImgPath() {
    var url = SetBaseUrlForApi.baseUrl + this.apiData.imageProfilePath;

    return url;

  }


  OnClickSave(files) {

    console.log(files);

    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการบันทึก?')) {


      if (files.length !== 0) {
        let fileToUpload = <File>files[0];

        const formData = new FormData();
        const typeImg = fileToUpload.name.split('.').pop();
        console.log(typeImg);

        formData.append('file', fileToUpload, this.apiData.employeeNo + "." + typeImg);

        if (this.apiData.imageProfilePath !== null && this.statusCon == true) {

          const typeImgDelete = this.apiData.imageProfilePath.split('.').pop();
          console.log(this.apiData.imageProfilePath);

          this.http.get(SetBaseUrlForApi.baseUrl + 'api/Accounts/deleteImg/' + this.apiData.employeeNo + "." + typeImgDelete)
            .subscribe(event => {
              console.log(event);
            });
          console.log(this.http);
        }

        this.apiData.imageProfilePath = "Resources//ImagesProfile//" + this.apiData.employeeNo + "." + typeImg;
        this.http.post(SetBaseUrlForApi.baseUrl + 'api/Accounts/upload', formData, { responseType: 'text', reportProgress: true, observe: 'events' })
          .subscribe(event => {
          });
      }

      this.accountService.addAccount(this.apiData).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/pages/account', { formTypeParam: 'success' }]);
        }, (error) => {
          this.router.navigate(['/pages/account', { formTypeParam: 'danger' }]);
        });

    }
  }



  OnClickCancel() {
    this.router.navigate(['/pages/account']);
  }

  OnlyNumbersAllowed(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is' + charCode);
      return false;
    }
    return true;
  }




  // public uploadFile = (files) => {
  //   if (files.length === 0) {
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
  //   this.http.post(SetBaseUrlForApi.baseUrl + 'api/Accounts/upload', formData, {responseType: 'text',reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       console.log(event);
  //     });
  // }
}