import { API_CONFIG } from "./../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";
import { ImageUtilService } from "../image-util.service";

@Injectable()
export class ClienteService {
  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public imageUtilService: ImageUtilService
    ) {}

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

  uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        let formData : FormData = new FormData();
        formData.set('file', pictureBlob, 'file.png');
        return this.http.post(
            `${API_CONFIG.baseURL}/clientes/pic`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}
