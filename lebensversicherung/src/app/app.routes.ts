import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RisikoLebensversicherungStartComponent } from './components/risiko-lebensversicherung-start/risiko-lebensversicherung-start.component';
import { MenuComponent } from './components/menu/menu.component';
import { PersoenlicheAngabenComponent } from './components/persoenliche-angaben/persoenliche-angaben.component';

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

                children: [
                  {
                    path: '',
                    redirectTo: 'perseonliche-angaben',
                    pathMatch: 'full',
                  },
                  {
                      path: 'perseonliche-angaben',
                      component: PersoenlicheAngabenComponent,
                    },
                  
                ],
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
