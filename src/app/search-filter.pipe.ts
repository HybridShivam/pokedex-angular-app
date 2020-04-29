import {Pipe, PipeTransform} from '@angular/core';
import {Pokemon} from './shared/pokemon.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Pokemon[], searchFor: string): unknown {
    return null;
  }

}
