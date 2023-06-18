import { TestBed } from "@angular/core/testing"
import { HeroService } from "./hero.service"
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing"

describe('HeroService',()=>{

    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service

    beforeEach(()=>{
        mockMessageService = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[
                HeroService,
                {
                    provide:MessageService, userValue: mockMessageService
                }
            ]
        })
        httpTestingController = TestBed.inject(HttpTestingController); // utilizing the service
        service = TestBed.inject(HeroService)
    })

    describe('getHero',()=>{
        it('should call get with correct url',()=>{
            //call getHero
            service.getHero(4).subscribe(hero=>{
                expect(hero.id).toBe(4)
            });
            //service.getHero(2).subscribe(); this will pass if we do not use http verify
            
            //test that url was correct
            const req = httpTestingController.expectOne('api/heroes/4')
            req.flush({
                id:4,
                name:'SuperDude',
                strength:100
            })
            expect(req.request.method).toBe('GET')
            httpTestingController.verify()
        })
    })
})