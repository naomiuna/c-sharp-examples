import { LicenceViewModel } from "./licence.view.model";

export class OrganisationListingModel {
    public id: number;

    public organisationName: string;

    public academicYear: number;

    public status: boolean;

    public paid: boolean;

    public licence: LicenceViewModel;
}