import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeInterface } from './home.interface';
import { GetUsersService } from '../commonServices/getUsers.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData: any;
  error: any;
  public usersData: HomeInterface[] = [];
  public searchText: string;
  public pageNumber = 0;
  public isPreviousDisable: boolean = true;
  public isNextDisable: boolean = false;
  constructor(private router: Router,private http: HttpClient, private getUsers: GetUsersService){}

  ngOnInit(){
    this.userList(this.pageNumber)
  }

  //get user data  from api and extract required data from it
  userList(pagecount: number){
    this.usersData = [];
    this.getUsers.rawUsersData(this.pageNumber).subscribe((data: any) => {
      for(let user of data) {
        this.getUsers.requireUserdData(user).subscribe((result: HomeInterface) =>{
          this.usersData.sort().push(result);
          }),error  => console.log(error);
      }
      }),error  => console.log(error);
  }

  //search filter
  searchEvent(serchText: string){
    this.usersData = [];
    this.getUsers.serarchApi(serchText).subscribe((result: any) => {
      for(let user of result.items) {
        this.getUsers.requireUserdData(user).subscribe((result: HomeInterface) =>{
          this.usersData.sort().push(result);
          }),error  => console.log(error);
      }
    }),error  => console.log(error);
  }

  // navigate to repositories component
  getRepos(login: string, repoCount: number){
    this.router.navigate(['/repositories', login], {state: {repoCount} });
  }

  //pagenation
  previousPage(){
    var pagecount = --this.pageNumber*30;
    if(this.pageNumber<1){
      this.pageNumber = 0;
      this.isPreviousDisable = true;
    }else
    this.isPreviousDisable = false;
    this.userList(pagecount);
  }
  nextPage(){
    var pagecount = ++this.pageNumber*30;
    this.userList(pagecount);
  }
}
