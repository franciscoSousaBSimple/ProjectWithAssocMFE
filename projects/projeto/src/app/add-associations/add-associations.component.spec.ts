import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssociationsComponent } from './add-associations.component';

describe('AddAssociationsComponent', () => {
  let component: AddAssociationsComponent;
  let fixture: ComponentFixture<AddAssociationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssociationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
