import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserDto } from './models/user';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonTitle,
  IonToolbar,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonNote,
    IonTitle,
    IonToolbar,
    ReactiveFormsModule,
    IonIcon],
})
export class HomePage {

  showPassword: boolean= false;
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; 
  }
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  profileForm: FormGroup = this.formBuilder.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
  });
  
  get isFullNameRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('fullname');
    return control ? control.invalid && control.touched : false;
  }

  get isEmailRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('email');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isEmailValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('email');
    return control ? control.hasError('email') && control.touched : false;
  }

  get isPasswordRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('password');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isPasswordValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('password');
    return control ? control.hasError('pattern') && control.touched : false;
  }

  get isAddressRequired(): boolean {
    const control: AbstractControl | null = this.profileForm.get('address');
    return control ? control.hasError('required') && control.touched : false;
  }

  get isAddressValid(): boolean {
    const control: AbstractControl | null = this.profileForm.get('address');
    return control ? control.hasError('minlength') && control.touched : false;
  }

  get isFormInvalid(): boolean {
    return this.profileForm.invalid;
  }

  saveProfile(): void {
    if (this.isFormInvalid) return;

    console.log(this.profileForm.value as UserDto);
  }
}
