import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../shared/pokemon.service';
import {Pokemon} from '../shared/pokemon.model';
import {forkJoin} from 'rxjs';

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
  pokemonStats;
  maxStat;

  imageLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    // Initialization Logic after Pokemon Fetching in Both If and Else Conditions
    this.activatedRoute.params.subscribe(
      (params) => {
        this.pokemonId = params['id'];
        this.pokemonService.activePokemon = this.pokemonId;
      }
    );
    if (this.pokemonService.pokemons[0]) {
      this.pokemon = this.pokemonService.pokemons[this.pokemonId - 1];
      this.initializePokemonFields();
      this.pokemonService.getPokemonSpeciesById(this.pokemonId).subscribe(
        response => {
          this.pokemon.color = response['color']['name'];
        }
      );

    } else {
      forkJoin([this.pokemonService.getPokemonById(this.pokemonId),
        this.pokemonService.getPokemonSpeciesById(this.pokemonId)]).subscribe(
        results => {
          this.pokemon = new Pokemon(
            results[0]['name'],
            results[0]['id'],
            results[0]['sprites'],
            results[0]['types'],
            results[0]['abilities'],
            results[0]['height'],
            results[0]['weight'],
            results[0]['base_experience'],
            results[0]['forms'],
            results[0]['held_items'],
            results[0]['game_indices'],
            results[0]['is_default'],
            results[0]['location'],
            results[0]['moves'],
            results[0]['order'],
            results[0]['stats'],
            results[0]['species'],
            results[1]['color']['name']
          );
          this.initializePokemonFields();
        }
      );
      // this.pokemon = this.pokemonService.getPokemonById(this.pokemonId).subscribe(
      //   (response) => {
      //     this.pokemon = new Pokemon(
      //       response['name'],
      //       response['id'],
      //       response['sprites'],
      //       response['types'],
      //       response['abilities'],
      //       response['height'],
      //       response['weight'],
      //       response['base_experience'],
      //       response['forms'],
      //       response['held_items'],
      //       response['game_indices'],
      //       response['is_default'],
      //       response['location'],
      //       response['moves'],
      //       response['order'],
      //       response['stats'],
      //       response['species'],
      //       null
      //     );
      //     this.pokemonService.getPokemonColorById(this.pokemonId).subscribe(
      //       (color) => {
      //         this.pokemon.color = color['color'];
      //       }
      //     );
      //     this.initializePokemonFields();
      //   });
    }
  }

  initializePokemonFields() {
    this.pokemonImageUrl = 'https://raw.githubusercontent.com/HybridShivam/pokemon.json/master/images/' +
      this.pad(this.pokemon.id, 3) + '.png';
    this.heightInMetres = (this.pokemon.height * 0.1).toFixed(1);
    this.heightInFeetInches = Math.floor(this.heightInMetres * 3.2808) + '"' + Math.round(((this.heightInMetres * 3.2808) % 1) * 12) + '\'';
    this.weightInKgs = (this.pokemon.weight * 0.1).toFixed(1);
    this.weightInPounds = (this.weightInKgs * 2.205).toFixed(1);
    this.pokemonStats = [
      this.pokemon.stats[5]['base_stat'],
      this.pokemon.stats[4]['base_stat'],
      this.pokemon.stats[3]['base_stat'],
      this.pokemon.stats[2]['base_stat'],
      this.pokemon.stats[1]['base_stat'],
      this.pokemon.stats[0]['base_stat']
    ];
    this.maxStat = Math.max(...this.pokemonStats);
  }

  pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  imagePreload() {
    this.imageLoading = false;
    // console.log('ImageLoaded');
  }
}
