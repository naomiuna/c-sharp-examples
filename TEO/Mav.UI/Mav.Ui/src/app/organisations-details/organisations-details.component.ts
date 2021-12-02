import { Component, OnInit, Input } from '@angular/core';
import { AppComponentBase } from '../app.component.base';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganisationViewModel } from '../models/admin/organisation.view.model';
import { OrganisationService } from '../services/organisation.service';
import { CentreListingModel } from '../models/centre.listing.model';
import { LicenceService } from '../services/licence.service';

@Component({
  selector: 'app-organisations-details',
  templateUrl: './organisations-details.component.html',
  styleUrls: ['./organisations-details.component.css']
})
export class OrganisationsDetailsComponent extends AppComponentBase implements OnInit {

  public id: number;
  public orgModel: OrganisationViewModel = new OrganisationViewModel();
  public licence: boolean;
  public orgType: string;

  public enabled: boolean;
  public disabled: boolean;

  public formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  })
  public cost: string = "";

  constructor(
    public routeConfig: Router,
    private activeRoute: ActivatedRoute,
    private organisationService: OrganisationService,
    private licenceService: LicenceService
  ) {
    super(routeConfig);
  }

  ngOnInit() {
    const routeParams = this.activeRoute.snapshot.params;
    this.id = routeParams.id;

    this.organisationService.getOrganisationById<OrganisationViewModel>(this.id)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.orgModel = r1;
        this.orgType = this.orgModel.organisationType.name;
        if(this.orgModel.licence != null)
        {
          this.licence = true;
          this.cost = this.formatter.format(this.orgModel.licence.cost);
        }
        else
        {
          this.licence = false;
          this.cost = "";
        }
      },
      (e1: Error) => {
        this.onApiError(e1.message);
      }
    )
  }

  goToItem() {
    this.routeConfig.navigate([`admin/organisations-edit/${this.id}`]);
  }

  addLicence() {
    this.routeConfig.navigate([`admin/licence-create/${this.id}`]);
  }

  editLicence() {
    console.log(`Edit licence/${this.orgModel.licence.id}`);
    this.routeConfig.navigate([`admin/licence-edit/${this.orgModel.licence.id}`]);
  }

  enableAccount() {
    console.log(this.id);
    this.licenceService.enableAccount(this.id)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.enabled = true;
        this.disabled = false;
      }
    ),
    (e1: Error) => {
      this.onApiError(e1.message);
    }
  }

  disableAccount() {
    this.licenceService.disableAccount(this.id)
    .subscribe(
      r1 => {
        this.actionPending = false;
        this.disabled = true;
        this.enabled = false;
      }
    ),
    (e1: Error) => {
      this.onApiError(e1.message);
    }
  }

}
