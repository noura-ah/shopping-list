import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes:Recipe[] = []

  constructor(private recipeService:RecipeService){}

  ngOnInit(){
    this.recipes = this.recipeService.getRecipes()
  }

  onChooseRecipe(recipe:Recipe){
    this.recipeService.recipeDetails.next(recipe)
  }
}
