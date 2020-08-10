import { API_CONFIG } from "./../../config/api.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) {}
  findByEmail(email: string): Observable<ClienteDTO> {
    let token = this.storage.getLocalUser().token;
    let authHeader = new HttpHeaders({'Authorization' : "Bearer " + token });
    return this.http.get<ClienteDTO>(
      `${API_CONFIG.baseURL}/clientes/email?value=${email}`,
      { headers: authHeader }
    );
  }
  getImageFromBucket(id : string) : Observable<any> {
    let url = `${API_CONFIG.bucketUrl}/cp${id}.jpg`
    return this.http.get(url, {responseType : 'blob'});
  }
}
