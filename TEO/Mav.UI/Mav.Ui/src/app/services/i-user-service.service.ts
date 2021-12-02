import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../models/generic.result.model';
import { InvigilatorViewModel } from '../models/invigilator.view.model';
import { ExamUserViewModel } from '../models/user.exam.view.model';
import { UserSearchModel } from '../models/search/user.search.model';
import { InvigilatorListingModel } from '../models/invigilator.listing.model';
import { Paginate } from '../models/paginated.items';
import { UserListingModel } from '../models/user.listing.model';
import { UserViewModel } from '../models/user.view.model';
import { AddUserViewModel } from '../models/add.user.view.model';
import { AddInvigilatorViewModel } from '../models/add.invigilator.view.model';

export interface IUserServiceService {

  getCurrentUser<T>(): Observable<T>;

  getUser(): Observable<UserViewModel>;

  getUserById<T>(id: string): Observable<T>;

  getExamInvigilatorDetails(id: string): Observable<InvigilatorViewModel>;

  getInvigilatorSearch(filter: UserSearchModel): Observable<Paginate<InvigilatorListingModel>>;

  getOfficerSearch(filter: UserSearchModel): Observable<Paginate<UserListingModel>>;

  getAdminUserSearch(filter: UserSearchModel): Observable<Paginate<UserListingModel>>;

  createUser(user: AddUserViewModel): Observable<GenericResult<string>>;

  createExamOfficer(user: AddInvigilatorViewModel): Observable<GenericResult<string>>;

  updateUser(user: UserViewModel): Observable<GenericResult<string>>;

  updateInvigilator(user: InvigilatorViewModel): Observable<GenericResult<string>>;

  updateProfile(user: ExamUserViewModel): Observable<GenericResult<string>>;

  deleteUser(id: string): Observable<GenericResult<string>>;

}
