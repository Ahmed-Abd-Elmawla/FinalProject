import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css'],
})
export class AdminCategoriesComponent {
  flag = true;
  form!: FormGroup;
  categories!:any;
  category_name!: any;
  category_id!: number;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private req:CategoriesService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.req.getAllCategories().subscribe((res: any) => {
      (this.categories = res);
    });
    //create validation for form--------------------------------------------------------
    this.form = this.fb.group({
      category: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        Validators.pattern(/^[a-zA-Z]+$/),
      ]),
    });
    //make all input fields touched to show errors after the form load
    Object.values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
  open(content: any) {
    this.category_name = null;
    this.modalService.open(content, { centered: true });
  }

  openUpdate(content: any, name: string,id:number) {
    this.flag = false;
    this.category_name = name;
    this.category_id=id;

    this.modalService.open(content, { centered: true });
  }
  //create new category-----------------------------------------------------------------------------------
  create() {
const data={
  "category_name":this.category_name
}
    this.req.createCategory(data).subscribe(
      (res) => {
        {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your category has been created.',
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

  //update category---------------------------------------------------------------------------------------
  update() {
    const data={
      "category_name":this.category_name
    }
        this.req.updateCategory(this.category_id,data).subscribe(
          (res) => {
            {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your category has been updated.',
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

  //delete category---------------------------------------------------------------------------------------
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
        this.req.deleteCategory(id).subscribe(
          (res) => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your category has been deleted.',
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
