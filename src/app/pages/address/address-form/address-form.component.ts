import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AddressService } from "../../../services/address.service";


@Component({
  selector: 'ngx-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  accept = localStorage.getItem('addressFormPage');
  apiData: any = {};
  dataId: number;
  formType: string;
  allAddress: any[];
  constructor( private router: Router,private addressService:AddressService,private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params)=> this.dataId = params['dataFormParam']);
    console.log(this.dataId);
    if (this.dataId != undefined && this.dataId != null) {
      this.formType = "Edit";
       this.addressService.getAddressById(this.dataId).subscribe ((res: any)=>{
         this.apiData = res;
         console.log(this.apiData);
       })
      }
      else{
        this.formType = "Add";
      }
  }

  ngOnInit(): void {
    this.addressService.getAddress().subscribe((res: any)=>{
      this.allAddress = res;
    });
  }
  OnClickCancel(){
    this.router.navigate(['/pages/address']);
  }
  OnClickSave(){
    if (window.confirm('Are you sure you want to save?')) {
      console.log(this.apiData);
      this.addressService.addAddress(this.apiData).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/pages/address',{ formTypeParam: 'success' }]);
        }, (error) => {
          this.router.navigate(['/pages/address',{ formTypeParam: 'danger' }]);
        });
      }
  }
  OnlyNumbersAllowed(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      console.log('charCode restricted is' + charCode);
      return false;
    }
    return true;
  }
}
