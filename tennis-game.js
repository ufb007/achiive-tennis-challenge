import chalk from 'chalk';
import { ListSelect } from './prompts.js';
import TennisPlayers from './tennis-players.js';
import { CalculateScores } from './scores.js';

const points = ['love', 'fifteen', 'thirty', 'forty', 'advantage'];
const players = [
    { name: null, points: 3, score: 'love', server: false },
    { name: null, points: 3, score: 'love', server: false }
];
let tennisPlayers = [...TennisPlayers];

async function StartProcess() {
    await ChoosePlayers();

    const selectedPlayers = players.map(({ name }) => name);
    
    const server = await SelectServer(selectedPlayers);

    players.find(player => {
        if (player.name === server) {
            player.server = true
        }
    });

    //Start game
    Play(selectedPlayers);
}

function ChoosePlayers() {
    return new Promise(async (resolve, reject) => {
        let index = 0;
        let message;

        while (index <= 1) {
            message = index === 0 ? 'first' : 'second';

            const response = await ListSelect(`Choose your ${message} player`, tennisPlayers);

            players[index] = { ...players[index], name: response.command }

            //remove the player that has been selected from the list so you cannot select same name
            tennisPlayers = tennisPlayers.filter(player => player != response.command)

            index++;
        }

        resolve(true);
    })
}

function SelectServer(selectedPlayers) {
    return new Promise(async (resolve, reject) => {
        const response = await ListSelect('Who is the serving?', selectedPlayers)

        resolve(response.command);
    })
}

async function Play(selectedPlayers) {
    console.log(`\n--- ${chalk.yellow(players[0].name)} ${chalk.blue('vs')} ${chalk.yellow(players[1].name)} ---\n`);

    let finished = false;

    //game has now started
    const response = await ListSelect('Who wins the next point?', selectedPlayers);

    console.log('Show response - ', response)

    const scores = CalculateScores(response.command, players)

    console.log(scores.message)
}

export default StartProcess;