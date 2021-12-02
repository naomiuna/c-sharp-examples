import { Observable } from "rxjs/Observable";
import { OrganisationViewModel } from "../models/admin/organisation.view.model";
import { OrganisationSearchModel } from "../models/search/organisation.search.model";
import { OrganisationListingModel } from "../models/admin/organisation.listing.model";
import { Paginate } from "../models/paginated.items";
import { AddOrganisationViewModel } from "../models/admin/add-organisation.view.model";
import { UpdateOrganisationViewModel } from "../models/admin/update-organisation.view.model";
import { GenericResult } from "../models/generic.result.model";

export interface IOrganisationService {

    getOrganisationById(id: number): Observable<OrganisationViewModel>;

    getAllOrganisations(filter: OrganisationSearchModel): Observable<Paginate<OrganisationListingModel>>;

    createOrganisation(org: AddOrganisationViewModel): Observable<GenericResult<number>>;

    updateOrganisation(org: UpdateOrganisationViewModel): Observable<GenericResult<number>>;

    deleteOrganisation(id: number): Observable<GenericResult<number>>;
}