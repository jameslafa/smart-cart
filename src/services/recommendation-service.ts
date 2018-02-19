import { Injectable } from '@angular/core';
import { UserService } from './user-service';
import { ShoppingCartService } from './shopping-cart-service';

@Injectable()
export class RecommendationService {

  recipes = [
    { id: 1, name: 'Maple Apricot Granola', img: 'assets/recipes/1.jpg', ingredients: ['025293001961', '030000010204', '720379501181'] },
    { id: 2, name: 'Vanilla Chai Cupcakes', img: 'assets/recipes/2.jpg', ingredients: ['025293001961', '030000010204', '720379501181'] },
    { id: 3, name: 'Cantaloupe Conserve', img: 'assets/recipes/3.jpg', ingredients: ['025293001961', '030000010204', '720379501181'] }
  ]

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService) { }

  allRecipes() {
    return this.recipes;
  }

  requestRecommendation() {

  }
}