import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PedidoDTO } from "../../models/pedido.dto";
import { CartItem } from "../../models/cart-item";
import { CartService } from "../../services/domain/cart.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { EnderecoDTO } from "../../models/endereco.dto";
import { ClienteService } from "../../services/domain/cliente.service";
import { PedidoService } from "../../services/domain/pedido.service";

@IonicPage()
@Component({
  selector: "page-order-confirmation",
  templateUrl: "order-confirmation.html",
})
export class OrderConfirmationPage {
  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codpedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService
  ) {
    this.pedido = this.navParams.get("pedido");
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      (response) => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findByEndereco(
          this.pedido.enderecoEntrega.id,
          response["enderecos"]
        );
      },
      (error) => {
        this.navCtrl.setRoot("HomePage");
      }
    );
  }

  private findByEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex((x) => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
    .subscribe(response => {
        console.log(this.pedido);
        this.cartService.createOrClearCart();
        this.codpedido = this.extractId(response.headers.get('location'));

      },
      error => {
        if (error == 403) {
          this.navCtrl.setRoot("HomePage");
        }
      }
    );
  }
  back(){
    this.navCtrl.setRoot('CartPage');
  }
  back_home(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  private extractId(location: string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
