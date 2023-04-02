import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { RouterModule, Routes } from '@angular/router';
import { UsersService } from './service/users.service';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: UserFormComponent },
  { path: 'users/edit/:id', component: UserFormComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];

const PRIME_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputNumberModule,
  ToastModule,
  ConfirmDialogModule,
];

@NgModule({
  declarations: [AppComponent, UserListComponent, UserFormComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...PRIME_MODULE,
  ],
  providers: [MessageService, UsersService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
