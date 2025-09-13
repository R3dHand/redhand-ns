import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-single-select',
    imports: [],
    templateUrl: './single-select.component.html',
    styleUrl: './single-select.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SingleSelectComponent,
        multi: true
    }]
})
export class SingleSelectComponent implements OnInit, ControlValueAccessor  {

    @Input() options: string[] = [];
    @Input() triggerText: string = '';
    triggerName: string = '';
    panelOpen:boolean = false;
    
    value: string|null = null;
    onChange = (value: string | null): void => {};
    onTouched = (): void => {};
    disabled: boolean = false;

    constructor() {
    }
    
    ngOnInit(): void {
        this.triggerName = this.triggerText;
        const noneIndex = this.options.indexOf('');
        if (noneIndex !== -1) {
            this.options[noneIndex] = 'none';
        }
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

    setValue(value: string) {
        if (this.disabled) { return; }

        const optionValue:string|null = value === 'none' ? null : value;
        this.value = optionValue;

        if (optionValue !== null) {
            this.triggerText = optionValue;
        } else {
            this.triggerText = this.triggerName;
        }

        this.onChange(this.value);
        this.onTouched();
        this.panelOpen = false;
    }

    close() {
        this.panelOpen = false;
    }
}
