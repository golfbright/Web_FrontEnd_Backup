import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { AddressService } from "../../services/address.service";


@Component({
  selector: 'ngx-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  accept = localStorage.getItem('addressPage');
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
      namePlace: {
        title: 'ชื่อสถานที่',
        type: 'string',
      },
      district: {
        title: 'อำเภอ',
        type: 'string',
      },
      country: {
        title: 'เขต',
        type: 'string',
      },
      street: {
        title: 'ถนน',
        type: 'string',
      },
      zipCode: {
        title: 'รหัสไปรณ์ษณี',
        type: 'string',
      },
      province: {
        title: 'จังหวัด',
        type: 'string',
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  constructor(private addressService: AddressService, private router: Router,
    private toastrService: NbToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addressService.getAddress().subscribe((res: any) => {
      this.source.load(res);
    });
  }
  formType: string;
  routeFormCreate() {
    this.router.navigate(['/pages/address/address-form']);
  }
  routeFormEdit(event) {
    this.router.navigate(['/pages/address/address-form', { dataFormParam: event.data.id }]);
  }
  onDeleteConfirm(event) {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {

      this.addressService.deleteAddress(event.data).subscribe(
        (res) => {
          console.log(res);
          const status: string = "success";
          this.toastrService.show(status, `Delete: success`, { status });
        }, (error) => {
          const status: string = "danger";
          this.toastrService.show(status, `Delete: failed`, { status });
        });
      window.location.reload();
    } else {
      const newAddress = new Address();
    }
  }
}
export class Address {
  id: number = 0;
}

