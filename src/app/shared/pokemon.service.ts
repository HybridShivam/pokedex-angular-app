import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Pokemon} from './pokemon.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  pokemons: Pokemon[] = new Array<Pokemon>(20);
  pokemonsListChanged = new Subject<Pokemon[]>();
  responseCounter = 0;


  constructor(private http: HttpClient) {
    this.getPokemonList();
  }


  getPokemonList() {
    this.http.get<{ count: string, next: string, previous: string, results: { name: string, url: string }[] }>
    ('https://pokeapi.co/api/v2/pokemon').subscribe(
      (response) => {
        const pokemons: { name: string, url: string }[] = response.results;
        for (const pokemon of pokemons) {
          this.getPokemon(pokemon.url);
        }
      }
    );
  }


  getPokemon(url: string) {
    this.http.get<{ name: string, id: string }>
    (url).subscribe(
      (response) => {
        this.pokemons[+response.id - 1] = new Pokemon(response.name, response.id, response['sprites']['front_default']);
        this.responseCounter++;
        if (this.responseCounter === 20) {
          this.responseCounter = 0;
          this.pokemonsListChanged.next(this.pokemons);
        }
      }
    );

  }
}
