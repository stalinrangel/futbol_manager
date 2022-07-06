import { Injectable, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  @Input() information:any;

  constructor(private toastr: ToastrService) { }

  showSuccess(message:string): void{
    console.log(message)
    this.toastr.success(message);
  }
  showError(message:string){
    this.toastr.error(message);
  }
  showInfo(message:string){
    this.toastr.info(message);
  }
  showWarning(message:string){
    this.toastr.warning(message);
  }
  
  reset_sidebar(){
    //this.sidebar.reset();
  }
}
