import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ws } from '../../Service/ws';
import { Inventario } from '../Inventario/inventario';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './listar.html',
  styleUrls: ['./listar.css']
})
export class Listar implements OnInit{
  constructor(private service: Ws,  private router:Router){}
  i = new Inventario;
  producto !: Inventario[];
  productosFiltrados: Inventario[] = [];
  filtro: string = '';

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
        this.productosFiltrados = respuesta;
      },
      error: (error) => {
        console.error('Error al listar:', error);
      }
    });
  }

  filtrarPorMarca(){
    const filtroTexto = this.filtro.trim().toLocaleLowerCase();
    if (filtroTexto === ''){
      this.productosFiltrados = this.producto;
    } else {
      this.productosFiltrados = this.producto.filter(p =>
        p.marca.toLowerCase().includes(filtroTexto)
      );
    }
  }

  editar(idProducto: number){
    console.log('Id recibido para editar:', idProducto);
    localStorage.setItem("idProducto", idProducto.toString());
    this.router.navigate(['editar']);
  }

  eliminar(idProducto : number){  
     const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Eliminar",
          text: "¿Seguro que quieres eliminar el producto?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.eliminar(idProducto).subscribe({
              next: () => {
                this.activarListar();
                swalWithBootstrapButtons.fire({
                  title: "¡Eliminado!",
                  text: "El producto se eliminó correctamente.",
                  icon: "success"
                });
              },
              error: (err) => {
                console.error("Error al eliminar el producto:", err);
                Swal.fire("Error", "No se pudo eliminar el producto.", "error");
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "Tu lista no ha sido modificada:)",
              icon: "error"
            });
          }
        });

  }

}
