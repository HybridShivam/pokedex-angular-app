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
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(searchFor.toLowerCase()) > -1 || pokemon.id.toString().indexOf(searchFor) > -1);
  }
}
