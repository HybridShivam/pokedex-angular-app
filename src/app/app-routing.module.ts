import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PokemonListComponent} from './pokemon-list/pokemon-list.component';
import {PokemonDetailComponent} from './pokemon-detail/pokemon-detail.component';
import {RouteGuard} from './route.guard';

const routes: Routes = [
  {path: '', canActivate: [RouteGuard], redirectTo: '/pokemon', pathMatch: 'full', runGuardsAndResolvers: 'always'},
  {
    path: 'pokemon', canActivate: [RouteGuard], component: PokemonListComponent, runGuardsAndResolvers: 'always'
  },
  {path: 'pokemon/:id', canActivate: [RouteGuard], component: PokemonDetailComponent, runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
