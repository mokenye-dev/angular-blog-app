
import { Component } from '@angular/core';
import { BlogPost,Api } from '../services/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-card',
  standalone:true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss'
})
export class PostCard {
  imagePreview: string | null = null;
imageError: string | null = null;
   blogForm: FormGroup;
  constructor(private fb:FormBuilder,private apiService:Api){
       this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      date: ['', Validators.required],
      slug: ['', Validators.required],
      image: [null, Validators.required],
      content: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  saveBlogPost(){
    console.log("Yes button is clicked");
    //  if (this.blogForm.valid) {
    const formValue = this.blogForm.value;

    const blogData: BlogPost = {
      title: formValue.title,
      date: formValue.date,
      slug: formValue.slug,
      image: formValue.image instanceof FileList ? formValue.image[0] : null,
      content: formValue.content
    };
    console.log("reed");
    this.apiService.createBlog(blogData).subscribe({
      next: () => {
        console.log('Blog post created successfully');
       // this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error creating blog post:', err);
      }
    });
/*  } else {
    this.blogForm.markAllAsTouched();
    console.log("form not complete")
  }
    */
  }
    onFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    this.imageError = 'Please upload a valid image file.';
    this.imagePreview = null;
    return;
  }

  // Validate file size (e.g., max 2MB)
  const maxSize = 20 * 1024 * 1024;
  if (file.size > maxSize) {
    this.imageError = 'Image size should not exceed 20MB.';
    this.imagePreview = null;
    return;
  }

  this.imageError = null;
  this.blogForm.patchValue({ image: file });

  // Generate preview
  const reader = new FileReader();
  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);


   // const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.blogForm.patchValue({ image: input.files[0] });
    }
  }
}
