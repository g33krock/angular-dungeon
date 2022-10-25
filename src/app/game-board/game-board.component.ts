import { Component, OnInit } from '@angular/core';
import cardData from '../../assets/deck.json';

export interface Deck {
  name: string;
  damage: number;
  heal: number;
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  hero1aggro: any;
  hero2aggro: any;
  hero3aggro: any;

  aggro1: number =0;
  aggro2: number =0;
  aggro3: number =0;

  topAggro: any;

  hero1: number = 20;
  hero2: number = 20;
  hero3: number = 20;
  monster: number = 40;

  hero1card: any;
  hero2card: any;
  hero3card: any;

  deck1 = cardData.slice();
  deck2 = cardData.slice();
  deck3 = cardData.slice();

  cardData: any = cardData;

  constructor() {}

  ngOnInit(): void {
    console.log(this.deck3);
  }

  diceRoll() {
    this.hero1aggro = Math.floor(Math.random() * 20);
    this.hero2aggro = Math.floor(Math.random() * 20);
    this.hero3aggro = Math.floor(Math.random() * 20);
    let card1Select = Math.floor(Math.random() * this.deck1.length);
    let card2Select = Math.floor(Math.random() * this.deck2.length);
    let card3Select = Math.floor(Math.random() * this.deck3.length);
    this.hero1card = this.deck1[card1Select];
    this.hero2card = this.deck2[card2Select];
    this.hero3card = this.deck3[card3Select];
    this.monster =
      this.monster -
      (this.hero1card.damage + this.hero2card.damage + this.hero3card.damage);
    this.monsterAttack();
    if (this.deck1.length > 1) {
      this.deck1.splice(card1Select, 1);
    } else {
      this.deck1 = this.cardData.slice();
    }
    if (this.deck2.length > 1) {
      this.deck2.splice(card2Select, 1);
    } else {
      this.deck2 = this.cardData.slice();
    }
    if (this.deck3.length > 1) {
      this.deck3.splice(card3Select, 1);
    } else {
      this.deck3 = this.cardData.slice();
    }
  }

  monsterAttack() {
    let aggros = [
      { name: 'ha1', value: this.hero1aggro },
      { name: 'ha2', value: this.hero2aggro },
      { name: 'ha3', value: this.hero3aggro },
    ];
    aggros = aggros.sort(function (a, b) {
      return b.value - a.value;
    });
    this.topAggro = aggros[0].name;
    switch (this.topAggro) {
      case 'ha1':
        this.hero1 =
          this.hero1 -
          5 +
          (this.hero1card.heal + this.hero2card.heal + this.hero3card.heal);
        break;
      case 'ha2':
        this.hero2 =
          this.hero2 -
          5 +
          (this.hero1card.heal + this.hero2card.heal + this.hero3card.heal);
        break;
      case 'ha3':
        this.hero3 =
          this.hero3 -
          5 +
          (this.hero1card.heal + this.hero2card.heal + this.hero3card.heal);
        break;
      default:
        alert('BOOM!!!');
    }
  }
}
