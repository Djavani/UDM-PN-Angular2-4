import { Injectable } from "@angular/core"

import { CONTATOS } from './contatos-mock';
import { Contato } from './contato.model';
@Injectable()
export class ContatoService {

    getContatos() : Promise<Contato[]> {
        return Promise.resolve(CONTATOS);
    }
}