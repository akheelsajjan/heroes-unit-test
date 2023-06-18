import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing"
import { HeroDetailComponent } from "./hero-detail.component"
import { HeroService } from "../hero.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe('heroDetail Component',()=>{
    let fixture: ComponentFixture<HeroDetailComponent>
    let mockActivatedRoute, mockHeroService, mockLocation;
    beforeEach(()=>{

        mockHeroService = jasmine.createSpyObj(['getHero','updateHero'])
        mockLocation = jasmine.createSpyObj(['back'])
        mockActivatedRoute = {snapshot:{paramMap:{ get:()=>{return '3'}}}
        }
        TestBed.configureTestingModule({
            declarations:[HeroDetailComponent],
            providers:[
                {
                    provide:HeroService, useValue:mockHeroService
                },
                {
                    provide:ActivatedRoute, useValue:mockActivatedRoute
                },
                {
                    provide:Location, useValue:mockLocation
                },
                FormsModule
            ]
        })
        fixture = TestBed.createComponent(HeroDetailComponent);
        mockHeroService.getHero.and.returnValue(of({
            id:3,
            name:'Akheel',
            strength:100
        }))
        fixture.detectChanges()
    })

    it('should render hero name in h2 tag',()=>{
        
        expect(fixture.nativeElement.querySelector('h2').textContent).toContain('AKHEEL')
    });

    it('should call updateHero with debounce', fakeAsync(() => {
        const mockHero = {
          id: 3,
          name: 'Akheel',
          strength: 100,
        };
        const debounceTimeValue = 300;
    
        mockHeroService.updateHero.and.returnValue(of(mockHero));
    
        fixture.componentInstance.hero = mockHero;
        fixture.componentInstance.save();
    
        // Advance the fake timer by the debounce time
        tick(debounceTimeValue);
    
        expect(mockHeroService.updateHero).toHaveBeenCalledWith(mockHero);
        expect(mockLocation.back).toHaveBeenCalled();
      }));
})