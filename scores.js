import chalk from "chalk";

export function CalculateScores(winnerOfPoint, players) {
    const scores = players.map(({ points }) => points);

    const response = {
        finished: false,
        winner: '',
        message: '',
        scores: false
    };

    if (scores[0] >= 4 && scores[0] >= scores[1] + 2) {
        response = {
            ...response, 
            finished: true,
            winner: players[0].name
        }
    } else if (scores[1] >= 4 && scores[1] >= scores[0] + 2) {
        response = {
            ...response, 
            finished: true,
            winner: players[1].name
        }
    } else if (scores[0] === scores[1]) {
        response = {
            ...response,
            message: 'Deuce'
        }
    }

    return response;
}