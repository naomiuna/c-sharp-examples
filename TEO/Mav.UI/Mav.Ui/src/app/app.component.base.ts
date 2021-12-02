import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export class AppComponentBase implements OnInit {

    public displaySuccessMessage: boolean;
    public successMessage: string;

    public error: string;
    public info: string;

    public updateOk = false;
    public actionPending = false;

    constructor(public routeConfig: Router) { }

    ngOnInit() {
    }

    public goToComponent(path: string): void {
        this.routeConfig.navigate([path]);
    }

    public refreshScreenSkipLocation(uri) {
        this.routeConfig.navigateByUrl('/', {skipLocationChange: true}).then(() =>
        this.routeConfig.navigate([uri]));
    }

    public resetForm(): void {
        this.error = '';
        this.info = '';
        this.updateOk = false;
        this.actionPending = false;
    }

    public onApiError(error: string) {
        if (error === null) {
            this.error = 'An unexpected error has occurred. Please try again.';
        } else {
            this.error = error;
        }
    }

    public displayUserMessages(messages: string[], all?: boolean): string {
        let messageStr = '';
        if (all) {
            messages.forEach(e => {
                messageStr += messageStr.length > 0 ? `<br />${e}` : e;
            });
        } else {
            messageStr += messages.length > 0 ? messages[0] : '';
        }
        return messageStr;
    }

    public handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        // return throwError('Something bad happened; please try again later.');
        return ErrorObservable.create('An unexpected error has occurred. Please try again.');
    }
}
