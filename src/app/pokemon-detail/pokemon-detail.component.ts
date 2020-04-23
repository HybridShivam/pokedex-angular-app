import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../shared/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemonId;
  pokemon;
  pokemonImageUrl;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.pokemonId = params['id'];
      }
    );
    this.pokemon = this.pokemonService.pokemons[this.pokemonId - 1];
    this.pokemonImageUrl = 'https://raw.githubusercontent.com/HybridShivam/pokemon.json/master/images/' +
      this.pad(this.pokemon.id, 3) + '.png';
  }

  pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
}
