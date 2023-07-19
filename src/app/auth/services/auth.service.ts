import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';

import { AuthResponse } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _user!: User;


  constructor(
    private http: HttpClient
  ) { }

    /** Getters */
    get user() : User {
      console.log( this._user );
      return { ...this._user };    // Evita la manipulacion de this._user
    }


  login( email: string, password: string ) {
    const
      URL = `${ this.baseUrl }/auth/login`,
      body = {
        email, password
      };

    // Retornamos un Observable booleano
    return this.http.post<AuthResponse>( URL, body )      // Retorna un Observable de tipo AuthResponse
      .pipe(
        tap( response => {                                // tap: Se utiliza para realizar efectos secundarios para las notificaciones de la fuente observable
          console.log( response.user );

          // Valida si la propiedad ok es verdadera
          if( response.ok ) {
            // Establecemos el token en el localStorage
            localStorage.setItem( 'token', response.token! );

            // Extrae los valores del usuario que vamos a ocupar
            this._user = {
              _id: response.user?._id!,
              name: response.user?.name!
            };

          }
        }),
        map( response => response.ok ),                   // map: Mutamos la respuesta de todos las propiedades que puedan recibirse solo expondremos la propiedad 'ok'
        catchError( err => of({                           // of: Convierte los argumentos en una secuencia observable.
          ok: false,
          msg: err.error.msg
        }))
      );

  }

  validateToken() {
    const
      token = localStorage.getItem( 'token' ) || '',
      URL = `${ this.baseUrl }/auth/renew`,
      headers = new HttpHeaders().set( 'x-token', token );    // new HttpHeaders().set( 'Authorization', `Bearer ${ token }` );

    return this.http.get<AuthResponse>( URL, { headers })
      .pipe(
        tap( response => {                                // tap: Se utiliza para realizar efectos secundarios para las notificaciones de la fuente observable
          console.log( response.user );

          // Valida si la propiedad ok es verdadera
          if( response.ok ) {
            // Establecemos el token en el localStorage
            localStorage.setItem( 'token', response.token! );

            // Extrae los valores del usuario que vamos a ocupar
            if (response.user) {
              this._user = {
                _id: response.user._id,
                name: response.user.name
              };
            }

          }
        }),
        map( response => response.ok ),                   // map: Mutamos la respuesta de todos las propiedades que puedan recibirse solo expondremos la propiedad 'ok'
        catchError( error => {
          return of( false )
        })
      );
  }

  logout() {
    // Eliminamos todos los valores establecidos en el localStorage
    localStorage.clear();

    // Elimina los valores del usuario
    this._user = {
      _id: '',
      name: ''
    };
  }


}