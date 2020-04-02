import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorageService} from '../../../user-storage.service';
import {User} from '../User';
import {HttpClientService} from '../../../http-client.service';


@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent  implements OnInit {

  constructor(private userStorage: UserStorageService,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private httpClient: HttpClientService) { }

  user: User = new User();

  ngOnInit(): void {
    this.getUserToEdit();
  }

  saveUser(user: User) {
    this.httpClient.saveUser(user).subscribe( r => {
      this.router.navigate(['/shop/users']);
    });

  }

  getUserToEdit() {
    this.activeRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        // tslint:disable-next-line:radix
        this.httpClient.getUser(Number.parseInt(id)).subscribe(p => this.user = p);
      }
    });
  }
}
