import {Pipe, PipeTransform} from '@angular/core';
import {Pokemon} from './shared/pokemon.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(pokemons: Pokemon[], searchFor: string) {
    if (!pokemons) {
      return [];
    }
    if (searchFor === '' || !searchFor) {
      return pokemons;
    }
    // let result = [];
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(searchFor) > -1);
    // for (let pokemon of pokemons) {
    //   if (pokemons.name)
    //     }
  }
}
