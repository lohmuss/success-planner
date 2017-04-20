import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  { 
  constructor ( ) {
  }
  
  @HostListener('window:resize') onWindowReSize() {}

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
}
