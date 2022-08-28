import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    private changeLangDir = new Subject();
    public changeLangDir$: Observable<{}> = this.changeLangDir.asObservable();

    constructor(
    ) { }

    getRequestParams(page, pageSize, sortBy): any {
        let params = {};

        if (page) {
            params[`page`] = page - 1;
        }

        if (pageSize) {
            params[`size`] = pageSize;
        }

        if (sortBy) {
            params[`sortBy`] = sortBy;
        }

        return params;
    }

}
