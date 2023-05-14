import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { IUser } from './Users';
import { catchError, Observable, tap, throwError } from 'rxjs';

// Istraziti providedIn root
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = 'https://jsonplaceholder.typicode.com/users';

  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

  constructor(private httpClient: HttpClient) { }

  addHero(hero: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.url, hero)
      .pipe(
        // catchError(this.handleError('addHero', hero))
      );
  }

  handleError(arg0: string, hero: IUser[]): (err: any, caught: Observable<import("@angular/common/http").HttpEvent<IUser[]>>) => import("rxjs").ObservableInput<any> {
    throw new Error('Method not implemented.');
  }

  // Get users from JSON Placeholder
  getUsers():Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(this.url);
  }

  updateUser(user:any):void{
    // console.log(user.id)
    //  this.httpClient.post<IUser>("https://jsonplaceholder.typicode.com/users/"+ user.id ,JSON.stringify(user));
    this.httpClient.patch("https://jsonplaceholder.typicode.com/users" + '/' + user.id, JSON.stringify({ isRead: true }))
    .subscribe(response => {
      console.log(response);
    });

    // Ne radi mi PUT
    // this.httpClient.put("https://jsonplaceholder.typicode.com/users" + '/' + user.id, JSON.stringify({ isRead: true }));
  }

  update(user:any): Observable<IUser> {

    return this.httpClient.put<IUser>("https://jsonplaceholder.typicode.com/users/" + user.id, user, this.httpOptions)

    .pipe(

      catchError(this.errorHandler)

    )

  }

  deliteUser(id: string){
    console.log(id);
    // return this.httpClient.delete<IUser>(this.url+'/'+id);
    // const urlA = `${this.url}/${id}`; // DELETE api/heroes/42
    // this.httpClient.delete(urlA);
    // return
    // return this.httpClient.delete(`${this.url}/${id}`, { responseType: 'text' });
    return this.httpClient.delete('https://jsonplaceholder.typicode.com/users/'+ id);
  }
  // getUsers(){
  //   return this.httpClient.get(this.url);
  // }


  errorHandler(error: { error: { message: string; }; }) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = 'Error Code: ${error.status}nMessage: ${error.message}';

    }

    return throwError(errorMessage);

 }
}
