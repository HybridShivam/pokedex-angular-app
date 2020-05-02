import {Injectable} from '@angular/core';
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
        this.pokemons[+response.id - 1] = new Pokemon(
          response.name,
          response.id,
          response['sprites'],
          response['types'],
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
          null,
          null
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
          if (this.totalCounter === 151) {
            return;
          }
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

  getPokemonSpeciesById(Id) {
    const url = 'https://pokeapi.co/api/v2/pokemon-species/' + Id + '/';
    return this.http.get(url);
  }

  getAbility(url: string) {
    return this.http.get(url);
  }
}
