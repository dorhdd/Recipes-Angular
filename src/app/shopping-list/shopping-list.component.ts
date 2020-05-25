import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, observable } from 'rxjs';
import { promise } from 'protractor';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[]
  private chnageSub: Subscription
  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients()
    this.chnageSub = this.shoppingListService.ingreadientsChange.subscribe((ingredients: Ingredient[])=>{
      this.ingredients = ingredients
    })
  }

  ngOnDestroy(){
    this.chnageSub.unsubscribe()
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index)
  }

}