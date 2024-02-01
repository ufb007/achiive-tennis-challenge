import CalculateScores from '../src/scores.js';

describe('test scoring', () => {
    let players;

    beforeEach(() => {
        players = [
            { name: 'Roger Federer', points: 0, server: false },
            { name: 'Rafael Nadal', points: 0, server: false }
        ];
    });

    test('test score break point', () => {
        const [player1, player2] = players;

        player1.points = 2;
        player1.server = true;
        player2.points = 3;

        const response = CalculateScores(players);

        expect(response).toEqual({
            finished: false,
            winner: '',
            message: 'Break Point',
            points: [2, 3]
        });
    });

    test('test score deuce', () => {
        const [player1, player2] = players;

        player1.points = 3;
        player1.server = true;
        player2.points = 3;

        const response = CalculateScores(players);

        expect(response).toEqual({
            finished: false,
            winner: '',
            message: 'Deuce',
            points: [3, 3]
        })
    });

    test('test score on game point', () => {
        const [player1, player2] = players;

        player1.points = 3;
        player1.server = true;
        player2.points = 2;

        const response = CalculateScores(players);

        expect(response).toEqual({
            finished: false,
            winner: '',
            message: 'Game Point',
            points: [3, 2]
        });
    });

    test('test winner', () => {
        const [player1, player2] = players;

        player1.points = 4;
        player1.server = true;
        player2.points = 2;

        const response = CalculateScores(players);

        expect(response).toEqual({
            finished: true,
            winner: '',
            winner: 'Roger Federer',
            message: 'Game Point',
            points: [4, 2]
        });
    });
});