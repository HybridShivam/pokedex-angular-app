import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pokemon } from '../../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonItemComponent {

  @Input() pokemon: Pokemon;

  pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }
}
