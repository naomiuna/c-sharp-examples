import { PipeTransform, Pipe } from '@angular/core';
import { EnumAssessmentSectionStatus } from '../models/assessment-section.status';

@Pipe({
    name: 'assessmentsectionstatus',
})
export class AssessmentSectionStatusPipe implements PipeTransform {

    transform(statusID: number): any {
        if (statusID === EnumAssessmentSectionStatus.NotStarted.valueOf()) { return 'Not Started'; }
        if (statusID === EnumAssessmentSectionStatus.Started.valueOf()) { return 'Started'; }
        if (statusID === EnumAssessmentSectionStatus.Passed.valueOf()) { return 'Completed'; }
        if (statusID === EnumAssessmentSectionStatus.TopScore.valueOf()) { return 'Completed'; }
        if (statusID === EnumAssessmentSectionStatus.AttemptsExceeded.valueOf()) { return 'Attempts Exceeded'; }
        if (statusID === EnumAssessmentSectionStatus.TimerReached.valueOf()) { return 'Timer Reached'; }
        return 'N/A';
    }

}
