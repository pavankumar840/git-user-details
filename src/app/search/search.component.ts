import { Component, OnInit, Output, EventEmitter,  } from '@angular/core';
import { GetUsersService } from '../commonServices/getUsers.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchText: string;
  @Output() searchevent = new EventEmitter<string>();
  constructor(private searchService: GetUsersService) { }

  ngOnInit() {

  }

  onKeyPress(){
    this.searchevent.emit(this.searchText);
  }

}
