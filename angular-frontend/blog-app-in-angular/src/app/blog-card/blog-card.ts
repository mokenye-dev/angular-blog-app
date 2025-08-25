import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-card',
  standalone:true,
  imports: [DatePipe],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss'
})
export class BlogCard {
// blog-card.component.ts
@Input() blog!: {
  title: string;
  date: string;
  imageUrl: string;
  summary: string;
};

}
