import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../shared/pokemon.model';
import {PokemonService} from '../shared/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {


  pokemons: Pokemon[] = [];
  noOfPokemonLoaded: number;
  pokemonListSubscription;
  noOfLoadedPokemonSubscription;

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonListSubscription = this.pokemonService.pokemonsListChanged.subscribe(
      (response) => {
        this.pokemons = response.slice(0, this.noOfPokemonLoaded);
      }
    );
    this.noOfLoadedPokemonSubscription = this.pokemonService.newPokemonsLoaded.subscribe(
      (response) => {
        this.noOfPokemonLoaded = response;
      }
    );
  }

  ngOnDestroy(): void {
    this.pokemonListSubscription.unsubscribe();
  }

}
