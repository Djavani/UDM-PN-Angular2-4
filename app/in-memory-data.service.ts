import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Contato } from './contatos/contato.model';

export class InMemoryDataService implements InMemoryDbService {
    
    createDb(): {} {
        
        let contatos:  Contato[] = [
            {id: 1, nome: 'Fulano de Tal', email: 'fulano@gmail.com', telefone:'(00) 0000-0000'},
            {id: 2, nome: 'Chico Tuita', email: 'ctuita@gmail.com', telefone:'(00) 0000-0000'},
            {id: 3, nome: 'José Gerardo', email: 'gerardim@gmail.com', telefone:'(00) 0000-0000'},
            {id: 4, nome: 'Seu Madruga', email: 'madruga@gmail.com', telefone:'(00) 0000-0000'},
            {id: 5, nome: 'Bob Esponja', email: 'bob@gmail.com', telefone:'(00) 0000-0000'},
        ];
        return {contatos};
    }
}