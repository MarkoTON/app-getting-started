import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { IUser } from '../services/Users';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id!: number | undefined;

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

  ngOnInit(): void {
    console.log(this.route);
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getUsers().subscribe((response:IUser[]) => {
      console.table(response);
      let userID = this.id! - 1 ;
      this.profileForm.patchValue({
        id: this.id,
        name: response[userID].name,
        username: response[userID].username,
        email: response[userID].email,
        address: {
          street: response[userID].address.street,
          suite: response[userID].address.suite,
          city: response[userID].address.city,
          zipcode: response[userID].address.zipcode,
          geo: {
            lat: response[userID].address.geo.lat,
            lng: response[userID].address.geo.lng,
          }
       },
        phone: response[userID].phone,
        website: response[userID].website,
        company: {
          name: response[userID].company.name,
          catchPhrase: response[userID].company.catchPhrase,
          bs: response[userID].company.bs,
        }
      });
    });
  }

  updateProfile():void {
    console.log(this.profileForm);
    let newUser = this.profileForm.value;
    console.log(newUser);

    this.service.update(newUser);
  }

}
