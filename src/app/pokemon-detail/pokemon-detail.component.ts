import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PokemonService} from '../shared/pokemon.service';
import {Pokemon} from '../shared/pokemon.model';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemonId;
  pokemon;
  pokemonImageUrl;
  heightInMetres;
  heightInFeetInches;
  weightInKgs;
  weightInPounds;
  pokemonStats;
  maxPokemonStats = [];
  minPokemonStats = [];
  statsToShow = [];
  maxStat;
  maxMaxStat;
  maxMinStat;
  selectedStat = 'base';
  stats: string[] = ['0%', '0%', '0%', '0%', '0%', '0%'];
  imageLoading = true;
  abilities = [];
  abilitySelected = 0;
  allAbilitiesReceived = false;
  pokemonForms = [];
  formsFormattedNames = [];

  // @ViewChild('abilityModal', {static: false}) abilityModal: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    // history.pushState(null, null, './../');
    // history.back();
    // Initialization Logic after Pokemon Fetching in Both If and Else Conditions
    this.activatedRoute.params.subscribe(
      (params) => {
        this.pokemonId = params['id'];
      }
    );
    // From List
    if (this.pokemonService.pokemons[0]) {
      this.pokemon = this.pokemonService.pokemons[this.pokemonId - 1];
      this.pokemonService.getPokemonSpeciesById(this.pokemonId).subscribe(
        response => {
          this.pokemon.speciesDetails = response;
          this.pokemon.color = response['color']['name'];
          this.pokemonService.activePokemon.next(this.pokemon);
          // this.setTitleBarColor(this.pokemon.color);
          this.pokemon.genera = response['genera'];
          this.pokemon.varieties = response['varieties'];
        }
      );
      this.initializePokemonFields();
      // Directly From Link
    } else {
      forkJoin([this.pokemonService.getPokemonById(this.pokemonId),
        this.pokemonService.getPokemonSpeciesById(this.pokemonId)]).subscribe(
        results => {
          this.pokemon = new Pokemon(
            results[0]['name'],
            results[0]['id'],
            results[0]['sprites'],
            results[0]['types'].reverse(),
            results[0]['abilities'].reverse(),
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
            results[1],
            results[1]['color']['name'],
            results[1]['genera'],
            results[1]['varieties']
          );
          this.pokemon.speciesDetails = results[1];
          this.pokemon.genera = results[1]['genera'];
          this.pokemon.color = results[1]['color']['name'];
          // Why do i need this ???????????????????
          this.pokemonService.activePokemon.next(this.pokemon);
          this.initializePokemonFields();
          this.requestForms();
        }
      );
    }
  }

  initializePokemonFields() {
    this.requestAbilityDetails();
    // Conditionally Add HQ or Normal Images
    // if (this.pokemon.id > 151) {
    //   // Normal
    //   this.pokemonImageUrl = 'https://raw.githubusercontent.com/HybridShivam/pokemon.json/master/images/' +
    //     this.pad(this.pokemon.id, 3) + '.png';
    // } else {
    // HD
    if (this.pokemon.is_default) {
      this.pokemonImageUrl = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' +
        this.pad(this.pokemon.id, 3) + '.png';
    }
    // }
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
    setTimeout(() => {
      this.calculateStats();
    }, 500);
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

  calculateStats() {
    for (let i = 0; i < 6; i++) {
      let calculatedStat = this.pokemonStats[i] / this.maxStat * 100;
      if (calculatedStat > 10) {
        this.stats[i] = calculatedStat + '%';
      } else {
        calculatedStat = 10;
        this.stats[i] = calculatedStat + '%';
      }
    }
    this.statsToShow = this.pokemonStats;
    this.calculateMinStats();
    this.calculateMaxStats();
  }

  calculateMaxStats() {
    this.maxPokemonStats[0] = Math.floor((2 * this.pokemonStats[0] + 31 + 63) * 100 / 100 + 100 + 10);
    for (let i = 1; i < 6; i++) {
      this.maxPokemonStats[i] = Math.floor(Math.floor((2 * this.pokemonStats[i] + 31 + 63) * 100 / 100 + 5) * 1.1);
    }
    this.maxMaxStat = Math.max(...this.maxPokemonStats);
  }

  calculateMinStats() {
    this.minPokemonStats[0] = Math.floor((2 * this.pokemonStats[0]) * 100 / 100 + 100 + 10);
    for (let i = 1; i < 6; i++) {
      this.minPokemonStats[i] = Math.floor(Math.floor((2 * this.pokemonStats[i]) * 100 / 100 + 5) * 0.9);
    }
    this.maxMinStat = Math.max(...this.minPokemonStats);
  }

  showStats(type: string) {
    let stats;
    let maxStat;
    switch (type) {
      case 'base': {
        stats = this.pokemonStats;
        maxStat = this.maxStat;
        this.statsToShow = this.pokemonStats;
        this.selectedStat = 'base';
        break;
      }
      case 'max': {
        stats = this.maxPokemonStats;
        maxStat = this.maxMaxStat;
        this.statsToShow = this.maxPokemonStats;
        this.selectedStat = 'max';
        break;
      }
      case 'min': {
        stats = this.minPokemonStats;
        maxStat = this.maxMinStat;
        this.statsToShow = this.minPokemonStats;
        this.selectedStat = 'min';
      }
    }
    for (let i = 0; i < 6; i++) {
      let calculatedStat = stats[i] / maxStat * 100;
      if (calculatedStat > 15) {
        this.stats[i] = calculatedStat + '%';
      } else {
        calculatedStat = 15;
        this.stats[i] = calculatedStat + '%';
      }
    }
  }

  requestAbilityDetails() {
    const requests = [];
    for (const ability of this.pokemon.abilities) {
      requests.push(this.pokemonService.getAbility(ability['ability']['url']));
    }
    forkJoin(...requests).subscribe(
      (responses) => {
        for (let i = 0; i < responses.length; i++) {
          this.abilities[i] = responses[i];
        }
        this.allAbilitiesReceived = true;
      });
  }


  abilitySelect(no: number) {
    this.abilitySelected = no;
  }

  totalBaseStats() {
    return (this.pokemonStats[0] + this.pokemonStats[1] + this.pokemonStats[2] + this.pokemonStats[3]
      + this.pokemonStats[4] + this.pokemonStats[5]);
  }


  formatFormName(name) {
    // console.log(name);
    if (name.indexOf('-mega') !== -1) {
      let re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
      let regExp = new RegExp(re, 'g');
      var str = name.replace(regExp, '$2 $1');
      str = str.replace(/-/g, ' ');
    } else {
      let re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
      let regExp = new RegExp(re, 'g');
      var str = name.replace(regExp, '$2');
      str = str.replace(/-/g, ' ');
    }
    return str;
  }

  requestForms() {
    console.log('start');
    const formRequests = [];
    for (const varity of this.pokemon.varieties.slice(1)) {
      formRequests.push(this.pokemonService.getPokemonByURL(varity['pokemon']['url']));
      console.log(varity['pokemon']['url']);
    }
    this.pokemonForms[0] = this.pokemon;
    forkJoin(formRequests).subscribe(
      results => {
        console.log('received');
        console.log(this.pokemonForms[0]);
        for (let i = 0; i < results.length; i++) {
          this.pokemonForms[i + 1] = new Pokemon(
            results[i]['name'],
            this.pokemon.id,
            results[i]['sprites'],
            results[i]['types'].reverse(),
            results[i]['abilities'].reverse(),
            results[i]['height'],
            results[i]['weight'],
            results[i]['base_experience'],
            results[i]['forms'],
            results[i]['held_items'],
            results[i]['game_indices'],
            results[i]['is_default'],
            results[i]['location'],
            results[i]['moves'],
            results[i]['order'],
            results[i]['stats'],
            results[i]['species'],
            this.pokemon.speciesDetails,
            this.pokemon.color,
            this.pokemon.genera,
            this.pokemon.varieties
          );
          console.log(this.pokemonForms[i + 1]);
          // if (!this.pokemonForms[i + 1].is_default) {
          // const re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
          // const regExp = new RegExp(re, 'g');
          // const str = this.pokemonForms[i + 1]['varieties']['pokemon']['name'].replace(regExp, '$2');
          // let tempURL = this.pokemonImageUrl;
          // this.pokemonImageUrl = '';
          // this.pokemonImageUrl = tempURL = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' +
          //   this.pad(this.pokemon.id, 3) + '-' + this.capitalize(str) + '.png';
          // console.log(this.pokemonImageUrl);
          // // }
        }
        this.initializePokemonFields();
        this.imageLoading = false;
      }
    );
  }

  selectForm(url, name) {
    this.pokemonService.getPokemonByURL(url).subscribe(
      result => {
        this.pokemon.name = result['name'];
        // this.pokemon.id = result['id'];
        this.pokemon.sprites = result['sprites'];
        this.pokemon.types = result['types'].reverse();
        this.pokemon.abilities = result['abilities'].reverse();
        this.pokemon.height = result['height'];
        this.pokemon.weight = result['weight'];
        this.pokemon.baseExperience = result['base_experience'];
        this.pokemon.forms = result['forms'];
        this.pokemon.heldItems = result['held_items'];
        this.pokemon.gameIndices = result['game_indices'];
        this.pokemon.is_default = result['is_default'];
        this.pokemon.location = result['location'];
        this.pokemon.moves = result['moves'];
        this.pokemon.order = result['order'];
        this.pokemon.stats = result['stats'];
        this.pokemon.species = result['species'];
        if (!this.pokemon.is_default) {
          let re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
          let regExp = new RegExp(re, 'g');
          let str = name.replace(regExp, '$2');
          this.pokemonImageUrl = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' +
            this.pad(this.pokemon.id, 3) + '-' + this.capitalize(str) + '.png';
          console.log(this.pokemonImageUrl);
        }
        // }
        // result;
        // result['color']['name'];
        // result['genera'];
        // result['varieties'];
        // this.pokemon.speciesDetails = results[1];
        // this.pokemon.genera = results[1]['genera'];
        // this.pokemon.color = results[1]['color']['name'];
        // // Why do i need this ???????????????????
        // this.pokemonService.activePokemon.next(this.pokemon);
        this.initializePokemonFields();
      }
    );
  }

  capitalize(str) {
    str = str.split('-');

    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join('-');
  }


  ngOnDestroy() {
    this.pokemonService.activePokemon.next(null);
    this.pokemonService.previousPokemonID.next(this.pokemonId);
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal-open');
    const elements = document.getElementsByClassName('modal-backdrop');
    while (elements.length > 0) {
      elements[0].remove();
    }
    console.log('Destroyed');
    // this.pokemonService.searchItemSubject.next('');
  }
}
