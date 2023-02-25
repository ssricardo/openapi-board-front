import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./views/login/login.component";
import { NamespaceListComponent } from "./views/namespaces/namespace-list/namespace-list.component";
import { ApiListComponent } from "./views/api-record/api-list/api-list.component";
import { CompareSelectionComponent } from "./views/comparison/compare-selection/compare-selection.component";
import { CompareResultComponent } from "./views/comparison/compare-result/compare-result.component";
import { SampleFormComponent } from "./views/form-record/sample-form.component";
import { SampleListComponent } from "./views/memory-list/sample-list.component";
import { SwaggerComponent } from "./views/swagger/swagger.component";
import { ConfirmDialogComponent } from "./confirm-dialog/ConfirmDialogComponent";
import { SubscriberListComponent } from "./views/subscription/subscriber-list/subscriber-list.component";
import { SubscriberFormComponent } from "./views/subscription/subscriber-form/subscriber-form.component";
import { RedocComponent } from './views/redoc/redoc.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'namespaces', component: NamespaceListComponent, canActivate: [AuthGuard] },
  { path: 'api-list/:namespace', component: ApiListComponent, canActivate: [AuthGuard] },
  { path: 'compareto/:apiId', component: CompareSelectionComponent, canActivate: [AuthGuard] },
  { path: 'compare-result/:apiName/:namespace/:version', component: CompareResultComponent, canActivate: [AuthGuard] },
  { path: 'req-memory-form', component: SampleFormComponent, canActivate: [AuthGuard] },
  { path: 'memory-list', component: SampleListComponent, canActivate: [AuthGuard] },
  { path: 'swagger/:apiId', component: SwaggerComponent },
  { path: 'redoc/:apiId', component: RedocComponent },
  { path: 'confirm-dialog', component: ConfirmDialogComponent },

  // Subscribers
  { path: 'subs-list', component: SubscriberListComponent, canActivate: [AuthGuard] },
  { path: 'subs-edit', component: SubscriberFormComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RouteConfigModule { }
