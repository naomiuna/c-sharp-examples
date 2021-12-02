import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '../app.component.base';
import { CertificateService } from '../services/certificate.service';
import { CertificateViewModel } from '../models/certificate.view.model';
import { UserServiceService } from "../services/user-service.service";
import { UserViewModel } from '../models/user.view.model';

declare function certificatePageLayout(): any;
declare function resetPageLayout(): any;
declare var xepOnline: any;

@Component({
  selector: 'app-user-assessment-history-certificate',
  templateUrl: './user-assessment-history-certificate.component.html',
  styleUrls: ['./user-assessment-history-certificate.component.css']
})
export class UserAssessmentHistoryCertificateComponent extends AppComponentBase implements OnInit {

  public id: number; // UserAssessmentID

  public key: string; // KeyID

  public screenID = 1;
  public switchScreenButtonText = 'View Assessment Section Details';

  public certificateModel: CertificateViewModel = new CertificateViewModel();
  public userType : string;

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private userService : UserServiceService,
    private certificateService: CertificateService
  ) {
    super(routeConfig);

    certificatePageLayout();
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;
    this.key = routeParams.key;
    this.actionPending = true;
    this.certificateService.getCertificate(this.id, this.key)
    .subscribe(
      r1 => {
        console.log("cert",r1);
        this.certificateModel = r1;
        this.actionPending = false;
        this.userService.getUserById<UserViewModel>(this.certificateModel.userID)
        .subscribe(
          r2 => {
            console.log("user",r2);
            this.userType = r2.role;
          },
          (e2: Error) => {
            this.onApiError(e2.message);
          }
        );
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    );    
  }

  public downloadPDF() {
    alert("Hello");
    return xepOnline.Formatter.Format('certificate', {render: 'download'});
  }

  public switchScreen(): void {
    if (this.screenID === 1) {
      this.screenID = 2;
      this.switchScreenButtonText = 'View Assessment Certificate';
    } else if (this.screenID === 2) {
      this.screenID = 1;
      this.switchScreenButtonText = 'View Assessment Section Details';
    }
  }

  public goToDashboard(): void {
    resetPageLayout();
    this.routeConfig.navigate(['']);
  }

  public goToInvigilators(): void {
    resetPageLayout();
    this.routeConfig.navigate(['invigilators']);
  }

  public goToInvigilatorDetails(): void {
    resetPageLayout();
    this.routeConfig.navigate([`/invigilator-details/${this.certificateModel.userID}`]);
  }
  

}
