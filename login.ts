import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AlertController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild("username") username;
  @ViewChild("password") password;
  data: string;
  
  constructor(public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public navCtrl: NavController, 
              public navParams: NavParams,
              private http: Http) {
  }

  signIn(){
    // console.log("clicked login button");
    //ตรวจสอบผู้ใช้งานและรหัสผ่าน
    if(this.username.value == ""){
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'คุณยังไม่ได้กรอก username',
        buttons: ['ตกลง']
      });
      alert.present();
    }else if(this.password.value == ""){
      let alert = this.alertCtrl.create({
        title: 'คำเตือน',
        subTitle: 'คุณยังไม่ได้กรอก password',
        buttons: ['ตกลง']
      });
      alert.present();
    }else{
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      let data = {
        username: this.username.value,
        password: this.password.value
      };
      let loader = this.loadingCtrl.create({
        content: 'Processing please wait…',
      });
      loader.present().then(() => {
        this.http.post('http://192.168.1.38/api/login.php',data,options).map(res => res.json()).subscribe(res => {
          console.log(res)
          loader.dismiss()
          if(res=="Your Login success"){
            let alert = this.alertCtrl.create({
              title: 'CONGRATS',
              subTitle:(res),
              buttons: ['OK']
            });
            alert.present();
          }else{
            let alert = this.alertCtrl.create({
              title: 'ERROR',
              subTitle: 'Your Login Username or Password is invalid',
              buttons: ['OK']
            });
            alert.present();
          }
        });
      });
    }
  }

  signUp(){
    this.navCtrl.push(RegisterPage);
  }

}
