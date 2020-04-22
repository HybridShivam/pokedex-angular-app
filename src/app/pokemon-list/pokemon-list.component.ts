import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../shared/pokemon.model';
import {PokemonService} from '../shared/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {


  pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.pokemonsListChanged.subscribe(
      (response) => {
        this.pokemons = response;
      }
    );
  }

}
