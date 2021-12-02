import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { Paginate } from '../models/paginated.items';
import { UserAssessmentSectionSearchModel } from '../models/search/user.assessment.section.search.model';
import { UserAssessmentSectionListingModel } from '../models/search/user.assessment.section.listing.model';
import { SubmitUserAssessmentSectionViewModel } from '../models/submit.user.assessment.section.view.model';
import { UpdateUserAssessmentSectionViewModel } from '../models/update.user.assessment.section.view.model';
import { AddUserAssessmentSectionViewModel } from '../models/add.user.assessment.section.view.model';
import { AssessmentSectionTotals } from '../models/assessment.section.totals';
import { AssignQuestionItem } from '../models/assign.question.item';
import { ExamSectionStepViewModel } from '../models/exam-section-step.view.model';
import { UpdateUserSectionStatsViewModel } from '../models/update-user-section-stats.view.model';

export interface IUserAssessmentSectionService {

    getUserAssessmentSectionById<T>(id: number): Observable<T>;

    getUserAssessmentSectionQuestions(id: number): Observable<AssignQuestionItem[]>;

    getUserAssessmentSectionListByUserId(filter: UserAssessmentSectionSearchModel): Observable<Paginate<UserAssessmentSectionListingModel>>;

    getUserAssessmentSectionTotals(id: number): Observable<AssessmentSectionTotals>;

    lookupNextSectionStep(id: number): Observable<ExamSectionStepViewModel>;

    createUserAssessmentSection(newItem: AddUserAssessmentSectionViewModel): Observable<GenericResult<number>>;

    updateUserAssessmentSection(item: UpdateUserAssessmentSectionViewModel): Observable<GenericResult<number>>;

    submitUserAssessmentSection(item: SubmitUserAssessmentSectionViewModel): Observable<GenericResult<number>>;

    restartUserAssessmentSection(id: number): Observable<GenericResult<number>>;

    updateUserSectionStats(userSection: UpdateUserSectionStatsViewModel): Observable<GenericResult<number>>;

}
