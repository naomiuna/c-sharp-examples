import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../../models/generic.result.model';
import { AssessmentRoleViewModel } from '../../models/admin/assessment-role.view.model';

export interface IAssessmentRoleService {    
    getAssessmentRoleList(): Observable<AssessmentRoleViewModel[]>;
}
