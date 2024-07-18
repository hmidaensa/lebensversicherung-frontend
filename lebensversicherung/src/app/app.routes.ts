import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RisikoLebensversicherungStartComponent } from './components/risiko-lebensversicherung-start/risiko-lebensversicherung-start.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'start',
        pathMatch: 'full',
      },
      {
        path: 'start',
        component: RisikoLebensversicherungStartComponent,
        
        children: [
            {
                path: 'menu',
                component: MenuComponent,
              },
            
          ],
        
      },
      {
        path: '**',
        redirectTo: 'start'
      },
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
