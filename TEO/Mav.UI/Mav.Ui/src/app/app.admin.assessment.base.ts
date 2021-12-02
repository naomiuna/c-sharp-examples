import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from './app.component.base';

export class AppAdminAssessmentBase extends AppComponentBase implements OnInit {

    public error: string;
    public info: string;

    public updateOk = false;
    public actionPending = false;

    constructor(public routeConfig: Router) {
        super(routeConfig);
    }

    ngOnInit() {
    }

}
