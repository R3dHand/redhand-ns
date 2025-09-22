import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectMenuComponent } from './multi-select-menu.component';

describe('MultiSelectMenuComponent', () => {
  let component: MultiSelectMenuComponent;
  let fixture: ComponentFixture<MultiSelectMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiSelectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
