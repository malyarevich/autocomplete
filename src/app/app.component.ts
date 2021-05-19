import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';

import { IDoc, INYTimes } from './models/search.model';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'autocomplete';
  $requiredText: Subject<string> = new Subject();
  selectedId: string = "";
  $destroyed: Subject<boolean> = new Subject();
  $options: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  get options(): string[] {
    return this.$options.getValue();
  }

  set options(value: string[]) {
    this.$options.next(value);
  }

  constructor(public searchService: SearchService) { }

  ngOnInit(): void {
    this.$requiredText.pipe(throttleTime(1000, undefined, { trailing: true })).subscribe(value => this._search(value));
  }

  markRequest(value: string) {
    if (value) {
      this.$requiredText.next(value);
    }
  }

  selectItem(id: string) {
    console.log(`id: ${id}`);
    this.selectedId = id;
  }

  private _search(value: string) {
    this.searchService.getResults(value).pipe(takeUntil(this.$destroyed)).subscribe((res: INYTimes) => {
      this.options = res.response.docs.map((elem: IDoc) => elem.snippet);
    });
  }

  ngOnDestroy(): void {
    this.$destroyed.next(true);
  }
}
