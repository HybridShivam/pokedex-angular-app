// import '@angular/compiler';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonItemComponent} from './pokemon-list/pokemon-item/pokemon-item.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {SearchFilterPipe} from './search-filter.pipe';
import {RouteReuseStrategy} from '@angular/router';
import {CustomRouteReuseStrategy} from './router-strategy';
import {VirtualScrollerModule} from 'ngx-virtual-scroller';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    PokemonItemComponent,
    PokemonDetailComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    VirtualScrollerModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot({preventDuplicates: true}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
