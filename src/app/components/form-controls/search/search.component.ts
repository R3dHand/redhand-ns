import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search',
    imports: [],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SearchComponent,
        multi: true
    }]
})
export class SearchComponent implements OnInit, ControlValueAccessor {
    @Input() hasFilterOptions: boolean = false;
    @Output() keydownEnter = new EventEmitter<string>();
    @Output() toggleSearchFilter = new EventEmitter<void>();

    value: string|null = null;
    onChange = (value: string | null): void => {};
    onTouched = (): void => {};
    disabled: boolean = false;

    ngOnInit(): void {
    }

    writeValue(obj: string|null): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onInput(event: Event): void {
        const val = (event.target as HTMLInputElement).value;
        this.value = val === '' ? null : val;
        this.onChange(this.value);
    }

    search() {
        if (this.value !== null) {
            this.keydownEnter.emit(this.value);
        }
    }

    toggleSearchFilterEvent() {
        this.toggleSearchFilter.emit();
    }
}
