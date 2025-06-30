import { Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import { Inventario } from '../Inventario/inventario';
import { Proveedor } from '../Proveedores/proveedores';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit{
  constructor(private service: Ws, private router:Router){}
   i = new Inventario;
   prov: Proveedor[] = [];
   

   ngOnInit(): void {
    this.service.listarP().subscribe({
      next: (data) =>{
        console.log('Proveedores:', data);
        this.prov = data;
      },error: (error) =>{
        console.log('Error al cargar los proveedores', error)
      }
    })
     this.buscar();
   }

   buscar() {
      const id = Number(localStorage.getItem("idProducto"));
      this.service.buscar(id).subscribe(data => {
        console.log('Producto encontrado:', JSON.stringify(data));
        this.i = data; 
      });
    }
editar(){
  //this.i.proveedorId = {idProveedor: this.provIdSolo};

  this.service.editar(this.i).subscribe({
    next: () => {
      Swal.fire({
        title: 'EDITADO',
        text: 'Producto editado correctamente',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      this.router.navigate(['listarU']);
    },
    error: (error) => {
      console.error('Error al editar producto:', error);
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: error?.error?.mensaje || 'Ocurrió un error al editar el producto.',
        showConfirmButton: true
      });
    }
  })
}

}
