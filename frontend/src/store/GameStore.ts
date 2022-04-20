
import { defineStore } from "pinia";

export const GameStore = defineStore('GameStore', {
    state: () => ({
        games: []
    }),
    actions: {
        getGames(game: []): void {
            this.games = game
        }
    }

})