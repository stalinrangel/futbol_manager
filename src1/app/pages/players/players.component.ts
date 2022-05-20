import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  page = 2;
  page1 = 3;
  active = 1;
  active1 = 1;
  active2 = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
