import { Component, OnInit } from '@angular/core';
import {JobSeekerService} from "../search-jobs/job-seeker.service";
import {Observable} from "rxjs";
import {Job} from "../search-jobs/job.model";
import {Store} from "@ngrx/store";
import {jobSeekerMyJob} from "../../store/action/seeker.actions";
import {UserService} from "../../services/user.service";


@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  displayedColumns: string[] = ['SNo.', 'Job Title', 'Location', 'Status'];
  jobs$: Observable<Array<Job>>;
  constructor(private jobSeekerService: JobSeekerService,
              private userService: UserService,
              private store: Store<{jobReducer: any, jobApplyReducer: any}>) {

    this.jobs$ = store.select('jobReducer');
  }

  ngOnInit(): void {
    const {email} = this.userService.decodeToken();
    this.store.dispatch(jobSeekerMyJob({email}));
  }
}
