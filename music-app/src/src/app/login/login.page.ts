import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccountService } from '../service/account.service';
import { Account } from '../model/Account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  email = '';
  password = '';
  loginForm!: FormGroup;

  account: Account = new Account('suppersun1177@gmail.com', '1', 100000);

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private router: Router) {
    this.accountService.addAccount(this.account.id, this.account);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
   
    
    // so sánh email và mật khẩu nhập vào với tài khoản thử nghiệm
    if (this.accountService.Login(this.email,this.password)) {
      // đăng nhập thành công
      // chuyển đến trang home
      localStorage.setItem(this.account.id,this.account.id);
      localStorage.setItem('balance',this.account.balance.toString());
      this.router.navigate(['/playlist']);
    } else {
      // đăng nhập thất bại
      // hiển thị thông báo lỗi
      this.alert('Thông tin đăng nhập không chính xác');
    }
  }
 
  alert(message: string) {
    // hiển thị thông báo lỗi
    alert(message);
  }

}