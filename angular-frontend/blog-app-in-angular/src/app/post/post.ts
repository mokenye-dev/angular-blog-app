import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api, BlogPost } from '../services/api';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post {
  post?: BlogPost;
  constructor(private route: ActivatedRoute, private apiService: Api) {}

ngOnInit() {
  const slug = this.route.snapshot.paramMap.get('slug');
  if (slug) {
    this.post = this.apiService.fetchPostBySlug(slug);
  }
}


}
