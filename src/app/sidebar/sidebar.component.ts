import {Component, DoCheck, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SidebarService} from './sidebar.service';
import {LocationStrategy} from '@angular/common';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {relativeToRootDirs} from '@angular/compiler-cli/src/transformers/util';
import {root} from 'rxjs/internal-compatibility';

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

  constructor(public sidebarservice: SidebarService, private locationStrategy: LocationStrategy, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit() {
    this.sidebarservice.searchItemSubject.subscribe(response => {
      this.searchItem = response;
    });
    console.log('Back Observable Created');
    // Subscribe to back  navigation
    this.locationStrategy.onPopState(() => {
      // Override If and Only If When Mobile and Sidebar is open
      if (screen.width <= 768 && (this.sidebarservice.getSidebarState() === false)) {
        history.pushState(null, null, window.location.pathname);
        this.searchEnter();
        console.log('BackOverride');
      }
      history.pushState(null, null, window.location.pathname);
    });
  }


  // @HostListener('window:popstate', ['$event'])
  // onBrowserBackBtnClose(event: Event) {
  //   console.log('back button pressed');
  //   if (screen.width <= 768 && (this.sidebarservice.getSidebarState() === false)) {
  //     event.preventDefault();
  //     this.router.navigate(this.activatedRoute.snapshot.url);
  //     this.searchEnter();
  //   }
  //   // this.router.navigate(['/home'], {replaceUrl: true});
  // }

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
    if (screen.width <= 768 && this.sidebarservice.getSidebarState() === false) {
      this.sidebarservice.toggle();
      this.searchBar.nativeElement.blur();
    }
  }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   console.log(this.sidebarservice.getSidebarState());
  //
  //   // Override Back Key
  //   console.log('Override Back Key');
  //   history.pushState(null, null, location.href);
  //
  // }


}
