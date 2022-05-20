import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
