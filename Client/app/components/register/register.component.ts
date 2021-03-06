import { Component } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
    selector: 'register-component',
    template: require('./register.component.html')
})


export class RegisterComponent {

    registerUser: any;
    errorMessage: string;
    successMessage: string;

    constructor(private _authService: AuthenticationService) {
        this.registerUser = {};
    }

    doRegisterUser() {
        this.errorMessage = "";
        this.successMessage = "";

        this._authService
            .RegisterUser(
            this.registerUser.Username,
            this.registerUser.Email,
            this.registerUser.Password,
            this.registerUser.ConfirmPassword
            )
            .subscribe((response: any) => {
                this.successMessage = 'You have been registered. Please login.';
            }, (error) => {

                let errorObject = error._body;
                let parsedErrorObject = JSON.parse(errorObject).ModelState;

                for (var propertyName in parsedErrorObject) {
                    this.errorMessage += parsedErrorObject[propertyName][0];
                }
            });
    }
}