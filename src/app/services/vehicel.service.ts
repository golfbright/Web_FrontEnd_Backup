import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicelService {
  url="http://localhost:12156/api/vehicles/"
  constructor(private http:HttpClient) { }
  getVehicel() {
    return this.http.get(this.url);
  }
  getVehicelById(id: number) {
    return this.http.get(this.url + id);
  }

  addVehicel(data){
    console.log(data);
    return this.http.post(this.url,data);
  }

  editVehicel(data){
    return this.http.put(this.url + data.id,data);
  }

  deleteVehicel(data){
    console.log(data);
    return this.http.delete(this.url + data.id);
  }
}
