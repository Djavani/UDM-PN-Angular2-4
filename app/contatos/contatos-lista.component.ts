import { Component, OnInit } from '@angular/core';

import { ContatoService } from './contato.service';
import { Contato } from './contato.model';

@Component({
    moduleId: module.id,
    selector: 'contatos-lista',
    templateUrl: 'contatos-lista.component.html'
})
export class ContatosListaComponent implements OnInit{

    contatos: Contato[];
    
    constructor(private contatoService: ContatoService) {

    }

    ngOnInit(): void {
        this.contatos = this.contatoService.getContatos();
    }
}