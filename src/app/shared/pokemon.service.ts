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


  constructor(private http: HttpClient) {
    this.getPokemonList('https://pokeapi.co/api/v2/pokemon/?limit=50?');
  }


  getPokemonList(url: string) {
    this.http.get<{ count: string, next: string, previous: string, results: { name: string, url: string }[] }>
    (url).subscribe(
      (response) => {
        const pokemons: { name: string, url: string }[] = response.results;
        for (const pokemon of pokemons) {
          if (pokemon.url === 'https://pokeapi.co/api/v2/pokemon/807/') {
            this.getPokemon(pokemon.url, null);
            console.log('Last Pokemon');
            return;
          } else {
            this.getPokemon(pokemon.url, response.next);
          }
        }
      }
    );
  }


  getPokemon(url: string, morePokemons) {
    this.http.get<{ name: string, id: string }>
    (url).subscribe(
      (response) => {
        this.pokemons[+response.id - 1] = new Pokemon(response.name, response.id, response['sprites']['front_default']);
        this.responseCounter++;
        this.totalCounter++;
        console.log(this.totalCounter);
        if (this.totalCounter === 807) {
          return;
        }
        if (this.responseCounter === 50) {
          this.noOfPokemonsLoaded = this.noOfPokemonsLoaded + 50;
          this.newPokemonsLoaded.next(this.noOfPokemonsLoaded);
          this.responseCounter = 0;

          this.pokemonsListChanged.next(this.pokemons);
          if (morePokemons != null) {
            this.getPokemonList(morePokemons);
          }
        }
      }
    );

  }
}
