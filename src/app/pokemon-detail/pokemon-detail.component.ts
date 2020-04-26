import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../shared/pokemon.service';
import {Pokemon} from '../shared/pokemon.model';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  pokemonId;
  pokemon;
  pokemonImageUrl;
  heightInMetres;
  heightInFeetInches;
  weightInKgs;
  weightInPounds;
  pokemonStats;
  maxStat;
  stats: string[];
  imageLoading = true;

  @ViewChild('hp', {static: false}) hp: ElementRef;
  @ViewChild('attack', {static: false}) attack: ElementRef;
  @ViewChild('defence', {static: false}) defence: ElementRef;
  @ViewChild('sAttack', {static: false}) sAttack: ElementRef;
  @ViewChild('sDefence', {static: false}) sDefence: ElementRef;
  @ViewChild('speed', {static: false}) speed: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private pokemonService: PokemonService,
              private renderer2: Renderer2) {
  }

  ngOnInit(): void {
    // Initialization Logic after Pokemon Fetching in Both If and Else Conditions
    this.activatedRoute.params.subscribe(
      (params) => {
        this.pokemonId = params['id'];
      }
    );
    // From List
    if (this.pokemonService.pokemons[0]) {
      this.pokemon = this.pokemonService.pokemons[this.pokemonId - 1];
      this.initializePokemonFields();
      this.pokemonService.getPokemonSpeciesById(this.pokemonId).subscribe(
        response => {
          this.pokemon.color = response['color']['name'];
          this.pokemonService.activePokemon.next(this.pokemon);
        }
      );
      // Directly From Link
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
          this.pokemonService.activePokemon.next(this.pokemon);
          this.initializePokemonFields();
        }
      );
    }
    this.calculateStats();
  }

  ngAfterViewInit(): void {
    // this.setStat();
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

  setStat() {
    console.log('CLicked');
    setTimeout(() => {
      this.renderer2.setStyle(this.hp.nativeElement, 'width', (this.pokemon.stats[5]['base_stat'] / this.maxStat * 100) + '%');
      this.renderer2.setStyle(this.attack.nativeElement, 'width', (this.pokemon.stats[4]['base_stat'] / this.maxStat * 100) + '%');
      this.renderer2.setStyle(this.defence.nativeElement, 'width', (this.pokemon.stats[3]['base_stat'] / this.maxStat * 100) + '%');
      this.renderer2.setStyle(this.sAttack.nativeElement, 'width', (this.pokemon.stats[2]['base_stat'] / this.maxStat * 100) + '%');
      this.renderer2.setStyle(this.sDefence.nativeElement, 'width', (this.pokemon.stats[1]['base_stat'] / this.maxStat * 100) + '%');
      this.renderer2.setStyle(this.speed.nativeElement, 'width', (this.pokemon.stats[0]['base_stat'] / this.maxStat * 100) + '%');
    }, 10000);
  }


  calculateStats() {
    for (let i = 0; i < 6; i++) {
      this.stats[i] = (this.pokemon.stats[i]['base_stat'] / this.maxStat * 100) + '%';
    }
  }

  ngOnDestroy() {
    this.pokemonService.activePokemon.next(null);
  }
}
