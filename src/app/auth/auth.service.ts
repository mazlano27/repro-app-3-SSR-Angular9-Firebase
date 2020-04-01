import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uid;
  guest = false;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
  }

  async init() {
    try {
      this.afAuth.user.subscribe(user => {
        if (user) {
          if (user.isAnonymous) {
            this.guest = true;
            this.uid = user.uid;
          } else {
            this.guest = false;
            this.uid = user.uid;
          }
        } else {
          this.afAuth.signInAnonymously().then((response) => {
            this.guest = true;
            this.uid = response.user.uid;
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async signOut() {
    this.router.navigateByUrl('/').then(() => {
      this.afAuth.signOut()
        .then(() => {
          console.log('See you soon!');
        }).catch(e => {
        console.log(e);
      });
    });
  }
}

