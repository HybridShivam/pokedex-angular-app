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
  heightInMetres;
  heightInFeetInches;
  weightInKgs;
  weightInPounds;

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
    this.heightInMetres = (this.pokemon.height * 0.1).toFixed(1);
    this.heightInFeetInches = Math.floor(this.heightInMetres * 3.2808) + '"' + Math.round(((this.heightInMetres * 3.2808) % 1) * 12) + '\'';
    this.weightInKgs = this.pokemon.weight * 0.1;
    this.weightInPounds = (this.weightInKgs * 2.205).toFixed(1);
  }

  pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
}
