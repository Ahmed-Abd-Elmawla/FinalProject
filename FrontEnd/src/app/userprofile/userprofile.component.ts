import { Component, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
import { CategoriesService } from '../services/categories.service';
import { UserData } from '../Model/user-data';
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
  discount: any = 0;
  location!: any;
  category!: any;
  allPosts!: any;
  flag = true;
  form!: FormGroup;
  categories!:any;
  category_id!: any;
  stats: [string, string] = ["published", "stopped"];
user!:UserData;
handler:any = null;


  constructor(
    config: NgbModalConfig,
    private post: PostsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private req:CategoriesService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '[]');
    this.post.getPostsByUserId(this.user?.id).subscribe((res: any) => {
      (this.allPosts = res);
    });


    this.req.getAllCategories().subscribe((res: any) => {
      (this.categories = res);
    });
    //create validation for form--------------------------------------------------------
    const imagesValidator =
      this.flag == true ? [Validators.required, this.imagesValidatorFn] : [];
    this.form = this.fb.group({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(30),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(50),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^\d+$/),
      ]),
      discount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      location: new FormControl(null, [Validators.required]),
      category:new FormControl(null,[Validators.required,Validators.pattern(/^\S+$/)]),
      images: new FormControl(null, imagesValidator),
    });
    //make all input fields touched to show errors after the form load
    Object.values(this.form.controls).forEach((control) => {
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
    this.category_id="category name";
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
    l: any,
    cat:any,
    stat:string
  ) {
    this.flag = false;
    this.post_id = id;
    this.title = t;
    this.description = d;
    this.price = p;
    this.discount = dis;
    this.location = l;
    this.category_id=cat;

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
    formData.set('user_id', String(this.user?.id));
    formData.set('title', this.title);
    formData.set('description', this.description);
    formData.set('price', this.price);
    formData.set('discount', this.discount);
    formData.set('location', this.location);
    formData.set('category_id', this.category_id);
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

//owner change post state-----------------------------------------------------------------------------
  onSelected(id: any, value: string){
    const formData = new FormData();
    formData.set('_method', 'PUT');
    formData.set('status', value);
    this.post.updatePost(id, formData).subscribe(
      (res) => {
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Status has been updated.',
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
    formData.set('category_id', this.category_id);

    this.post.updatePost(this.post_id, formData).subscribe(
      (res) => {
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

  //custom validator for create images
  imagesValidatorFn(control: AbstractControl): ValidationErrors | null {
    const input = document.querySelector('input[type="file"]');
    if (input instanceof HTMLInputElement && input.files) {
      const files = input.files;
      if (files.length < 5) {
        return { fileCount: true };
      }
    }
    return null;
  }

  //promotion payments------------------------------------------------------------------------------
  pay(amount: any) {

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)

      }
    });

    handler.open({
      name: 'Demo Site',
      amount: amount * 100
    });setTimeout(() => {
      
    }, 15000);

  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MKiaiAKCs7rV1K1osHQXFDoYC6TDT1uEPp6TIcWLFMzKV4dv4geHaOOk7aPgFZkWAzkR02Ecyjhiu5LrGk1mgWO00c3PiUAec',
          locale: 'auto',
          token: function (token: any) {

            console.log(token)
            alert('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }
}
