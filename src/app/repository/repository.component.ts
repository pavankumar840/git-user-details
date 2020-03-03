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
  pageNumber: number = 1;
  isPreviousDisable: boolean = true;
  isNextDisable: boolean = false;
  totalRepos: number;
  repoLogin: string;

  constructor(private route: ActivatedRoute, private router: Router, private getRepositories: GetRepositories) { }

  ngOnInit() {
     this.repoLogin = this.route.snapshot.paramMap.get('login');
    // this.totalRepos = this.router.getCurrentNavigation().extras.state.repoCount;
    this.getAllRepos(this.pageNumber);
  }

  getAllRepos(pageNumber: number){
    this.repoDetails = [];
    this.getRepositories.getRepos(this.repoLogin, pageNumber).subscribe((result: RepoInterface) => {
      this.repoDetails.push(result);
      console.log(this.repoDetails);
    })
  }

  previousPage(){
    var pagecount = --this.pageNumber;
    this.getAllRepos(pagecount);
  }
  nextPage(){
    var pagecount = ++this.pageNumber;
    this.getAllRepos(pagecount);
  }

}
