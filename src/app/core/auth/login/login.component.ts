import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly routerService: Router
  ) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const user = this.loginForm.get('user')?.value;
    const password = this.loginForm.get('password')?.value;

    if (user === 'admin' && password == 'cuide123') {
      this.authService.login();
      this.routerService.navigate(['management']);
      return;
    }

    alert('Usuário ou senha incorretos');
  }
}
