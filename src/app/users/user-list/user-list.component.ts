import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsersService } from 'src/app/service/users.service';
import { User } from '../users';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._getUser();
    this._updateTitle('User List');
  }

  _updateTitle(title: string) {
    this.userService.updateTitle(title);
  }

  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete selected User?',
      header: 'Delete User',
      accept: () => {
        //Actual logic to perform a confirmation
        this.userService.deleteUser(id).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User is deleted!',
            });
            this._getUser();
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
            });
            this._getUser();
          }
        );
      },
    });
  }

  editUser(id: string) {
    this.router.navigateByUrl(`users/edit/${id}`);
  }

  _getUser() {
    this.userService.getUserList().subscribe(
      (userList: any) => {
        if (userList && userList.results && userList.results.data)
          this.users = userList.results.data;
        console.log('user list', userList.results.data);
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
