import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetBaseUrlForApi } from '../SetbaseUrlForApi';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url= SetBaseUrlForApi.baseUrl + "api/accounts/";

  getAccount() {
    return this.http.get(this.url);
  }

  constructor(private http: HttpClient) { }

  getAccountById(id: number) {
    return this.http.get(this.url + id);
  }

  addAccount(data){
    console.log(data);
    return this.http.post(this.url,data);
    // return this.http.get(this.url + 1);
  }

  editAccount(data){
    return this.http.put(this.url + data.id,data);
  }

  deleteAccount(data){
    console.log(data);
    return this.http.delete(this.url + data.id);
  }

  loginChk(employeeNo,password){
    return this.http.get(this.url + "login/" + employeeNo + "/" + password);
  }
  
}
