import { ComponentFixture, TestBed } from "@angular/core/testing"
import { HeroComponent } from "./hero.component"
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('hero component',()=>{
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            declarations:[HeroComponent],
            schemas:[NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(HeroComponent)
    })

    it('should have correct hero',()=>{
        fixture.componentInstance.hero ={ id: 13, name: 'Bombasto', strength: 8 }
        expect(fixture.componentInstance.hero.name).toEqual('Bombasto')
    })

    it('should render correct hero name in anchor tag',()=>{
        fixture.componentInstance.hero = { id: 13, name: 'Bombasto', strength: 8 }
        fixture.detectChanges();
        let deA = fixture.debugElement.query(By.css('a'))
        expect(deA.nativeElement.textContent).toContain('Bombasto')
        expect(fixture.nativeElement.querySelector('a').textContent).toContain('Bombasto')
    })
})