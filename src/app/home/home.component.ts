import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IUser } from '../services/Users';

// Decorator
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: IUser[] = [];
  private _listUser: string = '';
  filteredUsers: IUser[] = [];
  order = false;

  get listUser(): string {
    return this._listUser;
  }

  set listUser(value: string) {
    this._listUser = value;
    this.filteredUsers = this.performFilter(value);
  }


  constructor(private service: UsersService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    // Setter
    this.service.getUsers().subscribe((response: IUser[]) => {
      this.users = response;
      this.listUser = '';
    });
  }

  performFilter(filterBy:string):IUser[] {
    filterBy = filterBy.toLowerCase();
    return this.users.filter((user: IUser)=> {
      return user.name.toLowerCase().includes(filterBy);
    })
  }

  sortById(): void{
    this.order = !this.order;
    this.filteredUsers = this.filteredUsers.sort((a,b): number => {
        if ( a.id < b.id ){
          return this.order ? -1 : 1;
        }
        if ( a.id > b.id ){
          return this.order ? 1 : -1;
        }
      return 0;
    });
  }
  sortByName(): void{
    this.order = !this.order;
    this.filteredUsers = this.filteredUsers.sort((a,b): number => {
        if ( a.name < b.name ){
          return this.order ? -1 : 1;
        }
        if ( a.name > b.name ){
          return this.order ? 1 : -1;
        }
      return 0;
    });
  }
  sortByUsername(): void{
    this.order = !this.order;
    this.filteredUsers = this.filteredUsers.sort((a,b): number => {
        if ( a.username < b.username ){
          return this.order ? -1 : 1;
        }
        if ( a.username > b.username ){
          return this.order ? 1 : -1;
        }
      return 0;
    });
  }

  sortByEmail(): void{
    this.order = !this.order;
    this.filteredUsers = this.filteredUsers.sort((a,b): number => {
        if ( a.email < b.email ){
          return this.order ? -1 : 1;
        }
        if ( a.email > b.email ){
          return this.order ? 1 : -1;
        }
      return 0;
    });
  }
  sortByPhone(): void{
    this.order = !this.order;
    this.filteredUsers = this.filteredUsers.sort((a,b): number => {
        if ( a.phone < b.phone ){
          return this.order ? -1 : 1;
        }
        if ( a.phone > b.phone ){
          return this.order ? 1 : -1;
        }
      return 0;
    });
  }

  deleteUser(id:number){
    this.service.deliteUser(String(id)).subscribe(()=> this.filteredUsers = this.filteredUsers.filter(item => item.id !== id));
  }

  openAbout(id: number): void {
    this.router.navigate(['/about',id ]);
  }

}
