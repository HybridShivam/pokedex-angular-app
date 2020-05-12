import {Component, NgZone, OnInit} from '@angular/core';
import {PokemonService} from '../shared/pokemon.service';
import {Meta} from '@angular/platform-browser';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color;
  searchText = '';
  miracleCount = 0;
  showSearch = true;
  _timeout: any = null;


  ngOnInit(): void {

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
    // this.pokemonService.searchItemSubject.subscribe(
    //   (response) => {
    //     this.searchText = response;
    //   }
    // );
  }

  constructor(private pokemonService: PokemonService, private meta: Meta, private lc: NgZone, private _location: Location) {
  }

  // toggleSidebar() {
  //   this.sidebarservice.toggle();
  // }
  //
  // toggleBackgroundImage() {
  //   this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  // }
  //
  // getSideBarState() {
  //   return this.sidebarservice.getSidebarState();
  // }
  //
  // hideSidebar() {
  //   this.sidebarservice.setSidebarState(true);
  // }

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
    // const themeColor = this.meta.getTag('name=theme-color');
    // this.meta.removeTagElement(themeColor);
    // this.meta.addTag({name: 'theme-color', content: hexColor});
    this.meta.updateTag({name: 'theme-color', content: hexColor});
    // document.querySelector('meta[name="theme-color"]').setAttribute('content', hexColor);
    this.meta.updateTag({name: 'msapplication-navbutton-color', content: hexColor});
    this.meta.updateTag({name: 'apple-mobile-web-app-status-bar-style', content: hexColor});
  }


  // typing($event) {
  //   if (this.miracleCount < 1) {
  //     history.pushState(null, null, window.location.href);
  //     history.back();
  //     history.pushState(null, null, window.location.href);
  //     history.back();
  //     this.miracleCount++;
  //   }
  //   // console.log('typing');
  //   // this.setTitleBarColor(this.color);
  //   this.pokemonService.searchItemSubject.next(this.searchText);
  // }

  typingStopped() {
    if (this.miracleCount < 1) {
      history.pushState(null, null, window.location.href);
      history.back();
      history.pushState(null, null, window.location.href);
      history.back();
      history.pushState(null, null, window.location.href);
      history.back();
      this.miracleCount++;
    }
    // this.pokemonService.searchItemSubject.next(this.searchText);
    // this._timeout = null;
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

  // goBack() {
  //   this._location.back();
  // }
}
