import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-text',
    imports: [],
    templateUrl: './input-text.component.html',
    styleUrl: './input-text.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputTextComponent,
        multi: true
    }]
})
export class InputTextComponent implements OnInit, ControlValueAccessor{
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() id: string = '';

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
}
