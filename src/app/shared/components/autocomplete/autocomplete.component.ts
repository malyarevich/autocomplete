import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnChanges, OnInit {
  @Input() options: string[] = [];
  @Output() searchEvent = new EventEmitter<string>();
  @Output() selectedEvent = new EventEmitter<string>();

  searchControl = new FormControl();
  bulbedValue = "";
  filteredOptions: Observable<string[]> | undefined;
  $optionsUpdated: Subject<string> = new Subject();
  $isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  $hasResults: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  ngOnInit(): void {
    this.filteredOptions = merge(this.$optionsUpdated, this.searchControl.valueChanges)
      .pipe(
        startWith(''),
        map(value => {
          const filtered = this._filter(value);
          (filtered.length < 10) && this._bulbEvent(value);
          return filtered
        })
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && !changes.options.isFirstChange()) {
      this.$optionsUpdated.next(this.searchControl.value);
      this.$isLoading.next(false);
      this.$hasResults.next(!!(changes.options.currentValue?.length > 0));
    }
  }

  selectItem(value: string): void {
    this.selectedEvent.emit(value)
  }


  private _bulbEvent( value: string): void {
    if (value.length > 2 && this.bulbedValue !== value) {
      this.searchEvent.emit(value)
      this.bulbedValue = value;
      this.$isLoading.next(true);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    // only for data which will has value inside string 
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
