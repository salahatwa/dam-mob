import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from '../../core/menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() item: Menu;

  @Output() clicked = new EventEmitter();

  constructor() { }

  ngOnInit() { }



}
