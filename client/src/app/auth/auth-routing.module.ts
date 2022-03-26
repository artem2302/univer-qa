import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from '../guards/public.guard';

const routes: Routes = [
    {
        path: '',
        // canActivate: [PublicGuard],
        children: [
            {
                path: 'login',
                loadChildren: () =>
                    import('./login/login.module').then((m) => m.LoginModule)
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'login',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
