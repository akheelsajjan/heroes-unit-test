import { ComponentFixture, TestBed } from "@angular/core/testing"
import {  NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe('hero component Deep',()=>{
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROS;
 
    beforeEach(()=>{
        HEROS = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 },
        ];   

        mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);

        TestBed.configureTestingModule({
            declarations:[HeroesComponent, HeroComponent],
            providers:[
                {
                    provide:HeroService, useValue:mockHeroService
                }
            ],
            schemas:[NO_ERRORS_SCHEMA]
        })

        fixture = TestBed.createComponent(HeroesComponent);
        mockHeroService.getHeroes.and.returnValue(of(HEROS));
        fixture.detectChanges();
    });

    it('should render each hero as a hero component',()=>{
       const heroComponentDEs =  fixture.debugElement.queryAll(By.directive(HeroComponent))
       expect(heroComponentDEs.length).toEqual(3)
      // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Mr. Nice')

      for(let i = 0; i < heroComponentDEs.length; i++){ 
        expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROS[i])
      }
    });

    it(`should call heroService.deleteHero when the 
        Hero Components delete button is clicked`,()=>{
            spyOn(fixture.componentInstance,'delete');

            const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))
            
            heroComponents[0].query(By.css('button'))
            .triggerEventHandler('click',{ stopPropagation: ()=>{}});

            expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[0]);

     })

     
    it(`should call heroService.deleteHero when the 
    Hero Components delete button is clicked 2`,()=>{
        spyOn(fixture.componentInstance,'delete');

        const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))
        
        //heroComponents[0].componentInstance.delete.emit(undefined)
        heroComponents[0].triggerEventHandler('delete',null)
        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROS[0]);

     })

    //  it('should have the correct route for first hero', ()=>{
    //     mockHeroService.getHero.and.returnValue(of(HEROS));
    //     fixture.detectChanges();
    //     const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

    //     const routerLink = heroComponents[0]
    //     .query(By.directive(RouterLinkDirectiveStub))
    //     .triggerEventHandler
     
    //     heroComponents[0].query(By.css('a')).triggerEventHandler('click',null);
      
    //  })


})