import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BlogPost {
  title: string;
  date: string;
  slug: string;
  image: File | null;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class Api {
      private apiUrl = 'http://localhost:8080/posts/create'; // Adjust to your Go backend

  constructor(private http: HttpClient) {}

  createBlog(blog: BlogPost): Observable<any> {
    const formData = new FormData();
  //  formData.append('title', blog.title);
  formData.append('title', "yes");
    formData.append('date', blog.date);
    formData.append('slug', blog.slug);
    formData.append('content', blog.content);
    if (blog.image) {
      formData.append('image', blog.image);
    }

    return this.http.post(this.apiUrl, formData);
  }
  
}
