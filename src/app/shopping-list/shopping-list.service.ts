import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';


@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  //@Output() ingreadientsChange = new EventEmitter<Ingredient[]>()//Insted of delete the slice, we create an event
  ingreadientsChange = new Subject<Ingredient[]>() //new approach 
  startedEditing = new Subject<number>() //new approach 

  private ingredients: Ingredient[] = [

  ]


  constructor() { }

  getIngredients(){
    return this.ingredients.slice()//You can delete the slice(), and get rhe original array
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingreadientsChange.next(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
    // option 1
    // for(let ingredient of ingredients){
    //   this.addIngredient(ingredient)
    // }

    //option 2
    this.ingredients.push(...ingredients)
    console.log(ingredients);
    console.log(...ingredients);
    this.ingreadientsChange.next(this.ingredients.slice())
  }

  getIngredientItem(index:number){
    return this.ingredients[index]
  }

  updateIngredient(ingredient:Ingredient, index:number){
    this.ingredients[index] = ingredient;
    this.ingreadientsChange.next(this.ingredients.slice())
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index, 1)
    this.ingreadientsChange.next(this.ingredients.slice())
  }

}
