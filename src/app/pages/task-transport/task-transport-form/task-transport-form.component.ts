import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TaskTransportService } from "../../../services/task-transport.service";


@Component({
  selector: 'ngx-task-transport-form',
  templateUrl: './task-transport-form.component.html',
  styleUrls: ['./task-transport-form.component.scss']
})
export class TaskTransportFormComponent implements OnInit {
  accept = localStorage.getItem('taskTransportFormPage');
  apiData: any = {};
  addressData: any;
  keepaddressData: any;
  carData: any;
  keepCarData: any;
  dataId: number;
  formType: string;
  constructor(private router: Router, private taskTransportService: TaskTransportService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.dataId = params['dataFormParam']);
    if (this.dataId != undefined && this.dataId != null) {
      this.formType = "Edit";
      this.taskTransportService.getTransportById(this.dataId).subscribe((res: any) => {
        const item: any = res;
        console.log(item[0]);
        this.apiData = item[0];
        console.log(this.apiData);
        this.taskTransportService.getAddressById(this.apiData.addressId).subscribe((res: any) => {
          const item: any = res;
          this.keepaddressData = item[0];
          this.apiData.addressId = this.keepaddressData.id;
          this.apiData.namePlace = this.keepaddressData.namePlace;
          this.apiData.addressNumber = this.keepaddressData.addressNumber;
          this.apiData.district = this.keepaddressData.district;
          this.apiData.country = this.keepaddressData.country;
          this.apiData.street = this.keepaddressData.street;
          this.apiData.zipCode = this.keepaddressData.zipCode;
          this.apiData.province = this.keepaddressData.province;
        })
        this.taskTransportService.getVehicleById(this.apiData.vehicleId).subscribe((res: any) => {
          const item: any = res;
          this.keepCarData = item[0];
          this.apiData.vehicleId = this.keepCarData.id;
          this.apiData.vehiclePlate = this.keepCarData.vehiclePlate;
          this.apiData.vehicleBrand = this.keepCarData.vehicleBrand;
          this.apiData.vehicleType = this.keepCarData.vehicleType;
        })
      })
      this.taskTransportService.getAllAddress().subscribe((res: any[]) => {
        const item: any = res;
        this.addressData = item;
        console.log(this.addressData);
      });
      this.taskTransportService.getAllCar().subscribe((res: any[]) => {
        const item: any = res;
        this.carData = item;
        console.log(this.carData);
      });
    }
    else {
      this.formType = "Add";
      this.taskTransportService.getAllAddress().subscribe((res: any[]) => {
        const item: any = res;
        this.addressData = item;
        console.log(this.addressData);
      });
      this.taskTransportService.getAllCar().subscribe((res: any[]) => {
        const item: any = res;
        this.carData = item;
        console.log(this.carData);
      });
    }
  }

  ngOnInit(): void {
  }
  OnClickSave() {
    console.log(this.apiData)
    if (window.confirm('Are you sure you want to save?')) {
      this.taskTransportService.addTransport(this.apiData).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/pages/task-transport']);
      }, (error) => {
        this.router.navigate(['/pages/task-transport']);
      }
      )
    }
  }
  OnClickCancel() {
    this.router.navigate(['/pages/task-transport'])
  }
  changeCheck() {
    console.log(this.keepaddressData);
    this.apiData.addressId = this.keepaddressData.id;
    this.apiData.namePlace = this.keepaddressData.namePlace;
    this.apiData.addressNumber = this.keepaddressData.addressNumber;
    this.apiData.district = this.keepaddressData.district;
    this.apiData.country = this.keepaddressData.country;
    this.apiData.street = this.keepaddressData.street;
    this.apiData.zipCode = this.keepaddressData.zipCode;
    this.apiData.province = this.keepaddressData.province;
  }
  changeCar() {
    this.apiData.vehicleId = this.keepCarData.id;
    this.apiData.vehiclePlate = this.keepCarData.vehiclePlate;
    this.apiData.vehicleBrand = this.keepCarData.vehicleBrand;
    this.apiData.vehicleType = this.keepCarData.vehicleType;
  }
}
