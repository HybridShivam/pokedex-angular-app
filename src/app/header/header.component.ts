import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar/sidebar.service';
import {PokemonService} from '../shared/pokemon.service';
import {Meta} from '@angular/platform-browser';
import {consoleTestResultHandler} from 'tslint/lib/test';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color;


  ngOnInit(): void {
    this.color = this.pokemonService.activePokemon.subscribe(
      response => {
        if (response === null) {
          this.color = 'navbar';
        } else {
          this.color = response.color;
        }
        console.log('COlor Set');
        this.setTitleBarColor(this.color);
      }
    );
  }

  constructor(public sidebarservice: SidebarService, private pokemonService: PokemonService, private meta: Meta) {
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
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
        hexColor = '#e0e0e0';
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
        hexColor = '#e1bee7';
        break;
      }
      case 'red': {
        hexColor = '#ff8a80';
        break;
      }
      case 'white': {
        hexColor = '#e0e0e0';
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

}
