import {Component} from '@angular/core';
import {PokemonService} from './shared/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loaded = false;

  constructor(private pokemonService: PokemonService) {
    this.pokemonService.EverythingLoaded.subscribe(res => {
      this.loaded = res;
    });
  }

  // constructor(private pokemonService) {
  //   this.pokemonService.EverythingLoaded.subscribe(res => {
  //     // this.loaded = res;
  //   });
  // }
}
