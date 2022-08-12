import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from "../services/user.service";

export interface Seeker {
  email:string;
  status:string
}

@Pipe({
  name: 'statusExtractor'
})
export class StatusExtractorPipe implements PipeTransform {

  constructor(private userService: UserService) {
  }

  transform(value: Array<Seeker>): string {
    const {email} = this.userService.decodeToken();
    const seeker =  value.find(s => s.email === email) || {status: ''};
    return seeker.status;
  }
}
