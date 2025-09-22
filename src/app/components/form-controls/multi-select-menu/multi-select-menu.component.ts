import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-select-menu',
  imports: [],
  templateUrl: './multi-select-menu.component.html',
  styleUrl: './multi-select-menu.component.scss',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MultiSelectMenuComponent,
        multi: true
    }]
})
export class MultiSelectMenuComponent implements OnInit, ControlValueAccessor{
    @Input() options: string[] = [];
    @Input() title: string = '';
    @Input() placeholder: string = '';
    @Input() label: string = '';
    @Input() id: string = '';
    panelOpen:boolean = false;
    
    value: string[] = [];
    onChange = (value: string[]): void => {};
    onTouched = (): void => {};
    disabled: boolean = false;

    // expand direction
    optionsPanelHeight: number = 0;
    @ViewChild('optionsPanelTrigger', { static: true }) optionsPanelTrigger!: ElementRef<HTMLElement>;
    displayPanelAbove: boolean = false;

    constructor() {
    }
    ngOnInit(): void {
        // Set pixel height for the options panel.  Each option has a 48px height
        this.optionsPanelHeight = (this.options.length * 48);
    }

    writeValue(obj: string[]): void {
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

        if (this.value.includes(value)) {
            // remove selection
            const selectedOptionIndex = this.value.indexOf(value);
            this.value.splice(selectedOptionIndex, 1);
        } else {
            // add selection
            this.value.push(value);
        }
        this.onChange(this.value);
        this.onTouched();
    }

    togglePanelOpen() {
        this.panelOpen = !this.panelOpen;

        if (this.panelOpen) {
            const triggerRect = this.optionsPanelTrigger.nativeElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const spaceBelow = viewportHeight - triggerRect.bottom;
            const spaceAbove = triggerRect.top;

            // pick a minimum height your panel needs, e.g. 200px
            this.displayPanelAbove = spaceBelow < this.optionsPanelHeight && spaceAbove > spaceBelow;
        }
    }

}
