import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetRepositories {

  constructor(private http: HttpClient){}

  getRepos(login: string){
    return this.http.get('https://api.github.com/users/'+login+'/repos');
  }

}
