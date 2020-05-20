import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from '../../shared/pokemon.model';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss']
})
export class PokemonItemComponent implements OnInit {


  @Input() pokemon: Pokemon;
  // pokemonThumbnail;

  constructor() {
  }

  ngOnInit(): void {
    // this.pokemonThumbnail = 'https://raw.githubusercontent.com/HybridShivam/pokemon.json/master/thumbnails/' +
    //   this.pad(this.pokemon.id, 3) + '.png';
  }

  pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

}
