export interface Player {
    name: string;
    pickOrder: number;
}

export interface Game {
    date: string;
    expansion: string;
    winner: string;
    players: Player[];
}
