import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskTransportService {
  url="http://localhost:12156/api/tasklists/"
  constructor(private http:HttpClient) {
  }
  getTransport() {
    return this.http.get(this.url);
  }
  getTransportById(id: number) {
    return this.http.get(this.url + id);
  }

  addTransport(data){
    console.log(data);
    return this.http.post(this.url,data);
  }

  editTransport(data){
    return this.http.put(this.url + data.id,data);
  }

  deleteTransport(data){
    console.log(data);
    return this.http.delete(this.url + data.id);
  }

  getAllAddress()
  {
    return this.http.get(this.url + "getalladdress");
  }

  getAllCar()
  {
    return this.http.get(this.url + "getallcar");
  }

  getAddressById(data)
  {
    return this.http.get(this.url + "address/" + data);
  }
  getVehicleById(data)
  {
    return this.http.get(this.url + "vehicle/" + data);
  }
}
