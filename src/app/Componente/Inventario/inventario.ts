import { Proveedor } from "../Proveedores/proveedores";

export class Inventario{
    idProducto !: number;
    nombre !: string;
    marca !: string;
    modelo !: string;
    precio !: number;
    stock !: number;
    proveedorId !: Proveedor;

}