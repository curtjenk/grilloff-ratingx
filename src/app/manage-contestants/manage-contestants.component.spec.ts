import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContestantsComponent } from './manage-contestants.component';

describe('ManageContestantsComponent', () => {
  let component: ManageContestantsComponent;
  let fixture: ComponentFixture<ManageContestantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContestantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContestantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
