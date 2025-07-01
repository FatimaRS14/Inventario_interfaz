import { Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Proveedor } from '../Proveedores/proveedores';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-p',
  standalone:true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './listar-p.html',
  styleUrl: './listar-p.css'
})
export class ListarP implements OnInit{
  constructor(private service:Ws){}
  p = new Proveedor;
  prov !: Proveedor[];
  provFiltrados: Proveedor[] = [];
  filtro: string = '';
  productos: any[] = [];
  proveedorSelect?: Proveedor;

  ngOnInit(): void {
    this.provListar();
    
  }

  provListar(){
    console.log('ProvLista');
    this.service.listarP().subscribe({
      next: (respuesta) =>{
        console.log('Respuesta recibida:', respuesta);
        this.prov = respuesta;
        this.provFiltrados = respuesta;
      },
      error: (error) =>{
        console.error('Error al listar:', error);
      }
    })
  }

  filtrarProveedor(){
    const filtroTexto = this.filtro.trim().toLocaleLowerCase();
    if(filtroTexto ===''){
      this.provFiltrados = this.prov;
    }else{
      this.provFiltrados = this.prov.filter(p=>
        p.empresa?.toLowerCase().includes(filtroTexto)
      );
    }
  }

  verProductos(idProveedor: number) {
    console.log('ID proveedor recibido:', idProveedor);

    this.service.productos(idProveedor).subscribe({
      next: (respuesta) => {
        console.log('Respuesta productos:', respuesta);
        this.productos = respuesta.Productos || []; 
        this.proveedorSelect = respuesta.Proveedor; 
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
      }
    });
  }



}