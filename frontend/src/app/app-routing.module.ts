import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { EmployerGuard } from "./employer/employer-guard";
import { CheckSeekerGuard } from "./check-seeker-guard";

const routes: Routes = [
  { path: '', redirectTo: "login", pathMatch: "full"},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignupComponent},
  {
    path: 'seekers',
    loadChildren: () =>
      import('./job-seeker/job-seeker.module')
        .then(module => module.JobSeekerModule),
    canActivate: [CheckSeekerGuard],
  },
  {
    path: 'employers',
    loadChildren: () =>
      import('./employer/employer.module')
      .then(module => module.EmployerModule),
    canActivate: [EmployerGuard],
  },
  { path: '**', redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
