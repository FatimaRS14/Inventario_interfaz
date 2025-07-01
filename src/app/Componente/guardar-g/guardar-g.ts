import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ws } from '../../Service/ws';
import { Gerente } from '../Gerente/gerente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guardar-g',
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './guardar-g.html',
  styleUrl: './guardar-g.css'
})
export class GuardarG{

  constructor(private service:Ws, private router:Router){}

  g = new Gerente();

  guardarG(){
    console.log('Gerente a guardar:', this.g);
        this.service.guardarG(this.g).subscribe(respuesta => {
          Swal.fire({
            title: "GUARDAR!",
            icon: "success",
            draggable: true,
            text: JSON.stringify(respuesta),
            showConfirmButton: false,
            timer: 2500
          });
          this.router.navigate(['listarG']);
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
