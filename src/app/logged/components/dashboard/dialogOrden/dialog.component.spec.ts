import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrdenComponent } from './dialogOrden.component';

describe('DialogOrdenComponent', () => {
  let component: DialogOrdenComponent;
  let fixture: ComponentFixture<DialogOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
