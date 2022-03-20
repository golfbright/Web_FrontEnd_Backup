import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { TaskTransportService } from "../../services/task-transport.service";


@Component({
  selector: 'ngx-task-transport',
  templateUrl: './task-transport.component.html',
  styleUrls: ['./task-transport.component.scss']
})
export class TaskTransportComponent implements OnInit {
  accept = localStorage.getItem('taskTransportPage');
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
      taskNumber: {
        title: 'รหัสงานขนส่ง',
        type: 'string',
      },
      taskStatus: {
        title: 'สถานะ',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  myParam: string;

  constructor(private taskTransportService: TaskTransportService,
    private router: Router,private toastrService: NbToastrService,private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.taskTransportService.getTransport().subscribe((res: any)=>{
      this.source.load(res);
    })
  }

  formType:string ;

  routeFormCreate() {
    console.log('create');
    this.router.navigate(['/pages/task-transport/task-transport-form']);

  }

  routeFormEdit(event:any) {
    console.log('edit');
    this.router.navigate(['/pages/task-transport/task-transport-form',{dataFormParam: event.data.id}]);
  }

  onDeleteConfirm(event): void {
    console.log(event);
    if (window.confirm('Are you sure you want to delete?')) {

      this.taskTransportService.deleteTransport(event.data).subscribe(
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
      const newTransport = new TaskTasnsport();
    }
  }

}

export class TaskTasnsport{
  id:number = 0;
}
