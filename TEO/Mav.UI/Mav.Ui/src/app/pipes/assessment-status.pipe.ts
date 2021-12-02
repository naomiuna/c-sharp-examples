import { PipeTransform, Pipe } from '@angular/core';
import { EnumAssessmentStatus } from '../models/assessment.status';

@Pipe({
    name: 'assessmentstatus',
})
export class AssessmentStatusPipe implements PipeTransform {

    transform(statusID: number): string {
        if (statusID === EnumAssessmentStatus.NotStarted.valueOf()) { return 'Not Started'; }
        if (statusID === EnumAssessmentStatus.Started.valueOf()) { return 'Started'; }
        if (statusID === EnumAssessmentStatus.Submitted.valueOf()) { return 'Submitted'; }
        return 'N/A';
    }

}
