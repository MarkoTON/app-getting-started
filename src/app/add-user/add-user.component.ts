import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  id:number = 100;
  profileForm = this.fb.group({
    id: this.id,
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      geo: this.fb.group({
        lat: '',
        lng: '',
      })
    }),
    phone: ['', Validators.required],
    website: ['', Validators.required],
    company: this.fb.group({
      name: ['', Validators.required],
      catchPhrase: ['', Validators.required],
      bs: ['', Validators.required]
    }),
  });

  constructor( private fb: FormBuilder, private service: UsersService, private route: ActivatedRoute) { };

  // Form gurpa da se napravi gde moze vise email adresa da se unese za ovog korisnika, da se doda validacija da korisnik mora da ima barem jednu email adresu.
  // Validacija da je to email da se ne ubaci bilo sta

  ngOnInit(): void {
    console.log('Metallica');
  }

  addProfile():void {
    let newUser = this.profileForm.value;
    console.log(newUser);
    // this.service.addHero(newUser);
  }

}
