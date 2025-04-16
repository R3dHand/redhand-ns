import { Component, OnInit } from '@angular/core';
import { UserService } from '../../auth/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../../auth/models/user.model';

@Component({
    selector: 'app-admin',
    imports: [],
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
    users: UserModel[] = [];


    constructor (
        private usersService: UserService
    ) {

    }

    ngOnInit(): void {
        this.usersService.get().subscribe({
            next: this.handleResponse.bind(this),
            error: this.handleError.bind(this)
        });
    }

    handleError(error: HttpErrorResponse) {
        var test = '';
    }

    handleResponse(res: UserModel[]) {
        this.users = res
        var test = '';
    }
}
