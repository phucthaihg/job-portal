import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchJobsComponent } from "./search-jobs/search-jobs.component";
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { MaterialModule } from "../material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { StringsJoinerPipe } from "../pipe/strings-joiner.pipe";
import { StatusExtractorPipe } from "../pipe/status-extractor.pipe";
import { RouterModule } from "@angular/router";
import {SeekerProfileComponent} from "./seeker-profile/seeker-profile.component";



@NgModule({
  declarations: [
    SearchJobsComponent,
    MyJobsComponent,
    SeekerProfileComponent,
    StringsJoinerPipe,
    StatusExtractorPipe
  ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule.forChild([
          {path: '', component: SearchJobsComponent},
          {path: 'search-jobs', component: SearchJobsComponent},
          {path: 'my-jobs', component: MyJobsComponent },
          {path: 'seeker-profile/edit', component: SeekerProfileComponent},
          {path: 'seeker-profile/view', component: SeekerProfileComponent}
        ]),
    ],
  exports: [
    SearchJobsComponent,
    MyJobsComponent,
    SeekerProfileComponent,
  ]
})
export class JobSeekerModule { }
