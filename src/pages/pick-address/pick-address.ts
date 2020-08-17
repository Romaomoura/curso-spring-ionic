import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EnderecoDTO } from "../../models/endereco.dto";

@IonicPage()
@Component({
  selector: "page-pick-address",
  templateUrl: "pick-address.html",
})
export class PickAddressPage {
  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua todos os santos",
        numero: "1020",
        complemento: "Apartamento",
        bairro: "centro",
        cep: "63.000-020",
        cidade: {
          id: "1",
          nome: "Juazeiro do norte",
          estado: {
            id: "1",
            nome: "Ceará"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua do Seminario",
        numero: "1030",
        complemento: "Casa",
        bairro: "centro",
        cep: "64.000-020",
        cidade: {
          id: "2",
          nome: "Crato",
          estado: {
            id: "1",
            nome: "Ceará"
          }
        }
      }
    ];
  }
}
