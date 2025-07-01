import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Ws } from '../../Service/ws';
import { Router } from '@angular/router';
import { Gerente } from '../Gerente/gerente';
import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-g',
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './editar-g.html',
  styleUrl: './editar-g.css'
})
export class EditarG implements OnInit{
  constructor(private service: Ws, private router:Router){}

  g=new Gerente();

  ngOnInit(): void {
    this.buscarG();
  }

  buscarG(){
    this.g.idGerente = Number(localStorage.getItem("idGerente"));
    this.service.buscarG(this.g).subscribe(data =>{
      console.log(JSON.stringify(data));
      this.g = data;
    })
  }

  editar(){
    this.service.editarG(this.g).subscribe({
      next: data =>{
        Swal.fire({
        title: 'Éxito',
        text: 'Gerente editado correctamente',
        icon: 'success',
        timer: 2500
      });
      this.router.navigate(['listarG']);
    },
    error: err => {
      console.error('Error al editar:', err);

      Swal.fire({
        title: 'Error',
        text: err?.error?.mensaje || 'No se pudo editar el gerente. Verifica que exista.',
        icon: 'error',
        timer: 3000
      });
      }
    })
  }
}
