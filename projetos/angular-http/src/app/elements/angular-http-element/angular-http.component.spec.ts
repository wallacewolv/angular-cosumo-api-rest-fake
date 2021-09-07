import { TestBed } from '@angular/core/testing';
import { AngularHttpComponent } from './angular-http.component';

describe('AngularHttpComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AngularHttpComponent
      ],
    }).compileComponents();
  });

  it('should create the angular-http', () => {
    const fixture = TestBed.createComponent(AngularHttpComponent);
    const angularHttp = fixture.componentInstance;
    expect(angularHttp).toBeTruthy();
  });

  it(`should have as title 'angular-http'`, () => {
    const fixture = TestBed.createComponent(AngularHttpComponent);
    const angularHttp = fixture.componentInstance;
    expect(angularHttp.title).toEqual('angular-http');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AngularHttpComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('angular-http app is running!');
  });
});
