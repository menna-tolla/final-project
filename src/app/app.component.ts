import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app1';
  goToUp()
  {
    // alert("hello");
    window.scrollTo(0,0)
  }
}

