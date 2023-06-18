import { ComponentFixture, TestBed } from "@angular/core/testing"
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";

describe('hero component',()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROS;

    @Component({
        selector: 'app-hero',
        template: `<div></div>`,
      })
     class FakeHeroComponent {
        @Input() hero: Hero;
    
      }

    beforeEach(()=>{
        HEROS = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 },
        ];   

        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

        TestBed.configureTestingModule({
            declarations:[HeroesComponent,FakeHeroComponent],
            providers:[
                {
                    provide:HeroService, useValue:mockHeroService
                }
            ],
            schemas:[]
        })

        fixture = TestBed.createComponent(HeroesComponent);
    });

    it('should set heroes correctly from the service',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        expect(fixture.componentInstance.heroes.length).toBe(3)
    })

    it('should create on li for each hero',()=>{
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
        expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3)
    })

})