import { Routes } from '@angular/router';
import { Guardar } from './Componente/guardar/guardar';
import { Editar } from './Componente/editar/editar';
import { Layout } from './layout/layout';
import { Listar } from './Componente/listar/listar';
import { ListarP } from './Componente/listar-p/listar-p';
import { ListarG } from './Componente/listar-g/listar-g';
import { GuardarG } from './Componente/guardar-g/guardar-g';
import { EditarG } from './Componente/editar-g/editar-g';


export const routes: Routes = [{
    path: '',
    component:Layout,
    children:[
        {
            path: 'listar',
            component:Listar
        },
        {
            path: 'guardar',
            component:Guardar
        },
        {
            path: 'editar',
            component:Editar
         },
        {
            path: '', redirectTo: 'listar', 
            pathMatch: 'full'
        },
        {
            path: 'listarP',
            component:ListarP
        },
        {
            path: 'listarG',
            component:ListarG
        },
        {
            path: 'guardarG',
            component:GuardarG
        },
        {
            path: 'editarG',
            component:EditarG
        }

    ]
}
];
