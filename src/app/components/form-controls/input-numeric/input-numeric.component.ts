import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-numeric',
    imports: [],
    templateUrl: './input-numeric.component.html',
    styleUrl: './input-numeric.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputNumericComponent,
        multi: true
    }]
})

export class InputNumericComponent implements OnInit, ControlValueAccessor {
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() id: string = '';

    value: number|null = null;
    onChange = (value: number | null): void => {};
    onTouched = (): void => {};
    disabled: boolean = false;
    chWidth: string = '';
    
    ngOnInit(): void {
        this.chWidth = `calc(${this.placeholder.length + 2}ch)`;
    }

    writeValue(obj: number|null): void {
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
        this.value = val === '' ? null : Number(val);
        this.onChange(this.value);
    }
}

