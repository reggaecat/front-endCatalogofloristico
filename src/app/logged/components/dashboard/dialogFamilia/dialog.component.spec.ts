import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFamiliaComponent } from './dialogFamilia.component';

describe('DialogOrdenComponent', () => {
  let component: DialogFamiliaComponent;
  let fixture: ComponentFixture<DialogFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFamiliaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
