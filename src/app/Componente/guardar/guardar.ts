import { Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import { Inventario } from '../Inventario/inventario';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Proveedor } from '../Proveedores/proveedores';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-guardar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './guardar.html',
  styleUrl: './guardar.css'
})
export class Guardar implements OnInit {
  constructor(private service:Ws, private router:Router){}
  i = new Inventario();
  proveedor: Proveedor[] = [];
  p = new Proveedor();

  ngOnInit(): void {
    this.service.listarP().subscribe({
     next: (data) => {
        console.log('Proveedores:', data);
        this.proveedor = data;
      },
      error: (error) => {
        console.error('Error al cargar roles:', error);
      }
    })
  }

  guardar() {
    console.log('Producto a guardar:', this.i);
    this.service.guardar(this.i).subscribe(respuesta => {
      Swal.fire({
        title: "GUARDAR!",
        icon: "success",
        draggable: true,
        text: JSON.stringify(respuesta),
        showConfirmButton: false,
        timer: 2500
      });
      this.router.navigate(['listar']);
    }, error => {
      Swal.fire({
        title: "Error",
        icon: "error",
        draggable: true,
        text: JSON.stringify(error.error.mensaje),
        showConfirmButton: false,
        timer: 2500
      });
    });
  }

}


