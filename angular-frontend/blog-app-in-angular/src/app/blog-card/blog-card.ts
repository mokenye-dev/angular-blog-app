import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-card',
  standalone:true,
  imports: [DatePipe,RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss'
})
export class BlogCard {
@Input() blog!: {
  id:number
  title: string;
  date: string;
  imageUrl: string;
  content:string
};

}
