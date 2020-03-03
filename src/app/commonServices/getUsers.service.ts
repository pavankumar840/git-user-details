import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { HomeInterface } from '../home/home.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class GetUsersService {
  private url: string = "https://api.github.com/users";
  data: any;
  gitUsersData: HomeInterface[] = []

  constructor(private http: HttpClient) { }

  rawUsersData(pageNo: number) {
    this.gitUsersData = [];
    return this.http.get(this.url + "?since=" + pageNo)
  }

  requireUserdData(user) {
    return this.http.get(this.url + "/" + user.login)
  }

  serarchApi(searchText: string) {
    return this.http.get("https://api.github.com/search/users?q=" + '"' + searchText + '"')
  }
}
