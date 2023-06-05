import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { StartRecipeComponent } from './recipe/start-recipe/start-recipe.component';
import { RecipeDetailsComponent } from './recipe/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe/recipe-form/recipe-form.component';

const routes: Routes = [
  { path: '', redirectTo:'recipes', pathMatch:'full'},
  { path:'recipes', component: RecipeComponent, children:[
    { path:'', component: StartRecipeComponent},
    { path:'new', component: RecipeFormComponent},
    { path:':id', component:RecipeDetailsComponent},
    { path:':id/edit', component:RecipeFormComponent}
  ]},
  { path:'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
