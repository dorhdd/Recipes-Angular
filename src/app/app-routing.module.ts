import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesStartComponent } from './recipes/recipes-start/recipes-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormComponent } from './form/form.component';
import { RecipesResloverService } from './recipes-reslover.service';


const routes: Routes = [
  { path:'', redirectTo:'/recipes', pathMatch: 'full' },
  { path:'recipes', component: RecipesComponent, children:[
    { path:'', component: RecipesStartComponent },
    { path:'new', component: RecipeEditComponent },
    { path:':id', component: RecipeDetailComponent, resolve: [RecipesResloverService] },
    { path:':id/edit', component: RecipeEditComponent, resolve: [RecipesResloverService] },
  ] },
  { path:'shopping-list', component: ShoppingListComponent },
  { path:'contact', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
