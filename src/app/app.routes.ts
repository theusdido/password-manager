import { Routes } from '@angular/router';
import { ListarPage } from './listar/listar.page';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    loadComponent: () => import('./listar/listar.page').then( c => ListarPage)
  },
  {
    path: 'cadastrar',
    loadComponent: () => import('./cadastrar/cadastrar.page').then( m => m.CadastrarPage)
  },
  {
    path: 'cadastrar/:codigo',
    loadComponent: () => import('./cadastrar/cadastrar.page').then( m => m.CadastrarPage)
  },   {
    path: 'rodape',
    loadComponent: () => import('./rodape/rodape.page').then( m => m.RodapePage)
  },
  {
    path: 'configuracao',
    loadComponent: () => import('./configuracao/configuracao.page').then( m => m.ConfiguracaoPage)
  }

];
