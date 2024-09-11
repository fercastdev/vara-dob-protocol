import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { Observable, of, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { tap } from "rxjs/operators";
import { MetamaskConnectService } from "app/blockchainUtils/metamask-connect.service";

@Injectable()
export class AuthService {
  private user: string;
  private userId: string;
  private userAddress: string;
  private userDetails: firebase.User = null;
  public USE_BACKEND: boolean = false;  

  constructor(
    public _firebaseAuth: AngularFireAuth,
    public router: Router,
    private http: HttpClient,
    private connectService: MetamaskConnectService
  ) {
    this.user = localStorage.getItem("username");
    this.userId = localStorage.getItem("userId");
  }

  getUser() {
    return this.user;
  }

  getUserId() {
    return this.userId;
  }

  signupUser(form: any) {
    if (this.USE_BACKEND){
          return this.http
      .post<{ username: string; token: string }>(
        `${environment.baseUrl}/signup`,
        { userData: form }
      )
      .pipe(
        tap((data) => {
          console.log("data", data);
        })
      );
    } else {
      //PENDIENTE
      console.log('pendiente')
    }

  }

  signinUser(email: string, password: string) {
    if (this.USE_BACKEND){
          return this.http
      .post<{ username: string; token: string; id: string }>(
        `${environment.baseUrl}/login`,
        { email, password }
      )
      .pipe(
        tap((data) => {
          this.user = data.username;
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          localStorage.setItem("userId", data.id);
        })
      );
    } else {
      localStorage.setItem("token", "un-token-falso")
      localStorage.setItem("username", "fake@user.com")
      localStorage.setItem("userId", '1')
      const MockObservable = of( {token: "un-token-falso", username: "fake@user.com",id: '1'})
      return MockObservable
    }

  }

  async askConnection(){
    console.log('3')
    var web3;
    await this.connectService.connectWallet(window).then((res)=>{
        console.log('help', res)
        if (res){
          web3 = this.connectService.web3
          localStorage.setItem("web3", web3)
          //this.getAccounts(web3)
          return web3
        } else{
          return undefined
        }
    })
    return web3
    // console.log('4')
    // const MockObservable = of( {token: this.userAddress, username: "testingWalletConnect@user.com",id: '1'})
    // return MockObservable
  }

  async getAccounts(web3){
    await web3.eth.getAccounts().then((accounts) => {
      console.log('accounts',accounts)
      this.userAddress = accounts[0];
      localStorage.setItem("token", accounts[0]);
      localStorage.setItem("username", "testingWalletConnect@user.com")
      localStorage.setItem("userId", '1')

    }).catch((err)=>{
      console.log(err)
      //return throwError(()=>new Error('err'))
    });
  }

  logout() {
    this.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this._firebaseAuth.signOut();
    this.router.navigate(["/pages/login"]);
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }

  getToken() {
    return localStorage.getItem("token");
  }
}

//TODO: VER AUTH SERVICE
