import { Observable } from 'rxjs/Observable';
import { AssessmentSectionSearchModel } from '../../models/reporting/assessment.section.search.model';
import { AssessmentSectionReportModel } from '../../models/reporting/assessment.section.report.model';
import { CentreSearchModel } from '../../models/search/centre.search.model';
import { SectionSearchModel } from '../../models/search/section.search.model';
import { SectionReportModel } from '../../models/reporting/section.report.model';
import { CentreReportModel } from '../../models/reporting/centre.report.model';
import { CsvModel } from '../../models/csv.model';
import { AssessmentSearchModel } from '../../models/search/Assessment.search.model';

export interface IReportingService {

    getAssessmentSectionReport(filter: AssessmentSectionSearchModel): Observable<AssessmentSectionReportModel[]>;

    getSectionReport(filter: SectionSearchModel): Observable<SectionReportModel[]>;

    getCentreReport(filter: CentreSearchModel): Observable<CentreReportModel>;

    getCentreReportCsvAll(filter: CentreSearchModel): Observable<CsvModel>;

    getAssessmentReportCsvAll(filter: AssessmentSearchModel): Observable<CsvModel>;

    getAssessmentSectionReportCsvAll(filter: AssessmentSectionSearchModel): Observable<CsvModel>;

    getSectionReportCsvAll(filter: SectionSearchModel): Observable<CsvModel>;
}
