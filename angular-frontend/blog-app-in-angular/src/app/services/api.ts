import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface BlogPost {
id: any;
  title: string;
  date: string;
  slug: string;
  image: File | null;
  content: string;
  imageUrl:string;
}

@Injectable({
  providedIn: 'root'
})
export class Api {
      private apiUrl = 'http://localhost:8080/posts/create'; 
       private blogsSignal = signal<BlogPost[]>([]);
  private loadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
   private hasFetched = false;

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
    get blogs() {
       // Lazy fetch: trigger only when first accessed
    if (!this.hasFetched) {
      this.fetchBlogs();
    }
   // return this.productsSignal;
    return this.blogsSignal;
  }

  get loading() {
    return this.loadingSignal;
  }

  get error() {
    return this.errorSignal;
  }

  fetchBlogs() {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<BlogPost[]>('http://localhost:8080/posts').subscribe({
      next: (data) => {
        this.blogsSignal.set(data);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set('Failed to load products');
        this.loadingSignal.set(false);
      }
    });
  }
  
}
