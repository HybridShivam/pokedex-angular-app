import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PokemonService} from '../shared/pokemon.service';
import {Pokemon} from '../shared/pokemon.model';
import {forkJoin, Subject} from 'rxjs';
import {relativeToRootDirs} from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemonId;
  pokemon;

  pokemonImageUrl;
  pokemonDefaultColor;
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
  formattedFormNames = [];
  selectedFormNo = 0;
  varietiesReversed = false; // For Magearna
  formColors = {
    'charizard-mega-x': 'black',
    'latias-mega': 'purple',
    'latios-mega': 'purple',
    'castform-sunny': 'red',
    'castform-rainy': 'blue',
    'castform-snowy': 'purple',
    'burmy-sandy': 'brown',
    'burmy-trash': 'pink',
    'wormadam-sandy': 'brown',
    'wormadam-trash': 'pink',
    'darmanitan-zen': 'gray',
    'kyurem-black': 'black',
    'kyurem-white': 'white',
    'oricorio-pom-pom': 'yellow',
    'oricorio-pau': 'pink',
    'oricorio-sensu': 'purple',
    'lycanroc-midnight': 'red',
    'lycanroc-dusk': 'brown',
    'minior-orange-meteor': 'red', // Because its second in list actually its minior-red
    'necrozma-ultra': 'yellow',
    'magearna-original': 'red',
    'raticate-alola': 'black',
    'raichu-alola': 'brown',
    'sandshrew-alola': 'blue',
    'sandslash-alola': 'blue',
    'vulpix-alola': 'white',
    'ninetales-alola': 'white',
    'meowth-alola': 'gray',
    'persian-alola': 'gray',
    'grimer-alola': 'green',
    'muk-alola': 'green',
    'marowak-alola': 'black'
  };


  visible = true;
  imageVisible = true;
  // Mega Evolution Animation
  megaEvolving = false;
  megaEvolveAnimationEnabled = true;
  SphereVisible = false;
  SigilVisible = false;
  sigilEnd = false;
  BubblesVisible = false;
  imageLoadedForMegaEvolution = false;
  imageLoadedForMegaEvolutionSubject = new Subject<boolean>();

  evoChainsFetched = false;
  evolutionChain = [];
  evolutionDesc = [];
  exceptionalChainType;
  evolutionChainExceptions_112 = [
    'oddish',
    'poliwag',
    'ralts'];
  evolutionChainExceptions_12 = [
    'slowpoke',
    'nincada',
    'snorunt',
    'clamperl',
    'burmy',
    'cosmog'];
  evolutionChainExceptions_122 = [
    'wurmple',
  ];
  evolutionChainExceptions_13 = [
    'tyrogue'
  ];
  evolutionChainExceptions_18 = [
    'eevee'];


  constructor(private activatedRoute: ActivatedRoute,
              private pokemonService: PokemonService) {
    this.megaEvolveAnimationEnabled = !this.pokemonService.isMobile;
  }

  ngOnInit(): void {
    // Initialization Logic after Pokemon Fetching in Both If and Else Conditions
    this.activatedRoute.params.subscribe(
      (params) => {
        this.pokemonId = params['id'];
        this.pokemonForms = [];
        this.formattedFormNames = [];
        // From List
        if (this.pokemonService.pokemons[this.pokemonId]) {
          const pokemonFromList = this.pokemonService.pokemons[this.pokemonId - 1];
          this.pokemon = new Pokemon(
            pokemonFromList.name,
            pokemonFromList.id,
            pokemonFromList.sprite,
            pokemonFromList.types,
            pokemonFromList.abilities,
            pokemonFromList.height,
            pokemonFromList.weight,
            pokemonFromList.baseExperience,
            pokemonFromList.forms,
            pokemonFromList.heldItems,
            pokemonFromList.gameIndices,
            pokemonFromList.is_default,
            pokemonFromList.location,
            pokemonFromList.moves,
            pokemonFromList.order,
            pokemonFromList.stats,
            pokemonFromList.species,
            pokemonFromList.speciesDetails,
            pokemonFromList.color,
            pokemonFromList.genera,
            pokemonFromList.varieties,
            pokemonFromList.evolutionChainURL
          );
          this.pokemonDefaultColor = this.pokemon.color;
          this.pokemonService.activePokemon.next(this.pokemon);
          this.requestForms();
          this.formatFormNames();
          // Store as first form in array
          this.pokemonForms[0] = new Pokemon(
            this.pokemon.name,
            this.pokemon.id,
            this.pokemon.sprite,
            this.pokemon.types,
            this.pokemon.abilities,
            this.pokemon.height,
            this.pokemon.weight,
            this.pokemon.baseExperience,
            this.pokemon.forms,
            this.pokemon.heldItems,
            this.pokemon.gameIndices,
            this.pokemon.is_default,
            this.pokemon.location,
            this.pokemon.moves,
            this.pokemon.order,
            this.pokemon.stats,
            this.pokemon.species,
            this.pokemon.speciesDetails,
            this.pokemon.color,
            this.pokemon.genera,
            this.pokemon.varieties,
            this.pokemon.evolutionChainURL
          );
          this.initializePokemonFields();
          // Directly From Link
        } else {
          forkJoin([this.pokemonService.getPokemonById(this.pokemonId),
            this.pokemonService.getPokemonSpeciesById(this.pokemonId)]).subscribe(
            results => {
              let name = results[0]['name'];
              switch (results[0]['id']) { // Renaming Manually
                case 29:
                  name = 'Nidoran';
                  break;
                case 32:
                  name = 'Nidoran';
                  break;
                case 122:
                  name = 'Mr. Mime';
                  break;
                case 386:
                  name = 'Deoxys';
                  break;
                case 413:
                  name = 'Wormadam';
                  break;
                case 439:
                  name = 'Mime Jr.';
                  break;
                case 487:
                  name = 'Giratina';
                  break;
                case 492:
                  name = 'Shaymin';
                  break;
                case 550:
                  name = 'Basculin';
                  break;
                case 555:
                  name = 'Darmanitan';
                  break;
                case 641:
                  name = 'Tornadus';
                  break;
                case 642:
                  name = 'Thundurus';
                  break;
                case 645:
                  name = 'Landorus';
                  break;
                case 647:
                  name = 'Keldeo';
                  break;
                case 648:
                  name = 'Meloetta';
                  break;
                case 678:
                  name = 'Meowstic';
                  break;
                case 681:
                  name = 'Aegislash';
                  break;
                case 710:
                  name = 'Pumpkaboo';
                  break;
                case 711:
                  name = 'Gourgeist';
                  break;
                case 741:
                  name = 'Oricorio';
                  break;
                case 745:
                  name = 'Lycanroc';
                  break;
                case 746:
                  name = 'Wishiwashi';
                  break;
                case 772:
                  name = 'Type: Null';
                  break;
                case 774:
                  name = 'Minior';
                  break;
                case 778:
                  name = 'Mimikyu';
                  break;
                case 785:
                  name = 'Tapu Koko';
                  break;
                case 786:
                  name = 'Tapu Lele';
                  break;
                case 787:
                  name = 'Tapu Bulu';
                  break;
                case 788:
                  name = 'Tapu Fini';
                  break;
              }
              this.pokemon = new Pokemon(
                name,
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
                results[1]['varieties'],
                results[1]['evolution_chain']['url']
              );
              this.pokemon.speciesDetails = results[1];
              this.pokemon.genera = results[1]['genera'];
              this.pokemon.color = results[1]['color']['name'];
              this.pokemonDefaultColor = this.pokemon.color;
              // Why do i need this ???????????????????
              this.pokemonService.activePokemon.next(this.pokemon);
              // Store as first form in array
              this.pokemonForms[0] = new Pokemon(
                this.pokemon.name,
                this.pokemon.id,
                this.pokemon.sprite,
                this.pokemon.types,
                this.pokemon.abilities,
                this.pokemon.height,
                this.pokemon.weight,
                this.pokemon.baseExperience,
                this.pokemon.forms,
                this.pokemon.heldItems,
                this.pokemon.gameIndices,
                this.pokemon.is_default,
                this.pokemon.location,
                this.pokemon.moves,
                this.pokemon.order,
                this.pokemon.stats,
                this.pokemon.species,
                this.pokemon.speciesDetails,
                this.pokemon.color,
                this.pokemon.genera,
                this.pokemon.varieties,
                this.pokemon.evolutionChainURL
              );
              this.initializePokemonFields();
              this.requestForms();
              this.formatFormNames();
            }
          );
        }
      }
    );
  }

  initializePokemonFields() {
    if (this.pokemon.varieties !== undefined &&
      this.formColors[this.pokemon.varieties[this.selectedFormNo]['pokemon']['name']] !== undefined) {
      this.pokemon.color = this.formColors[this.pokemon.varieties[this.selectedFormNo]['pokemon']['name']];
      this.pokemonService.activePokemon.next(this.pokemon);
    } else {
      this.pokemon.color = this.pokemonDefaultColor;
      this.pokemonService.activePokemon.next(this.pokemon);
    }
    this.requestAbilityDetails();
    if (!this.evoChainsFetched) {
      this.getEvolutionChain();
      this.evoChainsFetched = true;
    }
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
    if (!this.megaEvolving) {
      this.imageVisible = true;
    } else {
      this.imageLoadedForMegaEvolutionSubject.next(true);
      this.imageLoadedForMegaEvolution = true;
    }
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

  formatFormNames() {
    for (let i = 0; i < this.pokemon.varieties.length; i++) {
      var formattedName;
      var name = this.pokemon.varieties[i]['pokemon']['name'];
      if (this.pokemon.id !== 774) { // excluding Minior
        if (name.indexOf('-totem') !== -1 || name.indexOf('-battle-bond') !== -1) {
          continue;
        } else if (name.indexOf('-mega') !== -1 || name.indexOf('-primal') !== -1 || name === 'greninja-ash'
          || this.pokemon.id === 800 // Necrozma
        ) {
          if (name === 'necrozma-dusk') {
            formattedName = 'Dusk Mane Necrozma';
          } else if (name === 'necrozma-dawn') {
            formattedName = 'Dawn Wings Necrozma';
          } else {
            const re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
            const regExp = new RegExp(re, 'g');
            formattedName = name.replace(regExp, '$2 $1');
            formattedName = formattedName.replace(/-/g, ' ');
          }
        } else if (name.indexOf('-alola') !== -1 && this.pokemon.id !== 25) { // Excluding Alola-Cap Pikachu
          formattedName = 'Alolan ' + this.pokemon.species['name'];
        } else {
          const re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
          const regExp = new RegExp(re, 'g');
          formattedName = name.replace(regExp, '$2');
          if (this.pokemon.id !== 250) { // excluding Ho-Oh
            formattedName = formattedName.replace(/-/g, ' ');
          }
        }
      } else { // If minior
        if (name === 'minior-red') {
          formattedName = 'core';
        } else if (name === 'minior-red-meteor') {
          formattedName = 'meteor';
        } else {
          continue;
        }
      }
      this.formattedFormNames.push(formattedName);
    }
  }

  requestForms() {
    if (this.pokemon.id === 801 && !this.varietiesReversed) { // For magearna Reverse the varieties
      this.pokemon.varieties.reverse();
      this.varietiesReversed = true;
    }
    const formRequests = [];
    if (this.pokemon.id !== 774) { // Skipping Minior
      for (const variety of this.pokemon.varieties.slice(1)) {
        if (variety['pokemon']['name'].indexOf('-totem') !== -1 || variety['pokemon']['name'] === 'greninja-battle-bond') {
          continue;
          // Skipping these forms
        }
        formRequests.push(this.pokemonService.getPokemonByURL(variety['pokemon']['url']));
      }
    } else {
      for (const variety of this.pokemon.varieties.slice(1)) {
        if (variety['pokemon']['name'] === 'minior-red' || variety['pokemon']['name'] === 'minior-red-meteor') {
          formRequests.push(this.pokemonService.getPokemonByURL(variety['pokemon']['url']));
        }
      }
    }
    forkJoin(formRequests).subscribe(
      results => {
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
            this.pokemon.varieties,
            this.pokemon.evolutionChainURL
          );
          console.log('forms' + results[i]['name']);
        }
        // this.initializePokemonFields();
      }
    );
  }

  selectForm(i) {
    if (this.selectedFormNo === i || this.imageLoading) {
      return;
    }
    this.visible = false;
    if (!(this.pokemonForms[i]['name'].indexOf('-mega') !== -1 && this.megaEvolveAnimationEnabled && !this.imageLoading)) {
      this.imageVisible = false;
    } else {
      this.megaEvolve();
    }
    setTimeout(() => {
      this.selectedFormNo = i;
      if (this.pokemonForms[i]['name'] === this.pokemon.species['name']) {
        this.pokemon.name = this.pokemon.species['name'];
      } else if ((this.pokemon.id !== 25) // excluding Pikachu
        && ((this.pokemonForms[i]['name'].indexOf('-mega') !== -1)
          || (this.pokemonForms[i]['name'].indexOf('-primal') !== -1)
          || (this.pokemonForms[i]['name'].indexOf('-alola') !== -1)
          || (this.pokemonForms[i]['name'] === 'greninja-ash')
          || (this.pokemon.id === 800)) // Necrozma
      ) {
        this.pokemon.name = this.formattedFormNames[i];
      } else {
        this.pokemon.name = this.pokemon.species['name'] + ' [' + this.formattedFormNames[i] + ']';
      }

      // this.pokemon.id = this.pokemonForms[i]['id'];
      this.pokemon.sprites = this.pokemonForms[i]['sprites'];
      this.pokemon.types = this.pokemonForms[i]['types'];
      this.pokemon.abilities = this.pokemonForms[i]['abilities'];
      this.pokemon.height = this.pokemonForms[i]['height'];
      this.pokemon.weight = this.pokemonForms[i]['weight'];
      this.pokemon.baseExperience = this.pokemonForms[i]['base_experience'];
      this.pokemon.forms = this.pokemonForms[i]['forms'];
      this.pokemon.heldItems = this.pokemonForms[i]['held_items'];
      this.pokemon.gameIndices = this.pokemonForms[i]['game_indices'];
      this.pokemon.is_default = this.pokemonForms[i]['is_default'];
      this.pokemon.location = this.pokemonForms[i]['location'];
      this.pokemon.moves = this.pokemonForms[i]['moves'];
      this.pokemon.order = this.pokemonForms[i]['order'];
      this.pokemon.stats = this.pokemonForms[i]['stats'];
      this.pokemon.species = this.pokemonForms[i]['species'];
      // For Non Default Forms Only
      if (!this.pokemon.is_default) {
        const re = '(' + this.pokemon.species['name'] + ')[-]([a-z]*)';
        const regExp = new RegExp(re, 'g');
        const str = this.pokemonForms[i]['name'].replace(regExp, '$2');
        this.pokemonImageUrl = 'https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/' +
          this.pad(this.pokemon.id, 3) + '-' + this.capitalizeSplitJoin(str, '-', '-') + '.png';
        // console.log(this.pokemonImageUrl);
      }
      // For Default Forms and Initializing Fields
      this.initializePokemonFields();
      this.visible = true;
      // if (this.pokemonForms[i]['name'].indexOf('-mega') !== -1 && this.megaEvolveAnimationEnabled) {
      //   // console.log('Mega Evolve Animation !!!');
      //   this.megaEvolve();
      // }
    }, 400);
  }

  megaEvolve() {
    this.megaEvolving = true;
    this.imageLoadedForMegaEvolution = false;
    this.imageVisible = false;
    setTimeout(() => {
      this.SigilVisible = true;
      this.SphereVisible = true;
      this.BubblesVisible = true;
    }, 250);
    setTimeout(() => {
      if (this.imageLoadedForMegaEvolution) {
        this.SphereVisible = false;
        this.BubblesVisible = false;
        this.imageVisible = true;
        this.imageLoadedForMegaEvolution = false;
        this.sigilEnd = true;
        setTimeout(() => {
          this.SigilVisible = false;
        }, 2100);
        setTimeout(() => {
          this.megaEvolving = false;
        }, 2100);
      } else {
        const imageLoadedForMegaEvolutionSubscription = this.imageLoadedForMegaEvolutionSubject.subscribe((response) => {
          if (response) {
            this.SphereVisible = false;
            this.BubblesVisible = false;
            this.imageVisible = true;
            this.imageLoadedForMegaEvolution = false;
            this.sigilEnd = true;
            setTimeout(() => {
              this.SigilVisible = false;
            }, 2100);
            setTimeout(() => {
              this.megaEvolving = false;
            }, 2100);
            imageLoadedForMegaEvolutionSubscription.unsubscribe();
          }
        });
      }
    }, 5000);
    this.megaEvolveAnimationEnabled = false;
  }

  getEvolutionChain() {
    this.evolutionDesc = [];
    this.exceptionalChainType = '';
    console.log(this.pokemon.evolutionChainURL);
    this.pokemonService.getEvoChainByURL(this.pokemon.evolutionChainURL).subscribe((response) => {
      this.evolutionChain = [];
      let chain = response['chain'];
      if (this.evolutionChainExceptions_112.indexOf(chain['species']['name']) > -1) {
        this.exceptionalChainType = '112';
      } else if (this.evolutionChainExceptions_12.indexOf(chain['species']['name']) > -1) {
        console.log('excep 12');
        this.exceptionalChainType = '12';
      } else if (this.evolutionChainExceptions_13.indexOf(chain['species']['name']) > -1) {
        console.log('excep 13');
        this.exceptionalChainType = '13';
      } else if (this.evolutionChainExceptions_18.indexOf(chain['species']['name']) > -1) {
        console.log('excep 18');
        this.exceptionalChainType = '18';
      }
      switch (this.exceptionalChainType) {
        case '': // Normal Case
          do {
            this.evolutionChain.push([
              chain['species']['name'], // 0
              this.getIdfromURL(chain['species']['url']), // 1
              chain['is_baby'], // 2
              chain['evolution_details'] // 3
            ]);
            chain = chain['evolves_to'][0];
          } while (chain !== undefined);
          break;
        case '112':
          var nextChain = chain;
          this.evolutionChain.push([
            nextChain['species']['name'], // 0
            this.getIdfromURL(nextChain['species']['url']), // 1
            nextChain['is_baby'], // 2
            nextChain['evolution_details'] // 3
          ]);
          nextChain = chain['evolves_to'][0];
          this.evolutionChain.push([
            nextChain['species']['name'], // 0
            this.getIdfromURL(nextChain['species']['url']), // 1
            nextChain['is_baby'], // 2
            nextChain['evolution_details'] // 3
          ]);
          this.evolutionChain[2] = [];
          nextChain = chain['evolves_to'][0]['evolves_to'][0];
          this.evolutionChain[2].push([
            nextChain['species']['name'], // 0
            this.getIdfromURL(nextChain['species']['url']), // 1
            nextChain['is_baby'], // 2
            nextChain['evolution_details'] // 3
          ]);
          nextChain = chain['evolves_to'][0]['evolves_to'][1];
          this.evolutionChain[2].push([
            nextChain['species']['name'], // 0
            this.getIdfromURL(nextChain['species']['url']), // 1
            nextChain['is_baby'], // 2
            nextChain['evolution_details'] // 3
          ]);
          break;
        case '12':
        case '13':
        case '18':
          nextChain = chain;
          this.evolutionChain.push([
            nextChain['species']['name'], // 0
            this.getIdfromURL(nextChain['species']['url']), // 1
            nextChain['is_baby'], // 2
            nextChain['evolution_details'] // 3
          ]);
          this.evolutionChain[1] = [];
          let i = 0;
          while (chain['evolves_to'][i] !== undefined) {
            nextChain = chain['evolves_to'][i];
            this.evolutionChain[1].push([
              nextChain['species']['name'], // 0
              this.getIdfromURL(nextChain['species']['url']), // 1
              nextChain['is_baby'], // 2
              nextChain['evolution_details'] // 3
            ]);
            i++;
          }
          break;
      }
      console.log(this.evolutionChain);
      this.generateEvolutionMethods();
    });
  }

  generateEvolutionMethods() {
    switch (this.exceptionalChainType) {
      case '': // Normal Case
        for (let link of this.evolutionChain) {
          let stage = link[3][0];
          if (stage !== undefined) {
            this.evolutionDesc.push(this.generateEvolutionMethodsLogic(stage));
          }
        }
        break;
      case '112':
        let i = 0;
        for (let link of this.evolutionChain) {
          if (i === this.evolutionChain.length - 1) {
            // Last Stage
            this.evolutionDesc.push([]);
            for (let sideStage of link) {
              sideStage = sideStage[3][0];
              this.evolutionDesc[i - 1].push(this.generateEvolutionMethodsLogic(sideStage));
            }
          } else {
            // Initial Stages
            let stage = link[3][0];
            if (stage !== undefined) {
              this.evolutionDesc.push(this.generateEvolutionMethodsLogic(stage));
            }
          }
          i++;
        }
        break;
    }
    console.log(this.evolutionDesc);
  }

  generateEvolutionMethodsLogic(stage) {
    let desc = '';
    switch (stage['trigger']['name']) {
      case 'level-up':
        if (stage['min_level'] !== null) {
          desc = 'Level ' + stage['min_level'] + '+';
        } else {
          desc = 'Level up';
        }
        if (stage['gender'] !== null) {
          let gender;
          if (stage['gender'] === 0) {
            gender = '(Male)';
          } else {
            gender = '(Female)';
          }
          desc = desc + ' ' + gender;
        }
        if (stage['held_item'] !== null) {
          const held_item = this.capitalizeSplitJoin(stage['held_item']['name'], '-', ' ');
          desc = desc + ' holding ' + held_item;
          // console.log(held_item);
        }
        if (stage['known_move'] !== null) {
          const known_move = this.capitalizeSplitJoin(stage['known_move']['name'], '-', ' ');
          desc = desc + ' knowing ' + known_move;
          // console.log(known_move);
        }
        if (stage['known_move_type'] !== null) {
          const known_move_type = this.capitalizeSplitJoin(stage['known_move_type']['name'], '-', ' ');
          desc = desc + ' knowing a ' + known_move_type + ' move';
          // console.log(known_move);
        }
        if (stage['min_affection'] !== null) {
          const min_affection = stage['min_affection'];
          desc = desc + ' with ' + min_affection + '+ Affection';
        }
        if (stage['min_beauty'] !== null) {
          const min_beauty = stage['min_beauty'];
          desc = desc + ' with ' + min_beauty + '+ Beauty';
        }
        if (stage['min_happiness'] !== null) {
          const min_happiness = stage['min_happiness'];
          desc = desc + ' with ' + min_happiness + '+ Happiness';
        }
        if (stage['relative_physical_stats'] !== null) {
          let sign;
          if (stage['relative_physical_stats'] === 1) {
            sign = '>';
          } else if (stage['relative_physical_stats'] === -1) {
            sign = '<';
          } else {
            sign = '=';
          }
          desc = desc + ' with Attack ' + sign + ' Defence';
        }
        if (stage['party_species'] !== null) {
          const party_species = this.capitalizeSplitJoin(stage['party_species']['name'], '-', ' ');
          desc = desc + ' with ' + party_species + ' in party';
        }
        if (stage['party_type'] !== null) {
          const party_type = this.capitalizeSplitJoin(stage['party_type']['name'], '-', ' ');
          desc = desc + ' with a ' + party_type + ' type in party';
        }
        if (stage['location'] !== null) {
          const location = this.capitalizeSplitJoin(stage['location']['name'], '-', ' ');
          desc = desc + ' at ' + location;
        }
        if (stage['needs_overworld_rain'] !== false) {
          desc = desc + ' during Rain';
        }
        if (stage['time_of_day'] !== '') {
          const time_of_day = this.capitalizeSplitJoin(stage['time_of_day'], '-', ' ');
          desc = desc + ' at ' + time_of_day + 'time';
        }
        if (stage['turn_upside_down'] !== false) {
          desc = desc + ' holding 3DS upside-down';
        }
        // item:null;
        // trade_species:null;
        break;
      case 'trade':
        desc = 'Trade';
        if (stage['held_item'] !== null) {
          const held_item = this.capitalizeSplitJoin(stage['held_item']['name'], '-', ' ');
          desc = desc + ' holding ' + held_item;
        }
        if (stage['trade_species'] !== null) {
          const trade_species = this.capitalizeSplitJoin(stage['trade_species']['name'], '-', ' ');
          desc = desc + ' with ' + trade_species;
        }
        break;
      case 'use-item':
        desc = 'Use';
        if (stage['item'] !== null) {
          const item = this.capitalizeSplitJoin(stage['item']['name'], '-', ' ');
          desc = desc + ' ' + item;
        }
        if (stage['gender'] !== null) {
          let gender;
          if (stage['gender'] === 2) {
            gender = '(Male)';
          } else {
            gender = '(Female)';
          }
          desc = desc + ' ' + gender;
        }
        break;
      case 'shed':
        desc = 'Level 20, with empty PokéBall and an open slot in party';
        break;
    }
    console.log(desc);
    return desc;
  }

  selectEvolution() {
    this.selectedFormNo = 0;
  }

  getIdfromURL(url): number {
    let myRegex = /https:\/\/pokeapi.co\/api\/v2\/pokemon-species\/(.+)\//g;
    let match = myRegex.exec(url);
    return +match[1];
  }

  capitalizeSplitJoin(str, split: string, join: string) {
    str = str.split(split);
    for (let i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(join);
  }

  // generateRandomInteger(min, max) {
  //   return Math.floor(min + Math.random() * (max + 1 - min));
  // }

  ngOnDestroy() {
    this.pokemonService.activePokemon.next(null);
    this.pokemonService.previousPokemonID.next(this.pokemonId);
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('modal-open');
    const elements = document.getElementsByClassName('modal-backdrop');
    while (elements.length > 0) {
      elements[0].remove();
    }
    // this.pokemonService.searchItemSubject.next('');
  }
}
