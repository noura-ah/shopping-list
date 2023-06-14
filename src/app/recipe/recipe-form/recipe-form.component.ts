import { Component } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/shared/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  id: number
  editMode = false
  recipeForm: FormGroup
  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private route: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipeForm.value, this.id)
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onClear()
  }

  onClear() {
    this.route.navigate(['../'], {relativeTo: this.activatedRoute})
  }

  accessIngrdientsControls() {
    return (this.recipeForm.get('ingrdients') as FormGroup).controls
  }

  onAddIngrdient() {
    (<FormArray>this.recipeForm.get('ingrdients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngrdient(index:number){
    (<FormArray>this.recipeForm.get('ingrdients')).removeAt(index)
  }

  private initForm() {
    let name = ''
    let imgPath = ''
    let desc = ''
    let ingrdients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      name = recipe.name
      imgPath = recipe.imgPath
      desc = recipe.desc
      if (recipe['ingrdients']) {
        for (let ingredient of recipe.ingrdients) {
          ingrdients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'desc': new FormControl(desc, Validators.required),
      'imgPath': new FormControl(imgPath, Validators.required),
      'ingrdients': ingrdients
    })

  }

}
