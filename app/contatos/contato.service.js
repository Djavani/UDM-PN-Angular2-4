"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
let ContatoService = class ContatoService {
    constructor(http) {
        this.http = http;
        this.contatosUrl = 'app/contatos';
        this.headers = new http_1.Headers({ 'Content-Type': 'applicatoin/json' });
    }
    findAll() {
        return this.http.get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
        //return Promise.resolve(CONTATOS);
    }
    handleError(err) {
        console.log('Error: ', err);
        return Promise.reject(err.message || err);
    }
    find(id) {
        return this.findAll()
            .then((contatos) => {
            return contatos.find(contato => contato.id === id);
        });
    }
    create(contato) {
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then((response) => {
            return response.json().data;
        })
            .catch(this.handleError);
    }
    update(contato) {
        const URL = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http
            .put(URL, JSON.stringify(contato), { headers: this.headers })
            .toPromise()
            .then(() => {
            return contato;
        })
            .catch(this.handleError);
    }
    delete(contato) {
        const URL = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http
            .delete(URL, { headers: this.headers })
            .toPromise()
            .then(() => {
            return contato;
        })
            .catch(this.handleError);
    }
    getContatosSlowly() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
            .then(() => {
            console.log('Primeiro Then');
            return 'Angular curso 2';
        })
            .then((param) => {
            console.log('Segudo Then');
            console.log(param);
            return new Promise((resolve2, reject2) => {
                setTimeout(() => {
                    console.log('Continuando depois de 5 segundos....');
                    resolve2();
                }, 5000);
            });
        })
            .then(() => {
            console.log('Terceiro Then');
            return this.findAll();
        });
    }
    search(term) {
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res) => res.json().data);
    }
};
ContatoService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map