import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UserModel } from '../users/models/user.model';


@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy{
    userSubscription: any;
    user: UserModel = new UserModel();

    constructor(
        private authService: AuthService
    ){

    }

    ngOnInit(): void {
        this.authService.user$.subscribe(user => {
            this.user = user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    login() {
        this.authService.login$.next();
    }

    logout() {
        this.authService.logout$.next();
    }
}
