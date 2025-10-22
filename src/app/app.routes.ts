import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersListComponent } from './components/members-list/members-list.component';
import { AddMemberComponent } from './components/add-member/add-member.component';

export const routes: Routes = [

    { path: 'generate', loadComponent: () => import('./components/generate/generate.component').then(m => m.GenerateComponent) },
    { path: 'mem-details', component: MembersListComponent, data: { title: 'Member Details', type: 'member' } },
    { path: 'sup-details', component: MembersListComponent, data: { title: 'Supporter Details', type: 'supporter' } },
    {
        path: 'print', loadComponent: () => import('./components/print/print.component').then(m => m.PrintComponent),
        children: [
            {
                path: 'yartzeits',
                loadComponent: () =>
                    import('./components/print-yartzeits/print-yartzeits.component')
                        .then(m => m.PrintYartzeitsComponent),
            },
            {
                path: 'anniversaries',
                loadComponent: () =>
                    import('./components/print-ann/print-ann.component')
                        .then(m => m.PrintAnnComponent),
            },
            {
                path: 'parashot',
                loadComponent: () =>
                    import('./components/print-bmparashot/print-bmparashot.component')
                        .then(m => m.PrintBmparashotComponent),
            },
            {
                path: 'combined',
                loadComponent: () =>
                    import('./components/print-combined/print-combined.component')
                        .then(m => m.PrintCombinedComponent),
            },
            { path: '', redirectTo: 'yartzeits', pathMatch: 'full' }, // default route
            { path: '**', redirectTo: 'yartzeits', pathMatch: 'full' }
        ]
    },
    { path: 'invite/:code', loadComponent: () => import('./components/invite/invite.component').then(m => m.InviteComponent) },
    { path: 'success/:type', loadComponent: () => import('./components/success/success.component').then(m => m.SuccessComponent) },
    { path: 'error', loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent) },
    { path: 'add-member', component: AddMemberComponent, data: { title: 'Member Details', type: 'member' } },
    { path: 'add-supporter', component: AddMemberComponent, data: { title: 'Supporter Details', type: 'supporter' } },
    { path: '', redirectTo: 'generate', pathMatch: 'full' }, // default route
    { path: '**', redirectTo: 'generate', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }