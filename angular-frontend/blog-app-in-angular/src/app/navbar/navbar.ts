import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostCard } from '../post-card/post-card';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(private dialog: MatDialog) {}

openBlogFormModal() {
  this.dialog.open(PostCard, {
    width: '600px',
    disableClose: true
  });

}
handleSearch(){
  console.log("clicked");
}
}
