import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjetosComponent } from './add-projetos.component';

describe('AddProjetosComponent', () => {
  let component: AddProjetosComponent;
  let fixture: ComponentFixture<AddProjetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProjetosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProjetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
