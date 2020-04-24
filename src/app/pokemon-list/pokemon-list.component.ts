import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pokemon} from '../shared/pokemon.model';
import {PokemonService} from '../shared/pokemon.service';
import {SidebarService} from '../sidebar/sidebar.service';

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
  searchItem: string;
  searchItemSubscription;

  constructor(private pokemonService: PokemonService, private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    if (this.pokemonService.pokemons[0]) {
      this.pokemons = this.pokemonService.pokemons;
      this.noOfPokemonLoaded = this.pokemonService.noOfPokemonsLoaded;
    } else {
      console.log('New PokemonListSubscription Created');
      this.pokemonListSubscription = this.pokemonService.pokemonsListChanged.subscribe(
        (response) => {
          this.pokemons = response.slice(0, 50);
          console.log('Pokemon List Subsciption : List Updated');
        }
      );
      this.noOfLoadedPokemonSubscription = this.pokemonService.newPokemonsLoaded.subscribe(
        (response) => {
          this.noOfPokemonLoaded = response;
        }
      );
      this.searchItemSubscription = this.sidebarService.searchItemSubject.subscribe(
        (response) => {
          this.searchItem = response;
        }
      );
    }
  }

  ngOnDestroy(): void {
    // console.log('List Destroyed');
  }

}
