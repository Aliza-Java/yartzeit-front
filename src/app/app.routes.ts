import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [

    { path: 'generate', loadComponent: () => import('./components/generate/generate.component').then(m => m.GenerateComponent) },
    { path: 'list', loadComponent: () => import('./components/members-list/members-list.component').then(m => m.MembersListComponent) },
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
    { path: 'success', loadComponent: () => import('./components/success/success.component').then(m => m.SuccessComponent) },
    { path: 'error', loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent) },
    { path: 'member', loadComponent: () => import('./components/add-member/add-member.component').then(m => m.AddMemberComponent) },
    { path: '', redirectTo: 'generate', pathMatch: 'full' }, // default route
    { path: '**', redirectTo: 'generate', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }