import {Component, OnInit} from '@angular/core';
import {SidebarService} from '../sidebar/sidebar.service';
import {PokemonService} from '../shared/pokemon.service';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color;
  searchText = '';
  miracleCount = 0;


  ngOnInit(): void {

    this.color = this.pokemonService.activePokemon.subscribe(
      response => {
        if (response === null) {
          this.color = 'navbar';
        } else {
          this.color = response.color;
        }
        console.log('Colored');
        this.setTitleBarColor(this.color);
      }
    );
  }

  constructor(public sidebarservice: SidebarService, private pokemonService: PokemonService, private meta: Meta) {
  }

  toggleSidebar() {
    this.sidebarservice.toggle();
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
    const themeColor = this.meta.getTag('name=theme-color');
    this.meta.removeTagElement(themeColor);
    this.meta.addTag({name: 'theme-color', content: hexColor});
    // this.meta.updateTag({name: 'theme-color', content: hexColor});
    // document.querySelector('meta[name="theme-color"]').setAttribute('content', hexColor);
    this.meta.updateTag({name: 'msapplication-navbutton-color', content: hexColor});
    this.meta.updateTag({name: 'apple-mobile-web-app-status-bar-style', content: hexColor});
  }


  typing($event) {
    if (this.miracleCount < 2) {
      history.pushState(null, null, window.location.href);
      history.back();
      this.miracleCount++;
    }
    console.log('typing');
    this.setTitleBarColor(this.color);
    this.sidebarservice.searchItemSubject.next(this.searchText);
  }


  // typingInDiv(text: string) {
  //   console.log('typing');
  //   this.setTitleBarColor(this.color);
  //   this.sidebarservice.searchItemSubject.next(text);
  // }

}
