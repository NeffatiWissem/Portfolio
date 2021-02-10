import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoUserEditoComponent } from './photo-user-edito.component';

describe('PhotoUserEditoComponent', () => {
  let component: PhotoUserEditoComponent;
  let fixture: ComponentFixture<PhotoUserEditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoUserEditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoUserEditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
