import { Injectable } from '@angular/core';
import {SidebarService} from './sidebar/sidebar.service';
import {LocationStrategy} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BackOverrideService {

  constructor(public sidebarservice: SidebarService, private locationStrategy: LocationStrategy) {
    // Subscribe to back  navigation
    this.locationStrategy.onPopState(() => {
      // Override If and Only If When Mobile and Sidebar is open
      if (screen.width <= 768 && (this.sidebarservice.getSidebarState() === false)) {
        history.pushState(null, null, location.href);
        // this..searchEnter();
        console.log('BackOverride');
      }
    });
  }
}
