import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {PokemonService} from '../shared/pokemon.service';
import {Meta} from '@angular/platform-browser';
import {PwaService} from '../shared/pwa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color;
  searchText = '';
  showSearch = true;
  _timeout: any = null;
  megaSwitch;
  @ViewChild('menu') menu: ElementRef;

  ngOnInit(): void {
    if (localStorage.getItem('megaEnabled') == null) {
      localStorage.setItem('megaEnabled', 'true');
    }
    this.megaSwitch = localStorage.getItem('megaEnabled') == 'true';
    this.pokemonService.megaSwitchSubscription.next(this.megaSwitch);
    this.color = this.pokemonService.activePokemon.subscribe(
      response => {
        if (response === null) {
          this.color = 'navbar';
          this.showSearch = true;
        } else {
          this.color = response.color;
          this.showSearch = false;
        }
        this.setTitleBarColor(this.color);
      }
    );
  }

  constructor(public pokemonService: PokemonService, public Pwa: PwaService, private meta: Meta, private lc: NgZone) {
  }


  setTitleBarColor(color: string) {
    let hexColor = '#FFFFFF';
    switch (color) {
      case 'black': {
        hexColor = '#607d8b';
        break;
      }
      case 'blue': {
        hexColor = '#81d4fa';
        break;
      }
      case 'brown': {
        hexColor = '#bcaaa4';
        break;
      }
      case 'gray': {
        hexColor = '#a6a6a6';
        break;
      }
      case 'green': {
        hexColor = '#81c784';
        break;
      }
      case 'pink': {
        hexColor = '#f8bbd0';
        break;
      }
      case 'purple': {
        hexColor = '#ad8ee7';
        break;
      }
      case 'red': {
        hexColor = '#ff8a80';
        break;
      }
      case 'white': {
        hexColor = '#d5dbe1';
        break;
      }
      case 'yellow': {
        hexColor = '#ffd600';
        break;
      }
      default: {
        hexColor = '#FFFFFF';
      }

    }
    this.meta.updateTag({name: 'theme-color', content: hexColor});
    this.meta.updateTag({name: 'msapplication-navbutton-color', content: hexColor});
    this.meta.updateTag({name: 'apple-mobile-web-app-status-bar-style', content: hexColor});
  }

  checkBoxChange(values: any) {
    this.pokemonService.megaSwitchSubscription.next(values.currentTarget.checked);
    localStorage.setItem('megaEnabled', values.currentTarget.checked.toString());
  }

  openMenu() {
    this.menu.nativeElement.click();
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }


  typingStopped() {
    if (this._timeout) {
      // if there is already a timeout in process cancel it
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.lc.run(() => {
          this.pokemonService.searchItemSubject.next(this.searchText);
        }
      )
      ;
    }, 50);
  }
}
