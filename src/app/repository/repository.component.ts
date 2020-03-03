import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GetRepositories } from '../commonServices/getRepositories.service'
import { RepoInterface } from './repository.interface';
@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {

  public repoDetails: RepoInterface[] = []
  pageNumber: any;
  isPreviousDisable: boolean = true;
  isNextDisable: boolean = false;
  totalRepos: number;
  constructor(private route: ActivatedRoute, private router: Router, private getRepositories: GetRepositories) { }

  ngOnInit() {
    let repoLogin = this.route.snapshot.paramMap.get('login');
    // this.totalRepos = this.router.getCurrentNavigation().extras.state.repoCount;
    this.getRepositories.getRepos(repoLogin).subscribe((result: RepoInterface) => {
      this.repoDetails.push(result);
      console.log(this.repoDetails);
    })
  }

  previousPage(){
    var pagecount = --this.pageNumber*30;
    if(this.pageNumber<1){
      this.pageNumber = 0;
      this.isPreviousDisable = true;
    }else
    this.isPreviousDisable = false;
    // this.usersData = this.getUsers.returnData(pagecount);
  }
  nextPage(){
    var pagecount = ++this.pageNumber*30;
    // this.usersData = this.getUsers.returnData(pagecount);
  }

}
