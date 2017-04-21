import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SidenavTitleService {
    title: string;
    titleSource: Subject<string> = new Subject<string>();

    setTitle(title: string) {
        this.title = title;
        this.titleSource.next(title);
    }
    
    getTtitle(): Observable<string> {
        return this.titleSource.asObservable();
    }
}