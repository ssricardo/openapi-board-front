import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./views/login/login.component";
import {NamespaceListComponent} from "./views/namespaces/namespace-list/namespace-list.component";
import {AppListComponent} from "./views/app-record/app-list/app-list.component";
import {CompareSelectionComponent} from "./views/comparison/compare-selection/compare-selection.component";
import {CompareResultComponent} from "./views/comparison/compare-result/compare-result.component";
import {FormRecordComponent} from "./views/form-record/form-record.component";
import {MemoryListComponent} from "./views/memory-list/memory-list.component";
import {SwaggerComponent} from "./views/swagger/swagger.component";
import {ConfirmDialogComponent} from "./confirm-dialog/ConfirmDialogComponent";
import {SubscriberListComponent} from "./views/subscription/subscriber-list/subscriber-list.component";
import {SubscriberFormComponent} from "./views/subscription/subscriber-form/subscriber-form.component";


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'namespaces', component: NamespaceListComponent, canActivate: [AuthGuard]},
  {path: 'app-list/:namespace', component: AppListComponent, canActivate: [AuthGuard]},
  {path: 'compareto/:namespace/:app/:version', component: CompareSelectionComponent, canActivate: [AuthGuard]},
  {path: 'compare-result/:namespace/:app/:version', component: CompareResultComponent, canActivate: [AuthGuard]},
  {path: 'req-memory-form', component: FormRecordComponent, canActivate: [AuthGuard]},
  {path: 'memory-list', component: MemoryListComponent, canActivate: [AuthGuard]},
  {path: 'swagger/:namespace/:app', component: SwaggerComponent},
  {path: 'confirm-dialog', component: ConfirmDialogComponent},

    // Subscribers
  {path: 'subs-list', component: SubscriberListComponent, canActivate: [AuthGuard]},
  {path: 'subs-edit', component: SubscriberFormComponent, canActivate: [AuthGuard]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteConfigModule { }
