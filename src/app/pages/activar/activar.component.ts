import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from 'src/app/services/identity.service';


@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styleUrls: ['./activar.component.css']
})
export class ActivarComponent implements OnInit {

  public tk:any=""; 
  public tkerror=false;
  public tkerr="";

  constructor(private identityService: IdentityService, private router: Router) { }

  ngOnInit(): void {
  }

  activar(){
    
    console.log(this.tk);
    let self = this;
    this.identityService.activate(this.tk).subscribe({
      next(data){
        console.log(data);
        self.router.navigate(['/login']);
      },error(err){
        console.log(err.error.err);
        self.tkerr=err.error.err;
        self.tkerror=true;
        console.log(self.tkerror);
      }
    })
  }

}
