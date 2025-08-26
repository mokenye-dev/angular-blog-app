import { Component } from '@angular/core';
import { Api, BlogPost } from '../services/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss'
})
export class SearchPage {
   query = '';
  results: BlogPost[] = [];
  constructor( private route: ActivatedRoute,
    private apiService: Api){}


      ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.query = params['query'] || '';
      this.fetchResults();
    });
  }
  fetchResults() {
  this.results=  this.apiService.blogs().filter(post=> post.title.toLowerCase().includes(this.query.toLowerCase()) ||
        post.content.toLowerCase().includes(this.query.toLowerCase()));
    
  }
}
