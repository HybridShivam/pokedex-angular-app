// import {Inject, Injectable, Output} from '@angular/core';
// import {DOCUMENT} from '@angular/common';
// import {Subject} from 'rxjs';
// import {ActivatedRoute, Router} from '@angular/router';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class SidebarService {
//   toggled = true;
//   // Default Value
//   _hasBackgroundImage = false;
//   @Output() searchItemSubject: Subject<string> = new Subject<string>();
//
//   menus = [
//     {
//       title: 'General',
//       type: 'header'
//     },
//     {
//       title: 'All Pokémons',
//       icon: 'fas fa-list-ul',
//       active: false,
//       type: 'dropdown',
//       badge: {
//         text: 'New ',
//         class: 'badge-warning'
//       },
//       submenus: [
//         {
//           title: 'Gen 1',
//           badge: {
//             text: 'Pro ',
//             class: 'badge-success'
//           }
//         },
//         {
//           title: 'Gen 2'
//         },
//         {
//           title: 'Gen 3'
//         }
//       ]
//     },
//     {
//       title: 'Favorites',
//       icon: 'fas fa-heart',
//       active: false,
//       type: 'dropdown',
//       badge: {
//         text: '3',
//         class: 'badge-danger'
//       },
//       submenus: [
//         {
//           title: 'Products',
//         },
//         {
//           title: 'Orders'
//         },
//         {
//           title: 'Credit cart'
//         }
//       ]
//     },
//     {
//       title: 'Types',
//       icon: 'far fa-gem',
//       active: false,
//       type: 'dropdown',
//       submenus: [
//         {
//           title: 'General',
//         },
//         {
//           title: 'Panels'
//         },
//         {
//           title: 'Tables'
//         },
//         {
//           title: 'Icons'
//         },
//         {
//           title: 'Forms'
//         }
//       ]
//     },
//     {
//       title: 'Moves',
//       icon: 'fas fa-compact-disc',
//       active: false,
//       type: 'dropdown',
//       submenus: [
//         {
//           title: 'Pie chart',
//         },
//         {
//           title: 'Line chart'
//         },
//         {
//           title: 'Bar chart'
//         },
//         {
//           title: 'Histogram'
//         }
//       ]
//     },
//     {
//       title: 'Team Builder',
//       icon: 'fas fa-address-card',
//       active: false,
//       type: 'dropdown',
//       submenus: [
//         {
//           title: 'Google maps',
//         },
//         {
//           title: 'Open street map'
//         }
//       ]
//     },
//     {
//       title: 'Extra',
//       type: 'header'
//     },
//     {
//       title: 'About',
//       icon: 'fas fa-crown',
//       active: false,
//       type: 'simple',
//       badge: {
//         text: 'Beta',
//         class: 'badge-primary'
//       },
//     },
//     {
//       title: 'Home',
//       icon: 'fas fa-home',
//       active: false,
//       type: 'simple'
//     },
//   ];
//
//   constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private activatedRoute: ActivatedRoute) {
//     // if (screen.width > 991 && screen.width <= 1200) {
//     //   if (this.toggled !== true) {
//     //     this.document.body.classList.add('FixScrolling');
//     //   } else {
//     //     this.document.body.classList.remove('FixScrolling');
//     //   }
//     // }
//     // this.router.navigate(['/']);
//     // history.back();
//     // history.forward();
//     if (screen.width <= 768) {
//       this.toggled = true;
//       if (this.toggled !== true) {
//         this.document.body.classList.add('FixScrolling');
//       } else {
//         this.document.body.classList.remove('FixScrolling');
//       }
//     }
//   }
//
//
//   toggle() {
//     // console.log(history);
//     // console.log('Toggled');
//     // If Before Toggling Sidebar is closed push null history
//     // if (this.getSidebarState() === true) {
//     //   history.pushState(null, null, location.href);
//     // }
//     // if (this.getSidebarState() === false) {
//     //   this.router.navigate(['/pokemon']);
//     //   // console.log('Null History Added');
//     //   // history.forward();
//     //   // history.pushState(null, null, '/pokemon');
//     // }
//     this.toggled = !this.toggled;
//     if (screen.width <= 768) {
//       if (this.toggled !== true) {
//         this.document.body.classList.add('FixScrolling');
//       } else {
//         this.document.body.classList.remove('FixScrolling');
//       }
//     }
//   }
//
//   getSidebarState() {
//     return this.toggled;
//   }
//
//   setSidebarState(state: boolean) {
//     this.toggled = state;
//     // if (screen.width > 991 && screen.width <= 1200) {
//     //   if (this.toggled !== true) {
//     //     this.document.body.classList.add('FixScrolling');
//     //   } else {
//     //     this.document.body.classList.remove('FixScrolling');
//     //   }
//     // }
//     if (screen.width <= 768) {
//       if (this.toggled !== true) {
//         this.document.body.classList.add('FixScrolling');
//       } else {
//         this.document.body.classList.remove('FixScrolling');
//       }
//     }
//   }
//
//   getMenuList() {
//     return this.menus;
//   }
//
//   get hasBackgroundImage() {
//     return this._hasBackgroundImage;
//   }
//
//   set hasBackgroundImage(hasBackgroundImage) {
//     this._hasBackgroundImage = hasBackgroundImage;
//   }
//
// }
