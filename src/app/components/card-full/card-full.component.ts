import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-full',
  templateUrl: './card-full.component.html',
  styleUrls: ['./card-full.component.sass']
})
export class CardFullComponent implements OnInit {
  @Input() id: number = 0
  @Input() name: string = ''
  @Input() sprite: string = ''
  @Input() types: Array<string> = []
  @Input() stats: Array<number> = []
  @Input() weight: number = 0
  @Input() moves: number = 0
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
