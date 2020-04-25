import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar/sidebar.service';
import {PokemonService} from '../shared/pokemon.service';

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

  constructor(public sidebarservice: SidebarService, private pokemonService: PokemonService) {
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

}
