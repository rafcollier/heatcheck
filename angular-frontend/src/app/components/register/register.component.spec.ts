import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { inject, tick, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../material.module';
import { HttpModule } from '@angular/http';
import { ValidateService } from '../../services/validate.service';
import { ApiService } from '../../services/api.service';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      imports: [
                  FormsModule, 
                  MaterialModule, 
                  HttpModule,
                  RouterModule,
                  RouterTestingModule
                ],
      providers: [ValidateService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should have a defined component', async(() => {
    expect(component).toBeDefined();
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('test component name', async(() => {
    expect(component.componentName).toEqual('Register');
  })); 

  it('component name should be in a h2 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Register');
  }));

});