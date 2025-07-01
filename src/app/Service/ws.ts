import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inventario } from '../Componente/Inventario/inventario';
import { Proveedor } from '../Componente/Proveedores/proveedores';
import { Gerente } from '../Componente/Gerente/gerente';

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

  eliminar(id: number) {
    return this.http.delete<void>(`${this.url}/eliminar?idInventario=${id}`);
  }

  porMarca(marca: string) {
  return this.http.get<Inventario[]>(this.url + '/marca/' + marca);
}


  urlp = "http://localhost:9000/prov";
  listarP() {
  return this.http.get<Proveedor[]>(this.urlp + "/listar");
}

  buscarP(id:number){
    return this.http.get<Proveedor>(`${this.urlp}/buscar/${id}`)
  }

  productos(id:number){
    return this.http.get<any>(`${this.urlp}/productos/${id}`)
  }

  urlg ="http://localhost:9000/gerente";

  listarG(){
    return this.http.get<Gerente[]>(this.urlg + "/listar");
  }

  guardarG(g: Gerente){
    return this.http.post<Gerente[]>(this.urlg + "/guardar", g);
  }

  buscarG(g: Gerente){
    return this.http.post<Gerente>(this.urlg + "/buscar", g);
  }

  editarG(g: Gerente){
    return this.http.put<String>(this.urlg + "/editar", g);
  }

  eliminarG(g: Gerente){
    return this.http.delete<void>(this.urlg + "/eliminar",{
      body :g
    });
  }

}