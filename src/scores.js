/**
 * CalculateScores
 * 
 * Calculates scores
 * 
 * @function CalculateScores
 * @param {*} players 
 * @return {object}
 */
function CalculateScores(players) {
    const scores = players.map(({ points }) => points);
    const playerServer = players.find(({ server }) => server);
    const playerNonServer = players.find(({ server }) => !server);

    let response = {
        finished: false,
        winner: '',
        message: '',
        points: scores
    };

    let message = 'Game Point';

    if (scores[0] >= 3 && scores[1] <= 2 || scores[1] >= 3 && scores[0] <= 2) {
        message = playerServer.points < playerNonServer.points ? 'Break Point' : 'Game Point';

        response = { ...response, message }
    }

    if (scores.every(score => score === 4)) {
        response = {...response, points: [3, 3], message: 'Deuce'}
    } else if (scores[0] >= 4 && scores[0] >= scores[1] + 2) {
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
    } else if (scores.every(score => score === 3)) {
        response = {
            ...response,
            message: 'Deuce'
        }
    } else if (
        (scores[0] === 4 && scores[1] === 3) || 
        (scores[1] === 4 && scores[0] === 3)
    ) {
        message = playerServer.points < playerNonServer.points ? 'Break Point' : 'Game Point';
        
        response = {
            ...response,
            message
        }
    }

    return response;
}

export default CalculateScores;