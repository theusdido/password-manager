import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RodapePage } from './rodape.page';

describe('RodapePage', () => {
  let component: RodapePage;
  let fixture: ComponentFixture<RodapePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RodapePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
