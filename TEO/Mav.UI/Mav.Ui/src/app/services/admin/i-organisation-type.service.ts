import { OrganisationTypeViewModel } from "../../models/admin/organisation-type.view.model";
import { Observable } from "rxjs/Observable";
import { GenericResult } from "../../models/generic.result.model";

export interface IOrganisationTypeService { 
    
    getOrganisationTypeById(id: number): Observable<OrganisationTypeViewModel>;

    getOrganisationTypeList(): Observable<OrganisationTypeViewModel[]>;

    createOrganisationType(type: OrganisationTypeViewModel): Observable<GenericResult<number>>;

    updateOrganisationType(setting: OrganisationTypeViewModel): Observable<GenericResult<number>>;

    deleteOrganisationType(id: number): Observable<GenericResult<number>>;
}