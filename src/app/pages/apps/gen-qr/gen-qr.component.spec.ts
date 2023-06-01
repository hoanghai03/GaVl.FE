import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenQrComponent } from './gen-qr.component';

describe('GenQrComponent', () => {
  let component: GenQrComponent;
  let fixture: ComponentFixture<GenQrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenQrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
