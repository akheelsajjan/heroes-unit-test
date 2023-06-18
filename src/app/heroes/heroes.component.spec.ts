import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component"

describe('HeroesComponent',()=>{
    let component: HeroesComponent;
    let HEROS;
    let mockHeroService;

    beforeEach(()=>{
        HEROS = [
            { id: 11, name: 'Mr. Nice', strength: 10 },
            { id: 12, name: 'Narco', strength: 5 },
            { id: 13, name: 'Bombasto', strength: 8 },
        ];        
    })

    mockHeroService = jasmine.createSpyObj(['getHeroes','addHero','deleteHero']);
    component = new HeroesComponent(mockHeroService);

    describe('delete',()=>{
        it('should remove the indicated hero from heroes list',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true)) //since delete hero is subscribe and we do not care what value is in subscribe
            component.heroes = HEROS;

            component.delete( HEROS[2]);

            expect(component.heroes.length).toBe(2)
        })

        it('should call deleteHero ',()=>{
            mockHeroService.deleteHero.and.returnValue(of(true))
            component.heroes = HEROS;

            component.delete( HEROS[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROS[2])
        })
    })
})