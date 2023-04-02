import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/service/users.service';
import { User } from '../users';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  editMode: boolean = false;
  isSubmited = false;
  currentUserid: string = '';
  form: FormGroup;
  imageDisplay: any;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private userService: UsersService,
    private messageService: MessageService,
    private activeRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._checkEditMode();
  }

  get userForm() {
    return this.form.controls;
  }

  submit() {
    console.log('form data', this.form.value);
    this.isSubmited = true;
    if (this.form.invalid) return;

    const userFormData = new FormData();

    Object.keys(this.userForm).map((key) => {
      console.log(key, this.userForm[key].value);
      userFormData.append(key, this.userForm[key].value);
    });
    console.log('image list before updating', userFormData);
    if (this.editMode) {
      this._updateUser(userFormData);
    } else {
      this.addUser(userFormData);
    }
  }

  private _updateUser(userData: FormData) {
    this.userService.updateUser(userData, this.currentUserid).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User is updated!`,
        });
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated!',
        });
      }
    );
  }

  private addUser(userData: FormData) {
    this.userService.createUser(userData).subscribe(
      (response: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `User is created!`,
        });
        console.log('created successfully');
        setTimeout(() => {
          this.location.back();
        }, 1000);
      },
      (error) => {
        console.log('error', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not created!',
        });
        console.log('got error', error);
      }
    );
  }

  back() {
    this.location.back();
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  updateTitle(title: string) {
    this.userService.updateTitle(title);
  }

  _checkEditMode() {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.updateTitle('Update User');
        this.editMode = true;
        this.currentUserid = params['id'];
        this.userService.getUser(params['id']).subscribe((userData: any) => {
          if (userData && userData.results && userData.results.data) {
            let data = userData.results.data;
            this.userForm['firstName'].setValue(data.firstName);
            this.userForm['lastName'].setValue(data.lastName);
            this.userForm['email'].setValue(data.email);
            this.userForm['phone'].setValue(data.phone);
            this.userForm['image'].setValue(data.image);
            this.imageDisplay = data.image;
            this.userForm['image'].setValidators([]);
            this.userForm['image'].updateValueAndValidity();
          }
        });
      } else {
        this.updateTitle('Create User');
      }
    });
  }
}
