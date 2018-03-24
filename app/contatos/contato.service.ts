import { Injectable } from "@angular/core"
import { Http } from '@angular/http'

import 'rxjs/add/operator/toPromise';

import { CONTATOS } from './contatos-mock';
import { Contato } from './contato.model';
@Injectable()
export class ContatoService {

    private contatosUrl: string = 'app/contatos'

    constructor(
        private http: Http
    ){}
    
    getContatos(): Promise<Contato[]> {        
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

    getContato(id: number): Promise<Contato> {
        return this.getContatos()
        .then((contatos: Contato[]) => {
            return contatos.find(contato => contato.id === id);
        });
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
            return this.getContatos()
        });
    }
}