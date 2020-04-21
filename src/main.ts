import {Component, enableProdMode, OnInit} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {SidebarComponent} from './app/sidebar/sidebar.component';
import {SidebarService} from './app/sidebar/sidebar.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));




// @Component{
//   selector: 'app-main',
//     templateUrl: '../index.html',
//   styleUrls: ['../.styles.scss']
// }
// export class MainComponent implements OnInit {
//
//   mobile = false;
//
//   constructor(private sidebarService: SidebarService) {
//   }
//
//   ngOnInit(): void {
//     this.mobile = this.sidebarService.getSidebarState();
//   }


// }
