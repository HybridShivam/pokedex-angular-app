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

  setTitleBarColor() {
    this.meta.updateTag({name: 'theme-color', content:});
    this.meta.updateTag({name: 'msapplication-navbutton-color', content:});
    this.meta.updateTag({name: 'apple-mobile-web-app-status-bar-style', content:});
  }

}
