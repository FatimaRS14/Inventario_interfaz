import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from '../Componente/Inventario/inventario';
import { Proveedor } from '../Componente/Proveedores/proveedores';

@Injectable({
  providedIn: 'root'
})
export class Ws {

  constructor(private http: HttpClient) { }

  url = "http://localhost:9000/inv";
  listar(){
    return this.http.get<Inventario[]>(this.url + "/listar");
  }

  guardar(i: Inventario){
    return this.http.post<Inventario[]>(this.url + "/guardar", i);
  }

  buscar(id: number){
    return this.http.get<Inventario>(`${this.url}/buscar/${id}`);

  }

  editar(i: Inventario){
    return this.http.put<Inventario>(this.url+ "/editar", i);
  }

  urlp = "http://localhost:9000/prov";
  listarP() {
  return this.http.get<Proveedor[]>(this.urlp + "/listar");
}

  buscarP(id:number){
    return this.http.get<Proveedor>(`${this.urlp}/buscar/${id}`)
  }
}