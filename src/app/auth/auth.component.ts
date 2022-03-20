import { Component, OnInit } from '@angular/core';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'ngx-auth',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private spinner$: NbSpinnerService ) { }

  ngOnInit(): void {
    this.spinner$.load();
  }

}
