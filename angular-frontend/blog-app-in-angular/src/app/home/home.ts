import { Component } from '@angular/core';
import { BlogCard } from '../blog-card/blog-card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Navbar } from "../navbar/navbar";
import { Api } from '../services/api';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [BlogCard, MatPaginatorModule, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
 blogs: Blog[] = SAMPLE_BLOGS; // or preloaded array
  pagedBlogs: Blog[] = [];

  pageSize = 1;
  totalPages = 0;
  totalBlogs = 0;
  currentPage = 0;
constructor(public apiService: Api) {}
  ngOnInit() {
   // this.blogs = this.fetchBlogs(); // however you're loading them
    this.totalBlogs = this.blogs.length;
    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
    this.updatePagedBlogs(0);
  }

  updatePagedBlogs(pageIndex: number) {
    this.currentPage = pageIndex;
    const start = pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBlogs = this.blogs.slice(start, end);
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
export const SAMPLE_BLOGS: Blog[] = [
  {
    id: 1,
    title: "Getting Started with Angular 20",
    date: "2025-08-01",
    imageUrl: "https://via.placeholder.com/300x200?text=Angular",
    summary: "A beginner-friendly guide to setting up Angular 20 with modern tooling."
  },
  {
    id: 2,
    title: "Why Go Is Perfect for Scalable APIs",
    date: "2025-08-03",
    imageUrl: "https://via.placeholder.com/300x200?text=Go",
    summary: "Explore Go’s concurrency model and how it powers efficient backend services."
  },
  {
    id: 3,
    title: "Tailwind CSS: Design Without the Drama",
    date: "2025-08-05",
    imageUrl: "https://via.placeholder.com/300x200?text=Tailwind",
    summary: "Learn how utility-first styling can speed up your frontend workflow."
  },
  {
    id: 4,
    title: "Docker Compose for Local Dev Bliss",
    date: "2025-08-07",
    imageUrl: "https://via.placeholder.com/300x200?text=Docker",
    summary: "Simplify your environment setup with Docker Compose and shared volumes."
  },
  {
    id: 5,
    title: "PostgreSQL Tips for Blog Apps",
    date: "2025-08-09",
    imageUrl: "https://via.placeholder.com/300x200?text=PostgreSQL",
    summary: "Indexing, seeding, and schema design for performant blog backends."
  },
  {
    id: 6,
    title: "Responsive Navbars with Tailwind",
    date: "2025-08-11",
    imageUrl: "https://via.placeholder.com/300x200?text=Navbar",
    summary: "Build a clean, accessible navbar that adapts to any screen size."
  },
  {
    id: 7,
    title: "Android + Go: A Match Made in API Heaven",
    date: "2025-08-13",
    imageUrl: "https://via.placeholder.com/300x200?text=Android",
    summary: "How to connect your Android frontend to a Go-powered backend."
  },
  {
    id: 8,
    title: "Figma to Angular: Pixel-Perfect Translation",
    date: "2025-08-15",
    imageUrl: "https://via.placeholder.com/300x200?text=Figma",
    summary: "Tips for converting design specs into clean Angular components."
  },
    {
    id: 1,
    title: "Getting Started with Angular 20",
    date: "2025-08-01",
    imageUrl: "https://via.placeholder.com/300x200?text=Angular",
    summary: "A beginner-friendly guide to setting up Angular 20 with modern tooling."
  },
  {
    id: 2,
    title: "Why Go Is Perfect for Scalable APIs",
    date: "2025-08-03",
    imageUrl: "https://via.placeholder.com/300x200?text=Go",
    summary: "Explore Go’s concurrency model and how it powers efficient backend services."
  },
  {
    id: 3,
    title: "Tailwind CSS: Design Without the Drama",
    date: "2025-08-05",
    imageUrl: "https://via.placeholder.com/300x200?text=Tailwind",
    summary: "Learn how utility-first styling can speed up your frontend workflow."
  },
  {
    id: 4,
    title: "Docker Compose for Local Dev Bliss",
    date: "2025-08-07",
    imageUrl: "https://via.placeholder.com/300x200?text=Docker",
    summary: "Simplify your environment setup with Docker Compose and shared volumes."
  },
  {
    id: 5,
    title: "PostgreSQL Tips for Blog Apps",
    date: "2025-08-09",
    imageUrl: "https://via.placeholder.com/300x200?text=PostgreSQL",
    summary: "Indexing, seeding, and schema design for performant blog backends."
  },
  {
    id: 6,
    title: "Responsive Navbars with Tailwind",
    date: "2025-08-11",
    imageUrl: "https://via.placeholder.com/300x200?text=Navbar",
    summary: "Build a clean, accessible navbar that adapts to any screen size."
  },
  {
    id: 7,
    title: "Android + Go: A Match Made in API Heaven",
    date: "2025-08-13",
    imageUrl: "https://via.placeholder.com/300x200?text=Android",
    summary: "How to connect your Android frontend to a Go-powered backend."
  },
  {
    id: 8,
    title: "Figma to Angular: Pixel-Perfect Translation",
    date: "2025-08-15",
    imageUrl: "https://via.placeholder.com/300x200?text=Figma",
    summary: "Tips for converting design specs into clean Angular components."
  },
    {
    id: 1,
    title: "Getting Started with Angular 20",
    date: "2025-08-01",
    imageUrl: "https://via.placeholder.com/300x200?text=Angular",
    summary: "A beginner-friendly guide to setting up Angular 20 with modern tooling."
  },
  {
    id: 2,
    title: "Why Go Is Perfect for Scalable APIs",
    date: "2025-08-03",
    imageUrl: "https://via.placeholder.com/300x200?text=Go",
    summary: "Explore Go’s concurrency model and how it powers efficient backend services."
  },
  {
    id: 3,
    title: "Tailwind CSS: Design Without the Drama",
    date: "2025-08-05",
    imageUrl: "https://via.placeholder.com/300x200?text=Tailwind",
    summary: "Learn how utility-first styling can speed up your frontend workflow."
  },
  {
    id: 4,
    title: "Docker Compose for Local Dev Bliss",
    date: "2025-08-07",
    imageUrl: "https://via.placeholder.com/300x200?text=Docker",
    summary: "Simplify your environment setup with Docker Compose and shared volumes."
  },
  {
    id: 5,
    title: "PostgreSQL Tips for Blog Apps",
    date: "2025-08-09",
    imageUrl: "https://via.placeholder.com/300x200?text=PostgreSQL",
    summary: "Indexing, seeding, and schema design for performant blog backends."
  },
  {
    id: 6,
    title: "Responsive Navbars with Tailwind",
    date: "2025-08-11",
    imageUrl: "https://via.placeholder.com/300x200?text=Navbar",
    summary: "Build a clean, accessible navbar that adapts to any screen size."
  },
  {
    id: 7,
    title: "Android + Go: A Match Made in API Heaven",
    date: "2025-08-13",
    imageUrl: "https://via.placeholder.com/300x200?text=Android",
    summary: "How to connect your Android frontend to a Go-powered backend."
  },
  {
    id: 8,
    title: "Figma to Angular: Pixel-Perfect Translation",
    date: "2025-08-15",
    imageUrl: "https://via.placeholder.com/300x200?text=Figma",
    summary: "Tips for converting design specs into clean Angular components."
  },
    {
    id: 1,
    title: "Getting Started with Angular 20",
    date: "2025-08-01",
    imageUrl: "https://via.placeholder.com/300x200?text=Angular",
    summary: "A beginner-friendly guide to setting up Angular 20 with modern tooling."
  },
  {
    id: 2,
    title: "Why Go Is Perfect for Scalable APIs",
    date: "2025-08-03",
    imageUrl: "https://via.placeholder.com/300x200?text=Go",
    summary: "Explore Go’s concurrency model and how it powers efficient backend services."
  },
  {
    id: 3,
    title: "Tailwind CSS: Design Without the Drama",
    date: "2025-08-05",
    imageUrl: "https://via.placeholder.com/300x200?text=Tailwind",
    summary: "Learn how utility-first styling can speed up your frontend workflow."
  },
  {
    id: 4,
    title: "Docker Compose for Local Dev Bliss",
    date: "2025-08-07",
    imageUrl: "https://via.placeholder.com/300x200?text=Docker",
    summary: "Simplify your environment setup with Docker Compose and shared volumes."
  },
  {
    id: 5,
    title: "PostgreSQL Tips for Blog Apps",
    date: "2025-08-09",
    imageUrl: "https://via.placeholder.com/300x200?text=PostgreSQL",
    summary: "Indexing, seeding, and schema design for performant blog backends."
  },
  {
    id: 6,
    title: "Responsive Navbars with Tailwind",
    date: "2025-08-11",
    imageUrl: "https://via.placeholder.com/300x200?text=Navbar",
    summary: "Build a clean, accessible navbar that adapts to any screen size."
  },
  {
    id: 7,
    title: "Android + Go: A Match Made in API Heaven",
    date: "2025-08-13",
    imageUrl: "https://via.placeholder.com/300x200?text=Android",
    summary: "How to connect your Android frontend to a Go-powered backend."
  },
  {
    id: 8,
    title: "Figma to Angular: Pixel-Perfect Translation",
    date: "2025-08-15",
    imageUrl: "https://via.placeholder.com/300x200?text=Figma",
    summary: "Tips for converting design specs into clean Angular components."
  },
    {
    id: 1,
    title: "Getting Started with Angular 20",
    date: "2025-08-01",
    imageUrl: "https://via.placeholder.com/300x200?text=Angular",
    summary: "A beginner-friendly guide to setting up Angular 20 with modern tooling."
  },
  {
    id: 2,
    title: "Why Go Is Perfect for Scalable APIs",
    date: "2025-08-03",
    imageUrl: "https://via.placeholder.com/300x200?text=Go",
    summary: "Explore Go’s concurrency model and how it powers efficient backend services."
  },
  {
    id: 3,
    title: "Tailwind CSS: Design Without the Drama",
    date: "2025-08-05",
    imageUrl: "https://via.placeholder.com/300x200?text=Tailwind",
    summary: "Learn how utility-first styling can speed up your frontend workflow."
  },
  {
    id: 4,
    title: "Docker Compose for Local Dev Bliss",
    date: "2025-08-07",
    imageUrl: "https://via.placeholder.com/300x200?text=Docker",
    summary: "Simplify your environment setup with Docker Compose and shared volumes."
  },
  {
    id: 5,
    title: "PostgreSQL Tips for Blog Apps",
    date: "2025-08-09",
    imageUrl: "https://via.placeholder.com/300x200?text=PostgreSQL",
    summary: "Indexing, seeding, and schema design for performant blog backends."
  },
  {
    id: 6,
    title: "Responsive Navbars with Tailwind",
    date: "2025-08-11",
    imageUrl: "https://via.placeholder.com/300x200?text=Navbar",
    summary: "Build a clean, accessible navbar that adapts to any screen size."
  },
  {
    id: 7,
    title: "Android + Go: A Match Made in API Heaven",
    date: "2025-08-13",
    imageUrl: "https://via.placeholder.com/300x200?text=Android",
    summary: "How to connect your Android frontend to a Go-powered backend."
  },
  {
    id: 8,
    title: "Figma to Angular: Pixel-Perfect Translation",
    date: "2025-08-15",
    imageUrl: "https://via.placeholder.com/300x200?text=Figma",
    summary: "Tips for converting design specs into clean Angular components."
  }
];

