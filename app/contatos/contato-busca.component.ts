import { Component, OnInit, OnChanges, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ContatoService } from './contato.service';
import { Contato } from './contato.model';
@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [ `
        .cursor-pointer:hover {
            cursor: pointer;
        }
    `]
})
export class ContatoBuscaComponent implements OnInit, OnChanges {
    
    @Input() busca: string;
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();
    
    constructor(
        private contatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.contatos = this.termosDaBusca.asObservable()            
            .debounceTime(500) // aguarde por meio segundos para emitir novos eventos
            .distinctUntilChanged() //ignore se o proximo parametros de busca for igual ao anterior
            .switchMap(term => {                                
                return term ? this.contatoService.search(term) : Observable.of<Contato[]>([])
            }).catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);                
            });
     }

     ngOnChanges(changes: SimpleChanges): void {
        let busca: SimpleChange = changes['busca'];
        this.search(busca.currentValue);        
     }

    search(termo: string): void {        
        this.termosDaBusca.next(termo);
        
    }

    verDetalhe(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
    }
}