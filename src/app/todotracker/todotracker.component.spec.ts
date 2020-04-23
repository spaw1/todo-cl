import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodotrackerComponent } from './todotracker.component';

describe('TodotrackerComponent', () => {
  let component: TodotrackerComponent;
  let fixture: ComponentFixture<TodotrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodotrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodotrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
