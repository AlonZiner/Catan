export interface Game {
    id: number;
    date: string;
    expansion: string;
    winner: string;
    players: Player[];
}

export interface Player {
    name: string;
    score: number;
    pickOrder: number | null;
}
