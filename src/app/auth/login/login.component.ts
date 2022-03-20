import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,private accountService: AccountService,private router: Router) {}

  loginForm: FormGroup;
    
    submitted = false;

    inputEmployeeNo:string;
    inputPassword:string;
    accountData:any;
    
    ngOnInit() {
        this.loginForm = new FormGroup({
            'employeeNo': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required)
        });
    }
    
    onSubmit() { 
        
        this.accountService.loginChk(this.inputEmployeeNo,this.inputPassword).subscribe((res:any)=> {
          this.accountData = res;
          console.log(this.accountData);
          if(this.accountData.length != 0){
            localStorage.setItem('accountData',JSON.stringify(this.accountData));
            this.authService.isLoggedIn();
            this.router.navigate(['/pages/account']);
          }
          else
          {
            alert("รหัสพนักงานหรือรหัสผ่านไม่ถูกต้อง");
          }
          
        });
    }

}
