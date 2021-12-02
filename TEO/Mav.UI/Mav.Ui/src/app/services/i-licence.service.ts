import { LicenceViewModel } from "../models/admin/licence.view.model";
import { Observable } from "rxjs/Observable";
import { GenericResult } from "../models/generic.result.model";
import { AddLicenceViewModel } from "../models/admin/add-licence.view.model";
import { UpdateLicenceViewModel } from "../models/admin/update-licence.view.model";

export interface ILicenceService {

    getLicenceById(id: number): Observable<LicenceViewModel>;

    getLicenceByOrgId(orgId: number): Observable<LicenceViewModel>;

    createLicence(licence: AddLicenceViewModel): Observable<GenericResult<number>>;

    updateLicence(licence: UpdateLicenceViewModel): Observable<GenericResult<number>>;

    deleteLicence(id: number): Observable<GenericResult<number>>;
}