import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/account/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { authLoggedInGuard } from './guards/auth-logged-in.guard';
import { authGuard } from './guards/auth.guard';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { NoAccessComponent } from './components/errors/no-access/no-access.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { MemberComponent } from './components/member/member.component';
import { EmployerRegisterComponent } from './components/account/register/employer-register/employer-register.component';
import { JobSeekerRegisterComponent } from './components/account/register/job-seeker-register/job-seeker-register.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'user/user-edit', component: UserEditComponent },
            { path: 'no-access', component: NoAccessComponent },
            { path: 'member', component: MemberComponent },
            { path: 'advertisements', component: AdvertisementComponent }
        ]
    },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authLoggedInGuard],
        children: [
            { path: 'account/login', component: LoginComponent },
            { path: 'account/employer-register', component: EmployerRegisterComponent },
            { path: 'account/job-seeker-register', component: JobSeekerRegisterComponent }
        ]
    },
    { path: 'navbar', component: NavbarComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
    // { path: '**', component: NotFoundComponent }
];