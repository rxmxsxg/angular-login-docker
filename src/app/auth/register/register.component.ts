import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../../validators/password-match.validator';
import { AuthService } from '../auth.service';
import { RegisterForm } from '../../models/register-form.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registerForm = this.fb.nonNullable.group(
    {
      username: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmpassword: this.fb.control<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: passwordMatchValidator }
  );

  get passwordMismatch() {
    return (
      this.registerForm.errors?.['passwordMismatch'] &&
      this.registerForm.touched
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData: RegisterForm = this.registerForm.getRawValue();
      this.authService.register(formData).subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        },
      });
      this.router.navigate(['/login']);
    }
  }
}
