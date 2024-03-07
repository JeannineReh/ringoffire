import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, DialogAddPlayerComponent, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  pickCardAnimation = false; //soll weitere css-Klasse einbinden
  currentCard: string = "";
  game: Game = new Game();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }
  newGame() {
    this.game = new Game; //legt neues Spiel an, neues Objekt, neues Array mit gemischten Karten
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) { //wenn pickCardAnimation false ist, wird die Fkt alle 1000 ms ausgeführt
      this.currentCard = this.game.stack.pop() ?? ''; //Zugriff auf stack-Array, pop() gibt den letzten Wert des Arrays zurück
      this.pickCardAnimation = true; //css-Klasse wird bei true angezeigt

      console.log('New card:' + this.currentCard);
      console.log('Game is', this.game);
      //Animation soll nach einer Weile entfernt werden, Karte soll wieder auf Stapel gelegt werden
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
