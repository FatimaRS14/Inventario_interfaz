import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ws } from '../../Service/ws';
import { Inventario } from '../Inventario/inventario';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class Listar implements OnInit{
  constructor(private service: Ws,  private router:Router){}

producto !: Inventario[];

  ngOnInit(): void {
    console.log('Componente inicializado');
    this.activarListar();
  }

  activarListar(){
    console.log('Ejecutando activarListar()');
    this.service.listar().subscribe({
      next: (respuesta) => {
        console.log('Respuesta recibida:', respuesta);
        this.producto = respuesta;
      },
      error: (error) => {
        console.error('Error al listar:', error);
      }
    });
  }

  editar(idProducto: number){
    console.log('Id recibido para editar:', idProducto);
    localStorage.setItem("idProducto", idProducto.toString());
    this.router.navigate(['editar']);
  }

}
