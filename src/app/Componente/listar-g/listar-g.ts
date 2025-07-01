import { Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Gerente } from '../Gerente/gerente';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-g',
  imports: [MatCardModule, MatTableModule, MatButton, MatIcon],
  templateUrl: './listar-g.html',
  styleUrl: './listar-g.css'
})
export class ListarG implements OnInit{
  displayedColumns: string[] = ['idGerente', 'nombre', 'apellido', 'edad', 'genero', 'departamentoId', 'editar', 'eliminar'];
  constructor(private service:Ws, private router: Router){}
  ger !: Gerente[];
  g = new Gerente();
  ngOnInit(): void {
    this.activarListG();
  }

  activarListG(){
    console.log('Ejecutando activarListG()');
    this.service.listarG().subscribe({
      next: (respuesta) =>{
        console.log('Respuesta recibida:', respuesta);
        this.ger = respuesta;
      },
      error: (error) =>{
        console.log('Error al listar:', error);
      }
    })
  }

  editar(idGerente: number){
    localStorage.setItem("idGerente", idGerente.toString());
    this.router.navigate(['editarG']);
  }

  eliminar(idGerente: number){
    this.g.idGerente = idGerente;
    const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Eliminar",
          text: "¿Seguro que quieres eliminar el rol?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, eliminar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.service.eliminarG(this.g).subscribe({
              next: () => {
                this.activarListG();
                swalWithBootstrapButtons.fire({
                  title: "¡Eliminado!",
                  text: "El Gerente se eliminó correctamente.",
                  icon: "success"
                });
              },
              error: (err) => {
                console.error("Error al eliminar Gerente:", err);
                Swal.fire("Error", "No se pudo eliminar al Gerente.", "error");
              }
            });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "Cancelado",
              text: "Tu lista no se modifico :)",
              icon: "error"
            });
          }
        });
  }



}
