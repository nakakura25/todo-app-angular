import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    jasmine.clock().install();
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todo-app-angular'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let span = fixture.nativeElement.querySelector('.header__logo');
    fixture.detectChanges();
    expect(span.textContent).toEqual('Todoアプリ');
    expect(app.title).toEqual('Todoアプリ');

    jasmine.clock().tick(4000)
    fixture.detectChanges();
//     expect(span.textContent).toEqual('Changed Todo アプリ');
//     expect(app.title).toEqual('Changed Todo アプリ');
    expect(span.textContent).toEqual('Todoアプリ');
    expect(app.title).toEqual('Todoアプリ');

  });
});
