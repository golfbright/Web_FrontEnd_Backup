import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SetBaseUrlForApi } from '../SetbaseUrlForApi';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url= SetBaseUrlForApi.baseUrl + "api/roles/";

  getRole() {
    return this.http.get(this.url);
  }

  constructor(private http: HttpClient) { }

  getRoleById(id: number) {
    return this.http.get(this.url + id);
  }

  addRole(data){
    console.log(data);
    return this.http.post(this.url,data);
    // return this.http.get(this.url + 1);
  }

  editRole(data){
    return this.http.put(this.url + data.id,data);
  }

  deleteRole(data){
    console.log(data);
    return this.http.delete(this.url + data.id);
  }
}
