import {Component, DoCheck, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SidebarService} from './sidebar.service';
import {LocationStrategy} from '@angular/common';

// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit, DoCheck {
  menus = [];
  searchItem = '';
  @ViewChild('searchBar') searchBar: ElementRef;

  constructor(public sidebarservice: SidebarService, private locationStrategy: LocationStrategy) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
    this.sidebarservice.searchItemSubject.subscribe(response => {
      this.searchItem = response;
    });
    // Subscribe to back  navigation
    this.locationStrategy.onPopState(() => {
      // Override Only When Mobile and Sidebar is open
      if (screen.width <= 768 && (this.sidebarservice.getSidebarState() === false)) {
        history.pushState(null, null, location.href);
        this.searchEnter();
        console.log('BackOverride');
      }
    });
  }

  ngDoCheck(): void {
    this.sidebarservice.searchItemSubject.next(this.searchItem);
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

  searchEnter() {
    if (screen.width <= 768) {
      this.sidebarservice.toggle();
      this.searchBar.nativeElement.blur();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log(this.sidebarservice.getSidebarState());

    // Override Back Key
    console.log('Override Back Key');
    // history.pushState(null, null, location.href);

  }


}
