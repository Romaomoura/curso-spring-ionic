import { API_CONFIG } from "./../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {
  constructor(public http: HttpClient, public storage: StorageService) {}

  findById(id: string) {
    return this.http.get(`${API_CONFIG.baseURL}/clientes/${id}`);
  }

  findByEmail(email: string) {
    return this.http.get(`${API_CONFIG.baseURL}/clientes/email?value=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketUrl}/cp${id}.jpg`;
    return this.http.get(url, { responseType: "blob" });
  }
  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseURL}/clientes`, obj, {
      observe: "response",
      responseType: "text",
    });
  }
}
