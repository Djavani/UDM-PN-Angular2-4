import { Injectable } from "@angular/core"
import { Http, Headers, Response } from '@angular/http'

import { Observable } from "rxjs";
import 'rxjs/add/operator/toPromise';

import { CONTATOS } from './contatos-mock';
import { Contato } from './contato.model';
import { ServiceInterface } from './../interfaces/servicce.interface';
@Injectable()
export class ContatoService implements ServiceInterface<Contato> {
    private contatosUrl: string = 'app/contatos'
    private headers: Headers = new Headers({'Content-Type': 'applicatoin/json'})

    constructor(
        private http: Http
    ){}
    
    findAll(): Promise<Contato[]> {        
        return this.http.get(this.contatosUrl)
        .toPromise()
        .then(response => response.json().data as Contato[])
        .catch(this.handleError);
        //return Promise.resolve(CONTATOS);
    }

    private handleError(err: any): Promise<any> {
        console.log('Error: ', err);
        
        return Promise.reject(err.message || err);
    }

    find(id: number): Promise<Contato> {
        return this.findAll()
        .then((contatos: Contato[]) => {
            return contatos.find(contato => contato.id === id);
        });
    }

    create(contato: Contato): Promise<Contato> {
        return this.http
        .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then((response: Response) => {                  
            return response.json().data as Contato;
        })
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato> {
        const URL = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http
        .put(URL, JSON.stringify(contato), {headers: this.headers})
        .toPromise()
        .then(() => {                  
            return contato as Contato;
        })
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato> {
        const URL = `${this.contatosUrl}/${contato.id}`; // app/contatos/:id
        return this.http
        .delete(URL, {headers: this.headers})
        .toPromise()
        .then(() => {                  
            return contato as Contato;
        })
        .catch(this.handleError);
    }

    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        })
        .then(() => {
            console.log('Primeiro Then');
            return 'Angular curso 2';
        })
        .then((param: string) =>{
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
            return this.findAll()
        });
    }

    search(term: string): Observable<Contato[]> {
       return this.http
        .get(`${this.contatosUrl}/?nome=${term}`) 
        .map((res: Response) => res.json().data as Contato[]);
    }
}