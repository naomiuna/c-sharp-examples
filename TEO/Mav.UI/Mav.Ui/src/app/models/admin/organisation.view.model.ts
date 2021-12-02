import { LicenceViewModel } from "./licence.view.model";
import { OrganisationTypeViewModel } from "./organisation-type.view.model";

export class OrganisationViewModel {
    public id: number;

    public typeID: number;

    public licenceID: number;

    public organisationName: string;

    public addressLine1: string;

    public addressLine2: string;

    public addressLine3: string;

    public mainContactName: string;

    public mainContactEmail: string;

    public leadFinancialName: string;

    public leadFinancialEmail: string;

    public leadFinancialNumber: string;

    public centreLimit: number;

    public licence: LicenceViewModel;

    public organisationType: OrganisationTypeViewModel;
}