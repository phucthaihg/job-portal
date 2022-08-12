import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-edashboard',
  template: `
    <button mat-raised-button color="primary" type="button" (click)="postNewJob()">Post new job</button>

    <div>
      <app-list-ejobs></app-list-ejobs>
    </div>
  `,
  styles: [
  ]
})
export class EDashboardComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  postNewJob(){
    this.router.navigate(['', 'employers', 'jobs', 'add'])
  }


}
