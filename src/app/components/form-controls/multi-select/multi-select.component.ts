import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-multi-select',
    imports: [],
    templateUrl: './multi-select.component.html',
    styleUrl: './multi-select.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MultiSelectComponent,
        multi: true
    }]
})

export class MultiSelectComponent  implements OnInit, ControlValueAccessor {
    @Input() options: string[] = [];
    @Input() triggerText: string = '';

    panelOpen:boolean = false;

    value: string[] = [];
    onChange = (value: string[]): void => {};
    onTouched = (): void => {};
    disabled: boolean = false;

    constructor () {
    }

    ngOnInit(): void {
    }

    writeValue(obj: string[]): void {
        this.value = this.value = obj;
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
    
    setValue(value: string) {
        if (this.disabled) { return; }

        if (this.value.includes(value)) {
            // remove selection
            const selectedOptionIndex = this.value.indexOf(value);
            this.value.splice(selectedOptionIndex, 1);
        } else {
            // add selection
            this.value.push(value);
        }
    }

}
