import { Component, model } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  user= model<User>()
}
