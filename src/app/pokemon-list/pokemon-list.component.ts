import {Component, OnInit} from '@angular/core';
import {Pokemon} from '../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {


  pokemons: Pokemon[] = [new Pokemon('Pikachu', 1), new Pokemon('Raichu', 2)];

  constructor() {
  }

  ngOnInit(): void {
  }

}
