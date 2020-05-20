import {Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from './pokemon.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: Pokemon[] = new Array<Pokemon>(50);
  pokemonsListChanged = new Subject<Pokemon[]>();
  noOfPokemonsLoaded = 0;
  newPokemonsLoaded = new Subject<number>();
  responseCounter = 0;
  totalCounter = 0;
  activePokemon = new Subject<Pokemon>();
  previousPokemonID = new Subject<number>();
  isMobile;
  @Output() searchItemSubject: Subject<string> = new Subject<string>();


  constructor(private http: HttpClient) {
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon/?limit=50');
    this.isMobile = this.isMobileBrowser(); //  Mobile Browser Check
    console.log('Mobile Browser : ' + this.isMobile);
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


  getPokemonList(url: string) {
    this.http.get<{ count: string, next: string, previous: string, results: { name: string, url: string }[] }>
    (url).subscribe(
      (response) => {
        const pokemons: { name: string, url: string }[] = response.results;
        for (const pokemon of pokemons) {
          if (pokemon.url === 'https://pokeapi.co/api/v2/pokemon/807/') {
            this.getPokemon(pokemon.url, null);
            return;
          } else {
            this.getPokemon(pokemon.url, response.next);
          }
        }
      }
    );
  }


  getPokemon(url: string, morePokemons) {
    this.http.get<{ name: string, id: number }>
    (url).subscribe(
      (response) => {
        let name = response.name;
        switch (response.id) {
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
        this.pokemons[+response.id - 1] = new Pokemon(
          name,
          response.id,
          response['sprites'],
          response['types'].reverse(),
          response['abilities'].reverse(),
          response['height'],
          response['weight'],
          response['base_experience'],
          response['forms'],
          response['held_items'],
          response['game_indices'],
          response['is_default'],
          response['location'],
          response['moves'],
          response['order'],
          response['stats'],
          response['species'],
          undefined,
          undefined,
          undefined,
          undefined
        );
        this.responseCounter++;
        this.totalCounter++;
        // Only For testing Purpose
        // if (this.totalCounter === 50) {
        //   this.noOfPokemonsLoaded = this.noOfPokemonsLoaded + 50;
        //   this.newPokemonsLoaded.next(this.noOfPokemonsLoaded);
        //   this.pokemonsListChanged.next(this.pokemons);
        //   return;
        // }
        // Testing End
        // 151 Only
        // if (this.totalCounter === 150) {
        //   this.noOfPokemonsLoaded = this.noOfPokemonsLoaded + 1;
        //   this.newPokemonsLoaded.next(this.noOfPokemonsLoaded);
        //   this.pokemonsListChanged.next(this.pokemons);
        //   return;
        // }
        // 151 Only
        if (this.totalCounter === 807) {
          this.noOfPokemonsLoaded = this.noOfPokemonsLoaded + 7;
          this.newPokemonsLoaded.next(this.noOfPokemonsLoaded);
          this.pokemonsListChanged.next(this.pokemons);
          return;
        }
        if (this.responseCounter === 50) {
          this.noOfPokemonsLoaded = this.noOfPokemonsLoaded + 50;
          this.newPokemonsLoaded.next(this.noOfPokemonsLoaded);
          this.pokemonsListChanged.next(this.pokemons);
          this.responseCounter = 0;
          if (morePokemons != null) {
            this.getPokemonList(morePokemons);
          }
        }
      }
    );

  }


  getPokemonById(Id) {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + Id + '/';
    return this.http.get(url);
  }

  getPokemonByURL(url) {
    return this.http.get(url);
  }

  getPokemonSpeciesById(Id) {
    const url = 'https://pokeapi.co/api/v2/pokemon-species/' + Id + '/';
    return this.http.get(url);
  }

  getAbility(url: string) {
    return this.http.get(url);
  }
}
