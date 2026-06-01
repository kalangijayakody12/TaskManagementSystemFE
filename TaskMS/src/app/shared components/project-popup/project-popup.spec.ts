import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPopup } from './project-popup';

describe('ProjectPopup', () => {
  let component: ProjectPopup;
  let fixture: ComponentFixture<ProjectPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPopup],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
