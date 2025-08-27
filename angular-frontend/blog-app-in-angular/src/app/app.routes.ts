import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Post } from './post/post';
import { Navbar } from './navbar/navbar';
import { PostCard } from './post-card/post-card';
import { SearchPage } from './search-page/search-page';

export const routes: Routes = [
    {path:'',component:Home},
    {path:'post/:slug',component:Post},
    {path:'navbar',component:Navbar},
    {path:'create-post',component:PostCard},
    {path:'search-results',component:SearchPage},
    
];
