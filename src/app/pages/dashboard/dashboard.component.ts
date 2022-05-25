import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private p:PostService){}

  ngOnInit() {
    this.p.home().subscribe({
      next(data){
        console.log(data);
      },error(err){
        console.log(err);
      }
    })
  }

  

}
