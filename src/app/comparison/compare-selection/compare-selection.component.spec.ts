import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSelectionComponent } from './compare-selection.component';

describe('CompareSelectionComponent', () => {
  let component: CompareSelectionComponent;
  let fixture: ComponentFixture<CompareSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
