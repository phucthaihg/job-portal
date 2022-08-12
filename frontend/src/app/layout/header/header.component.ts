import {Component, NgZone, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;

  role = '';

  fullname:string = '';

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const {role, fullname} = this.userService.decodeToken();
        this.role = role;
        this.fullname = fullname;
        if (event.url === '/login' || event.url === '/sign-up') {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = true;
        }
      }
    });
  }

  logout() {
    this.userService.clearToken();
    this.router.navigate(['/', 'login']);
  }

  ngOnInit(): void {

  }

}
