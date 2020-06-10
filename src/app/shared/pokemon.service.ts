import {Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from './pokemon.model';
import {forkJoin, Subject} from 'rxjs';
import {Observable, Observer, fromEvent, merge} from 'rxjs';
import {map} from 'rxjs/operators';
import {NotificationsService} from 'angular2-notifications';
import {Move} from './moves.model';
import {Machine} from './machine.model';
import {PokemonMove} from './pokemon-move.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: Pokemon[] = [];
  pokemonsListChanged = new Subject<Pokemon[]>();
  noOfPokemonsLoaded = 0;
  newPokemonsLoaded = new Subject<number>();
  activePokemon = new Subject<Pokemon>();
  previousPokemonID = new Subject<number>();
  isMobile;
  movesDetails;
  machineDetails;
  evolutionChains;
  pokemonSpeciesJSON;
  pokemonJSON;
  moveJSON;
  abilityJSON;
  pokemonMovesCSV;
  firstTime = false;
  megaEvolutionMainSwitch;
  @Output() searchItemSubject: Subject<string> = new Subject<string>();
  @Output() EverythingLoaded: Subject<boolean> = new Subject<boolean>();
  @Output() megaSwitchSubscription: Subject<boolean> = new Subject<boolean>();
  @Output() OpenMenu: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, public _notifications: NotificationsService) {
    this.megaSwitchSubscription.subscribe((res) => {
      this.megaEvolutionMainSwitch = res;
    });
    if (localStorage.getItem('visitedOnce') === null) {
      this.firstTime = true;
      localStorage.setItem('visitedOnce', 'true');
    }
    this.requestALL();
    // Check Online Connectivity
    this.createOnline$().subscribe(isOnline => {
      const title = isOnline ? 'Online' : 'Offline';
      const content = isOnline ? 'Images will load now ...' : 'New Images won\'t be loaded ...';
      if (isOnline) {
        const toast = _notifications.success(title, content, {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      } else {
        const toast = _notifications.error(title, content, {
          timeOut: 10000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    });
    this.isMobile = this.isMobileBrowser(); //  Mobile Browser Check
  }

  isMobileBrowser() {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor);
    return check;
  }

  getPokemonSpeciesFromJSON() {
    this.http.get('assets/data/pokemon-species.json').subscribe(
      (response) => {
        this.pokemonSpeciesJSON = response['pokemon-species'];
      }
    );
  }

  getPokemonMovesFromCSV() {
    this.pokemonMovesCSV = {};
    this.http.get('assets/data/pokemon-moves.csv', {responseType: 'text'})
      .subscribe(
        data => {
          const allTextLines = data.split(/\r|\n|\r/);
          const headers = allTextLines[0].split(',');
          for (let i = 1; i < allTextLines.length; i++) {
            // split content based on comma
            const rowData = allTextLines[i].split(',');
            const pokemon_id = rowData[0];
            if (this.pokemonMovesCSV[pokemon_id] === undefined) {
              this.pokemonMovesCSV[pokemon_id] = [];
            }
            const move = new PokemonMove();
            // const move = [];
            for (let j = 0; j < headers.length - 1; j++) {
              move[headers[j]] = rowData[j];
            }
            this.pokemonMovesCSV[pokemon_id].push(move);
          }
        },
        error => {
          console.log(error);
        });
  }

  getPokemonFromJSON() {
    this.http.get('assets/data/pokemon.json').subscribe(
      (response) => {
        this.getMoveDetailsFromCSV();
        this.pokemonJSON = response['pokemon'];
        for (let i = 0; i < 807; i++) {
          const pokemonData = this.pokemonJSON[(i + 1).toString()];
          const pokemonSpeciesData = this.pokemonSpeciesJSON[i];
          let name = pokemonData['N'];
          switch (pokemonData['id']) { // Renaming Manually
            case 29:
              name = 'Nidoran♀';
              break;
            case 32:
              name = 'Nidoran♂';
              break;
            case 83:
              name = 'Farfetch\'d';
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
            case 669:
              name = 'Flabébé';
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
          this.pokemons.push(new Pokemon(
            // from pokemon
            name,
            pokemonData['id'],
            // null,
            pokemonData['T'],
            pokemonData['Ab'],
            pokemonData['H'],
            pokemonData['W'],
            pokemonData['BE'],
            // null,
            pokemonData['HI'],
            // null,
            pokemonData['isD'],
            // null,
            this.pokemonMovesCSV[(i + 1).toString()],
            // null,
            pokemonData['St'],
            pokemonData['Sp'],
            // from pokemon-species
            pokemonSpeciesData,
            pokemonSpeciesData['Co'],
            pokemonSpeciesData['G'],
            pokemonSpeciesData['varieties'],
            pokemonSpeciesData['EvC']
          ));
        }
        this.newPokemonsLoaded.next(807);
        this.pokemonsListChanged.next(this.pokemons);
      }
    );
  }

  getMoveDetailsFromCSV() {
    this.movesDetails = [];
    this.http.get('assets/data/moves.csv', {responseType: 'text'})
      .subscribe(
        data => {
          this.getMachinesFromCSV();
          const allTextLines = data.split(/\r|\n|\r/);
          const headers = allTextLines[0].split(',');
          for (let i = 1; i < allTextLines.length; i++) {
            const move = new Move();
            // split content based on comma
            const rowData = allTextLines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
              if (rowData[j] === '') {
                move[headers[j]] = '-';
              } else {
                move[headers[j]] = rowData[j];
              }
            }
            this.movesDetails.push(move);
          }
        },
        error => {
          console.log(error);
        });
  }

  getMachinesFromCSV() {
    this.machineDetails = [];
    this.http.get('assets/data/machines.csv', {responseType: 'text'})
      .subscribe(
        data => {
          this.getMovesFlavorFromJSON();
          const allTextLines = data.split(/\r|\n|\r/);
          const headers = allTextLines[0].split(',');
          for (let i = 1; i < allTextLines.length; i++) {
            const machine = new Machine();
            // split content based on comma
            const rowData = allTextLines[i].split(',');
            for (let j = 0; j < headers.length; j++) {
              machine[headers[j]] = rowData[j];
            }
            this.machineDetails.push(machine);
          }
        },
        error => {
          console.log(error);
        });
  }

  getMovesFlavorFromJSON() {
    this.http.get('assets/data/move.json').subscribe(
      (response) => {
        this.getEvoChainFromJSON();
        this.moveJSON = response['moves'];
      }
    );
  }

  getEvoChainFromJSON() {
    this.http.get('assets/data/evolution-chain.json').subscribe(
      (response) => {
        this.getAbilityFromJSON();
        this.evolutionChains = response['evolution-chains'];
      }
    );
  }

  getAbilityFromJSON() {
    this.http.get('assets/data/ability.json').subscribe(
      (response) => {
        this.abilityJSON = response['abilities'];
        this.EverythingLoaded.next(true);
      }
    );
  }

  requestALL() {
    const requests = [];
    requests.push(this.http.get('assets/data/pokemon-species.json'));
    requests.push(this.http.get('assets/data/pokemon-moves.csv', {responseType: 'text'}));
    // requests.push(this.http.get('assets/data/pokemon.json'));
    // requests.push(this.http.get('assets/data/moves.csv', {responseType: 'text'}));
    // requests.push(this.http.get('assets/data/machines.csv', {responseType: 'text'}));
    // requests.push(this.http.get('assets/data/move.json'));
    // requests.push(this.http.get('assets/data/evolution-chain.json'));
    // requests.push(this.http.get('assets/data/ability.json'));
    this.pokemonMovesCSV = {};
    forkJoin(requests).subscribe(([species, movesCSV]: [any, string]) => {
      this.getPokemonFromJSON();
      this.pokemonSpeciesJSON = species['pokemon-species'];
      const data = movesCSV;
      const allTextLines = data.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(',');
      for (let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        const rowData = allTextLines[i].split(',');
        const pokemon_id = rowData[0];
        if (this.pokemonMovesCSV[pokemon_id] === undefined) {
          this.pokemonMovesCSV[pokemon_id] = [];
        }
        const move = new PokemonMove();
        // const move = [];
        for (let j = 0; j < headers.length - 1; j++) {
          move[headers[j]] = rowData[j];
        }
        this.pokemonMovesCSV[pokemon_id].push(move);
      }
    });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
