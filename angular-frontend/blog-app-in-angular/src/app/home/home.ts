import { Component, computed } from '@angular/core';
import { BlogCard } from '../blog-card/blog-card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Navbar } from "../navbar/navbar";
import { Api, BlogPost } from '../services/api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [BlogCard, MatPaginatorModule, Navbar,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  blogs?:BlogPost[];
  pagedBlogs?: BlogPost[];

  pageSize = 1;
  totalPages = 0;
  totalBlogs = 0;
  currentPage = 0;
  readonly blogList = computed(() => this.apiService.blogs());

constructor(public apiService: Api) {}
  ngOnInit() {
    this.apiService.ensureBlogsFetched();
     this.blogs = this.apiService.blogs();
    this.totalBlogs = this.blogs.length;
    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
    this.updatePagedBlogs(0);
  }

  updatePagedBlogs(pageIndex: number) {
    this.currentPage = pageIndex;
    const start = pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBlogs = this.blogs?.slice(start, end);
  }
    onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePagedBlogs(event.pageIndex);
  }
 get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
  get visiblePages(): number[] {
  const pages: number[] = [];
  const total = this.totalPages;
  const current = this.currentPage;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i);
  }

  // Always show first page
  pages.push(0);

  // Show ellipsis if currentPage > 3
  if (current > 3) pages.push(-1); // -1 will represent "..."

  // Show pages around current
  const start = Math.max(1, current - 1);
  const end = Math.min(total - 2, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  // Show ellipsis if currentPage < total - 4
  if (current < total - 4) pages.push(-1);

  // Always show last page
  pages.push(total - 1);

  return pages;
}

}
interface Blog {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
  summary: string;
}


