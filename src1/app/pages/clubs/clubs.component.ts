import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
