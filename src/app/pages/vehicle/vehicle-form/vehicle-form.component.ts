import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { VehicelService } from "../../../services/vehicel.service";



@Component({
  selector: 'ngx-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.scss']
})
export class VehicleFormComponent implements OnInit {
  accept = localStorage.getItem('vehicleFormPage');
  apiData: any = {};
  allVehicle: any[];
  dataId: number;
  formType: string;
  constructor(private vehicleService: VehicelService, private router: Router,private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params)=> this.dataId = params['dataFormParam']);
    console.log(this.dataId);
    if(this.dataId != undefined && this.dataId != null)
    {
      this.formType = "Edit";
      this.vehicleService.getVehicelById(this.dataId).subscribe((res: any)=>{
        this.apiData = res;
        console.log(this.apiData);
      })
    }
    else{
      this.formType = "Add";
    }
   }

  ngOnInit(): void {
    this.vehicleService.getVehicel().subscribe((res:any)=>{
      this.allVehicle = res;
    });
  }
  OnClickCancel() {
    this.router.navigate(['/pages/vehicle'])
  }
  OnClickSave() {
    if (window.confirm('Are you sure you want to save?')) {
      this.vehicleService.addVehicel(this.apiData).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/pages/vehicle']);
        }, (error) => {
          this.router.navigate(['/pages/vehicle']);
        });
    }
  }
}
