"use strict";
class InMemoryDataService {
    createDb() {
        let contatos = [
            { id: 1, nome: 'Fulano de Tal', email: 'fulano@gmail.com', telefone: '(00) 0000-0000' },
            { id: 2, nome: 'Chico Tuita', email: 'ctuita@gmail.com', telefone: '(00) 0000-0000' },
            { id: 3, nome: 'José Gerardo', email: 'gerardim@gmail.com', telefone: '(00) 0000-0000' },
            { id: 4, nome: 'Seu Madruga', email: 'madruga@gmail.com', telefone: '(00) 0000-0000' },
            { id: 5, nome: 'Bob Esponja', email: 'bob@gmail.com', telefone: '(00) 0000-0000' },
        ];
        return { contatos };
    }
}
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map