import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { VehicelService } from "../../services/vehicel.service";


@Component({
  selector: 'ngx-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  accept = localStorage.getItem('vehiclePage');
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

    },
    mode: 'external',
    columns: {
      vehicleType: {
        title: 'ประเภทรถขนส่ง',
        type: 'string',
      },
      vehicleBrand: {
        title: 'แบรนรถขนส่ง',
        type: 'string',
      },
      vehiclePlate: {
        title: 'ป้ายทะเบียนรถขนส่ง',
        type: 'string',
      },
      vehicleStatus: {
        title: 'สถานะรถขนส่ง',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private vehicleService: VehicelService,private router: Router,
    private toastrService: NbToastrService,private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.vehicleService.getVehicel().subscribe((res: any)=>
   {
    this.source.load(res);
   });
  }
  formType:string ;
  routeFormCreate() {
    console.log('create');
    this.router.navigate(['/pages/vehicle/vehicle-form']);

  }
  routeFormEdit(event:any) {
    console.log('edit');
    this.router.navigate(['/pages/vehicle/vehicle-form',{dataFormParam: event.data.id}]);
  }
  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {

      this.vehicleService.deleteVehicel(event.data).subscribe(
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
      const newVehicle = new Vehicle();
    }
  }
}
export class Vehicle{
  id:number = 0;
}


