import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectMenuComponent } from './single-select-menu.component';

describe('SingleSelectMenuComponent', () => {
  let component: SingleSelectMenuComponent;
  let fixture: ComponentFixture<SingleSelectMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleSelectMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleSelectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
