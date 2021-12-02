import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'notdeleted',
})
export class NotDeletedPipe implements PipeTransform {

    transform(objects: any[]): any[] {
        if (objects) {
            return objects.filter(object => {
                return object.deleted !== true;
            });
        }
    }

}
