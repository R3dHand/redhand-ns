import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-single-select-menu',
  imports: [],
  templateUrl: './single-select-menu.component.html',
  styleUrl: './single-select-menu.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: SingleSelectMenuComponent,
        multi: true
    }]
})
export class SingleSelectMenuComponent implements OnInit, ControlValueAccessor {
    @Input() options: string[] = [];
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() id: string = '';
    panelOpen:boolean = false;
    
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

    setValue(value: string) {
        if (this.disabled) { return; }

        if (value === this.value) {
            this.value = null;
        } else {
            this.value = value;
        }

        this.onChange(this.value);
        this.onTouched();
        this.panelOpen = false;
    }

    togglePanelOpen() {
        this.panelOpen = !this.panelOpen;

        if (this.panelOpen) {
            
        }
    }
}
