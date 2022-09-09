import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvStatusPaidPartiallyComponent } from './inv-status-paid-partially.component';

describe('InvStatusPaidPartiallyComponent', () => {
  let component: InvStatusPaidPartiallyComponent;
  let fixture: ComponentFixture<InvStatusPaidPartiallyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvStatusPaidPartiallyComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvStatusPaidPartiallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
