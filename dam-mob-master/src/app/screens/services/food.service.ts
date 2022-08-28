import { Injectable } from "@angular/core";
import { Food } from "../models/food.model";

@Injectable({
    providedIn: 'root'
})
export class FoodService {
    constructor() { }


    getFoods(): Food[] {
        return [
            {
                id: 1,
                title: 'Sea Food',
                image: 'assets/images/avatar-alt.png',
                price: 12,
                description: 'small desction '
            },
            {
                id: 2,
                title: 'Rise',
                image: 'assets/images/avatar-alt.png',
                price: 12,
                description: 'small 2 desction '
            },
            {
                id: 3,
                title: 'Orange',
                image: 'assets/images/avatar-alt.png',
                price: 12,
                description: 'small 3 desction '
            },
            {
                id: 4,
                title: 'd1',
                image: 'assets/images/avatar-alt.png',
                price: 13,
                description: 'small 3 desction '
            },
            {
                id: 5,
                title: 'd2',
                image: 'assets/images/avatar-alt.png',
                price: 129,
                description: 'small 3 desction '
            },
            {
                id: 6,
                title: 'ali',
                image: 'assets/images/avatar-alt.png',
                price: 121,
                description: 'small 3 desction '
            },
            {
                id: 7,
                title: 'ali fady',
                image: 'assets/images/avatar-alt.png',
                price: 121,
                description: 'small 3 desction '
            }
        ];
    }


    getFood(id: number): Food {
        return this.getFoods().find((food) => food.id == id);
    }
}