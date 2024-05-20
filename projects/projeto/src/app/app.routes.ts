import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../../projeto-main/projeto-main.module').then((m) => m.ProjetoMainModule)
      }
];
