import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = "HomePage";

  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService) {
    this.initializeApp();

    this.pages = [
      { title: 'Perfil', component: "ProfilePage" },
      { title: 'Categorias', component: "CategoriasPage" },
      {title: 'Carrinho', component: "CartPage"},
      { title: 'Sair' , component: ''}
    ];


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page : {title: string, component: string}) {
    switch (page.title){
      case 'Sair':
      this.auth.logout();
      this.nav.setRoot('HomePage');
      break;

      default:
        this.nav.setRoot(page.component);
    }

  }
}
