import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  url="http://localhost:12156/api/addresses/"
  constructor(private http:HttpClient) { }
  getAddress(){
    return this.http.get(this.url);
  }
  getAddressById(id: number){
    return this.http.get(this.url + id);
  }
  addAddress(data){
    return this.http.post(this.url,data);
  }
  editAddress(data){
    return this.http.put(this.url + data.id,data);
  }
  deleteAddress(data){
    return this.http.delete(this.url + data.id);
  }
}
