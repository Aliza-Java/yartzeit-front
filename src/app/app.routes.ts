import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersListComponent } from './components/members-list/members-list.component';
import { AddMemberComponent } from './components/add-member/add-member.component';

export const routes: Routes = [

    //currently only generate and print have admin access.  
    //through them one can get to adds and lists.  This is to prevent useful links 
    //going out and being exposed.
    { path: 'generate', loadComponent: () => import('./components/generate/generate.component').then(m => m.GenerateComponent) },

    //these paths specify that sidebar should not be shown (even if admin went through them)
    { path: 'invite-member', component: AddMemberComponent, data: { title: 'Member Details', type: 'member' } },
    { path: 'invite-supporter', component: AddMemberComponent, data: { title: 'Supporter Details', type: 'supporter' } },

    { path: 'add-member', component: AddMemberComponent, data: { title: 'Member Details', type: 'member' } },
    { path: 'add-supporter', component: AddMemberComponent, data: { title: 'Supporter Details', type: 'supporter' } },

    { path: 'details-mem', component: MembersListComponent, data: { title: 'Member Details', type: 'member' } },
    { path: 'details-sup', component: MembersListComponent, data: { title: 'Supporter Details', type: 'supporter' } },

    { path: 'print-yartzeits', loadComponent: () => import('./components/print-yartzeits/print-yartzeits.component').then(m => m.PrintYartzeitsComponent) },
    { path: 'print-ann', loadComponent: () => import('./components/print-ann/print-ann.component').then(m => m.PrintAnnComponent) },
    { path: 'print-parashot', loadComponent: () => import('./components/print-bmparashot/print-bmparashot.component').then(m => m.PrintBmparashotComponent) },

    { path: 'success/:type', loadComponent: () => import('./components/success/success.component').then(m => m.SuccessComponent) },
    { path: 'error', loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent) },
    //admin-error also goes to error page, but this time shows sideBar
    { path: 'admin-error', loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent) },
    { path: '', redirectTo: 'error', pathMatch: 'full' }, // don't let empty route (sort of a authorization lock)
    { path: '**', redirectTo: 'error', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }