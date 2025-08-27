import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostCard } from '../post-card/post-card';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [FormsModule,NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
 searchTerm:string= '';
 isMobileMenuOpen = false;
   @Output() search = new EventEmitter<string>();
  constructor(private dialog: MatDialog,private router: Router) {}

openBlogFormModal() {
  this.dialog.open(PostCard, {
    width: '600px',
    disableClose: true
  });

}
handleSearch(){
  console.log("clicked"+" and search term is "+this.searchTerm);
   this.router.navigate(['/search-results'], {
    queryParams: { query: this.searchTerm }
  });
}
 triggerSearch() {
    const query = this.searchTerm.trim();
    if (query) {
      this.router.navigate(['/search-results'], {
        queryParams: { query }
      });
    }
  }
  onSearchChange() {
    this.search.emit(this.searchTerm);
  }
  toggleMenu(){
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

}
