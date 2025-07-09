import { Component } from '@angular/core';
import { HeaderComponent } from "./view/layout/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

   title = 'FiresCatalanes';

  
 }
