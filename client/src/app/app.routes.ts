import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { JobComponent } from './components/job/job.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'navbar', component: NavbarComponent },
    { path: 'account/register', component: RegisterComponent },
    { path: 'account/login', component: LoginComponent },
    { path: 'footer', component: FooterComponent },
    { path: '**', component: NotFoundComponent },
    { path: 'job', component: JobComponent }
];