import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { Location } from '@angular/common';

import { ContatoService } from './contato.service';
import { Contato } from './contato.model';

@Component({
    moduleId: module.id,
    selector: 'contato-detalhe',
    templateUrl: 'contato-detalhe.component.html',
    styles: [`
        .ng-valid[required] {
            border: 3px solid green;
        }
        .ng-invalid:not(form) {
            border: 3px solid red;
        }
    `]
})
export class ContatoDetalheComponent implements OnInit {

    contato: Contato;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        console.log('On init');
        this.contato = new Contato(0, '', '', '');

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id']; // id é o nome do parametro que defini na rota ( path: 'contato/save/:id', )

            if (id) {
                this.contatoService.getContato(id)
                    .then((contato: Contato) => {                    
                        this.contato = contato;
                    });
            }
        })
    }

    teste(): void {
        console.log();

    }
}