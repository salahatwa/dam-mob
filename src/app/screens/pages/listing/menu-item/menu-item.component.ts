import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../../core/models/menu.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() item: Menu;

  @Output() clicked = new EventEmitter();

  constructor(private router: Router) {
    
   }

  ngOnInit() { }

  isActive(url: string): boolean {
    return this.router.isActive(this.router.createUrlTree([url]), true);
  }




}
