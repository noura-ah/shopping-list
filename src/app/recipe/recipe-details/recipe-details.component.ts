import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  recipe:Recipe
  id:number

  constructor(private shoppingSevice:ShoppingService, 
    private activatedRoute:ActivatedRoute,
    private recipeService: RecipeService){}

  ngOnInit(){
    this.activatedRoute.params.subscribe((params) =>{
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipe(this.id)
    })
    
  }

  onAddToShoppingList(){
    this.shoppingSevice.addIngredients(this.recipe.ingrdients)
  }
}
