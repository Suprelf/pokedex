import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() id: number = 0
  @Input() name: string = ''
  @Input() sprite: string = ''
  @Input() types: Array<string> = []
  @Input() stats: Array<number> = []
  @Input() weight: number = 0
  @Input() moves: number = 0

  @Output() filterByTypeEvent = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  TypeClicked(type: string) {
    this.filterByTypeEvent.emit(type)
  }

}
