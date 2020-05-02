import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pokedex';

  constructor() {
  }

  // toggleSidebar() {
  //   this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  // }
  //
  // toggleBackgroundImage() {
  //   this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  // }
  //
  // getSideBarState() {
  //   return this.sidebarservice.getSidebarState();
  // }
  //
  // hideSidebar() {
  //   this.sidebarservice.setSidebarState(true);
  // }
}
