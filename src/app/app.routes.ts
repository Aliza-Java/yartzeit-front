import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'member', loadComponent: () => import('./components/add-member/add-member.component').then(m => m.AddMemberComponent) },
    { path: 'success', loadComponent: () => import('./components/success/success.component').then(m => m.SuccessComponent) },
    { path: 'error', loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent) },
    { path: '**', redirectTo: 'member', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }