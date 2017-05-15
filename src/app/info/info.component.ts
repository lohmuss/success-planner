import { Component, OnInit } from '@angular/core';

import { SidenavTitleService } from '../shared/sidenav-title.service'

@Component({
    selector: 'info',
    templateUrl: 'info.component.html',
    styleUrls: ['info.component.css']
})
export class InfoComponent implements OnInit {
    
    constructor(private _sidenavTitleService: SidenavTitleService) {
        this._sidenavTitleService.setTitle("Info");
    }

    ngOnInit() { }
}