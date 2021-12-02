import { OrganisationViewModel } from "./organisation.view.model";

export class LicenceViewModel {

    public id: number;

    public organisationId: number;

    public maxCentres: number;

    public cost: number;

    public academicYear: number;

    public paid: boolean;

    public organisation: OrganisationViewModel;
}