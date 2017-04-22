import { Component, HostListener } from '@angular/core';

import { SidenavTitleService } from './shared/sidenav-title.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  { 
  title: string;

  @HostListener('window:resize') onWindowReSize() {}

  constructor (private _sidenavTitleService: SidenavTitleService) {
      this._sidenavTitleService.titleSource.subscribe((title: string) => {
          this.title = title;
      });
      this._sidenavTitleService.setTitle("Inbox");
  }

  isScreenWide() {
      let width: number = this.getScreenWidth();
      if (width > 720) {
          return true;
      }
      return false;
  }

  getScreenWidth(): number {
      let width: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      return width;
  }

  changeView(sidenav: any, title: string) {
    this._sidenavTitleService.setTitle(title);
    if (sidenav.mode == "over") {
        sidenav.toggle();
    }
  }
}
