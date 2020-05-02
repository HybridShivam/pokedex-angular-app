// import "@angular/compiler";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {AppComponent} from './app.component';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {HeaderComponent} from './header/header.component';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonItemComponent} from './pokemon-list/pokemon-item/pokemon-item.component';
import {HttpClientModule} from '@angular/common/http';
// import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {FormsModule} from '@angular/forms';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {SearchFilterPipe} from './search-filter.pipe';
import {RouteReuseStrategy} from '@angular/router';
import {CustomRouteReuseStrategy} from './router-strategy';

// import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonDetailComponent,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    PerfectScrollbarModule,
    // Ng2SearchPipeModule,
    FormsModule,
    // BackButtonDisableModule.forRoot({
    //   preserveScrollPosition: true
    // })
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
