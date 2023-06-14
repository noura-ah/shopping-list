import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = []
  subsicription: Subscription

  constructor(private recipeService:RecipeService){}

  ngOnInit(){
    this.subsicription = this.recipeService.listChanged.subscribe((newRecipes)=> this.recipes=newRecipes)
    this.recipes = this.recipeService.getRecipes()
  }

  onChooseRecipe(recipe:Recipe){
    this.recipeService.recipeDetails.next(recipe)
  }

  ngOnDestroy(){
    this.subsicription.unsubscribe()
  }
}
