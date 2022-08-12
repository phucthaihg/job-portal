import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Job } from "./job.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {

  constructor(private http: HttpClient) {
  }

  searchJobs(keyword: string, city: string, state:string, page:number): Observable<{data:Array<Job>, total:number}> {
    const queryMap = new Map();
    queryMap.set('page', page);
    if(keyword) {
      queryMap.set('keyword', keyword);
    }

    if(city) {
      queryMap.set('city', city);
    }

    if(state) {
      queryMap.set('state', state);
    }

    let query = '';
    queryMap.forEach((v, k) => {
      query += (k + '=' + v) + '&';
    })

    return this.http.get<{data:Array<Job>, total:number}>(`${environment.apiUrl}/jobs/search?${query}`);
  }

  applyJob(job_id: string, email: string) {
    return this.http.patch<{success:string}>(`${environment.apiUrl}/seekers/job/${job_id}`, {
      job_id,
      email
    });
  }

  getMyJobs(email:string) {
    return this.http.get<{data:Array<Job>, total:number}>(`${environment.apiUrl}/seekers/my-job/${email}`);
  }
}
