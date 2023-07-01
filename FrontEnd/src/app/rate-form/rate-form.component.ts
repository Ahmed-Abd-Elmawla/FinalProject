import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RateService } from '../rate.service';
@Component({
  selector: 'app-rate-form',
  templateUrl: './rate-form.component.html',
  styleUrls: ['./rate-form.component.css']
})
export class RateFormComponent {
  rateForm!: FormGroup;

  constructor(private fb: FormBuilder, private rateService: RateService) { }

  ngOnInit(): void {
    this.rateForm = this.fb.group({
      rate_value: ['', Validators.required]
    });
  }

  onSubmit() {
    // const rateValue = this.rateForm.get('rate_value').value;
    // const userId = 1; // Replace with the current user's id
    // const ownerId = 2; // Replace with the owner's id
    // this.rateService.createRate(rateValue, userId, ownerId).subscribe(() => {
    //   console.log('Rate created successfully');
    // });
  }
}
