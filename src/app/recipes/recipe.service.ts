import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>()

  private recipes:Recipe[]=[]

  constructor(private ShoppingListService: ShoppingListService) { }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes
    this.recipeChanged.next(this.recipes.slice())
  }

  getRecipes(){
    return this.recipes.slice()
  }

  getRecipe(index:number){
    return this.recipes[index]
  }

  addIngredientToShoppingList(ingredients: Ingredient[]){
    this.ShoppingListService.addIngredients(ingredients)
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index:number, recipe: Recipe){
    this.recipes[index] = recipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index:number){
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
