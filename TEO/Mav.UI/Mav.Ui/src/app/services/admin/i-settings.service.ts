import { Observable } from 'rxjs/Observable';
import { GenericResult } from '../../models/generic.result.model';
import { SettingViewModel } from '../../models/admin/setting.view.model';

export interface ISettingsService {

    getSettingById(id: number): Observable<SettingViewModel>;

    getSettingByName(name: string): Observable<SettingViewModel>;

    getSettings(): Observable<SettingViewModel[]>;

    updateSetting(setting: SettingViewModel): Observable<GenericResult<number>>;

}
