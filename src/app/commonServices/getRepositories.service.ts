import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GetRepositories {

  constructor(private http: HttpClient){}

  getRepos(login: string, pageNo){
    return this.http.get('https://api.github.com/users/'+login+'/repos?page='+pageNo+"&per_page=100'");
  }

}
