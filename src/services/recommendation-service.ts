import { Injectable } from '@angular/core';
import { UserService } from './user-service';
import { ShoppingCartService } from './shopping-cart-service';

@Injectable()
export class RecommendationService {
  defaultHeader: Object = { 'Content-Type': 'application/json' }

  constructor(
    private userService: UserService,
    private shoppingCartService: ShoppingCartService) { }

  requestRecommendation() {

  }
}