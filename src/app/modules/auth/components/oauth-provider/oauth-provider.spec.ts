import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthProvider } from './oauth-provider';

describe('OauthProvider', () => {
  let component: OauthProvider;
  let fixture: ComponentFixture<OauthProvider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OauthProvider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OauthProvider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
