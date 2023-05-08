// Originator
class Game {
  private state: number;

  constructor() {
    this.state = 0;
  }

  play(): void {
    this.state += 1;
    console.log(`Playing game, current progress: ${this.state}`);
  }

  save(): GameMemento {
    console.log(`Saving game progress: ${this.state}`);
    return new GameMemento(this.state);
  }

  restore(memento: GameMemento): void {
    this.state = memento.getState();
    console.log(`Restoring game progress: ${this.state}`);
  }
}

// Memento
class GameMemento {
  constructor(private state: number) {}

  getState(): number {
    return this.state;
  }
}

// Caretaker
class GameCaretaker {
  private mementos: GameMemento[] = [];

  addMemento(memento: GameMemento): void {
    this.mementos.push(memento);
  }

  getMemento(index: number): GameMemento {
    return this.mementos[index];
  }
}

// Client
const game = new Game();
const caretaker = new GameCaretaker();

game.play();
caretaker.addMemento(game.save());

game.play();
caretaker.addMemento(game.save());

game.play();

game.restore(caretaker.getMemento(1));
game.restore(caretaker.getMemento(0));
