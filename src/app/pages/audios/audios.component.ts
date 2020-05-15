import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-audios',
  templateUrl: './audios.component.html',
  styleUrls: ['./audios.component.css']
})
export class AudiosComponent implements OnInit {
  public canciones:any = [
    {
      name: 'Ricardo'
    },
    {
      name: 'Anahi'
    },
    {
      name: 'Ruiz'
    },
    {
      name: 'Diaz'
    },
    {
      name: 'Encina'
    }
  ];
  constructor() { }

  ngOnInit(): void {

  }

}
