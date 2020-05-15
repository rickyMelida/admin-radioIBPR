import { Component, OnInit, ViewChild } from '@angular/core';

import { CaledarioComponent } from '../../components/caledario/caledario.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
