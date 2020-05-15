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
  @Output() searchItemSubject: Subject<string> = new Subject<string>();


  constructor(private http: HttpClient) {
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon/?limit=50');
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
        var name = response.name;
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
