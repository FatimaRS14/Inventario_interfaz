import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Topbar, RouterModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  sidebarOpen = false;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
    console.log('Sidebar abierta:', this.sidebarOpen);
  }
}
