import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountService } from './services/account.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent, FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  accountService = inject(AccountService);
  
  ngOnInit(): void { // initialize user on page refresh
    let loggedInUserStr: string | null  = localStorage.getItem('loggedInUser');
      console.log(loggedInUserStr);
    
    if (loggedInUserStr != null) {
      this.accountService.authorizeLoggedInUser();

      this.accountService.setCurrentUser(JSON.parse(loggedInUserStr))
    }
  }
}