import { Component, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';
import {
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function imagesValidator(control: FormControl): {[s: string]: boolean}{
  const input = document.querySelector('input[type="file"]');
  if (input instanceof HTMLInputElement && input.files) {
    const files = input.files;
    if (files.length < 5) {
    return {'fileCount': true};
  }
  }
  return {};
}

@Component({
  selector: 'app-userprofile',

  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class UserprofileComponent {
  //global variables ---------------------------------------------------------------------------------
  post_id!: number;
  title!: any;
  description!: any;
  price!: any;
  discount: any=0;
  location!: any;
  category!:any;
  user_id: any = 1;
  allPosts!: any;
  flag: boolean = true;
  form!:FormGroup;

  constructor(
    config: NgbModalConfig,
    private post: PostsService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.post.getAllPosts().subscribe((res: any) => {
      (this.allPosts = res), console.log(res);
    });
//create validation for form----..........................
    this.form= this.fb.group({
      title:new FormControl(null,[Validators.required,Validators.minLength(30)]),
      description:new FormControl(null,[Validators.required,Validators.minLength(50)]),
      price:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.pattern(/^\d+$/)]),
      discount:new FormControl(null,[Validators.required,Validators.pattern(/^\d+$/)]),
      location:new FormControl(null,[Validators.required]),
      category:new FormControl(null,[Validators.required]),
      images:new FormControl(null,[Validators.required,imagesValidator])
    });
//make all input fields touched to show errors after the form load
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  }


  //open create post form-----------------------------------------------------------------------------
  open(content: any) {
    this.title = null;
    this.description = null;
    this.price = null;
    this.discount = 0;
    this.location = null;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  //open Update post form-----------------------------------------------------------------------------
  openUpdate(
    content: any,
    id: any,
    t: any,
    d: any,
    p: number,
    dis: number,
    l: any
  ) {
    this.flag = false;
    this.post_id = id;
    this.title = t;
    this.description = d;
    this.price = p;
    this.discount = dis;
    this.location = l;
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  //create new post-----------------------------------------------------------------------------------
  create() {
    const formData = new FormData();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i], files[i].name);
      }
    }
    formData.set('user_id', this.user_id);
    formData.set('title', this.title);
    formData.set('description', this.description);
    formData.set('price', this.price);
    formData.set('discount', this.discount);
    formData.set('location', this.location);
    this.post.createPost(formData).subscribe(
      (res) => {
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your post has been created.',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        }
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          }),
            console.error(err);
      }
    );
  }

  //update post---------------------------------------------------------------------------------------
  update() {
    const formData = new FormData();
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      for (let i = 0; i < files.length; i++) {
        formData.append('images[]', files[i], files[i].name);
      }
    }
    formData.set('_method', 'PUT');
    formData.set('title', this.title);
    formData.set('description', this.description);
    formData.set('price', this.price);
    formData.set('discount', this.discount);
    formData.set('location', this.location);

    this.post.updatePost(this.post_id, formData).subscribe(
      (res) => {
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your post has been updated.',
            showConfirmButton: false,
            timer: 3000,
          }).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 0);
          });
        }
      },
      (err) => {
        if (err)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
          }),
            console.error(err);
      }
    );
  }

  //delete post---------------------------------------------------------------------------------------
  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#0d6efd',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.post.deletePost(id).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your post has been deleted.',
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 0);
            });
          },
          (err) => {
            if (err)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err.error.message,
              }),
                console.error(err);
          }
        );
      }
    });
  }
}
