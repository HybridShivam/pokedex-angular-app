import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
// import {RouteGuard} from './route.guard';

const routes: Routes = [
  {
    path: '', redirectTo: '/pokemon', pathMatch: 'full'
    // , data: {reuse: true}
  },
  {
    path: 'pokemon', component: PokemonListComponent
    // ,data: {reuse: true}
  },
  {path: 'pokemon/:id', component: PokemonDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
