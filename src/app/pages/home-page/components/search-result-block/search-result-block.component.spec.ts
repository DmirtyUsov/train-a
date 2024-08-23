import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultBlockComponent } from './search-result-block.component';

describe('SearchResultBlockComponent', () => {
  let component: SearchResultBlockComponent;
  let fixture: ComponentFixture<SearchResultBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchResultBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
