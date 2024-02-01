import chalk from 'chalk';
import { ListSelect } from './prompts.js';
import TennisPlayers from './tennis-players.js';
import CalculateScores from './scores.js';

const scoring = ['0', '15', '30', '40', 'ADV'];
const players = [
    { name: null, points: 0, server: false },
    { name: null, points: 0, server: false }
];
let tennisPlayers = [...TennisPlayers];

/**
 * Start Process
 * 
 * Begins the process
 * 
 * @method StartProcess
 * @void
 */
async function StartProcess() {
    console.clear();
    
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

/**
 * ChoosePlayers
 * 
 * Prompt Options to select from
 * a list of players
 * 
 * @method ChoosePlayers
 * @returns Promise
 */
function ChoosePlayers() {
    return new Promise(async (resolve, reject) => {
        let index = 0;
        let message;

        while (index <= 1) {
            message = index === 0 ? 'first' : 'second';

            const response = await ListSelect(`Choose your ${message} player`, tennisPlayers);

            console.clear();

            players[index] = {...players[index], name: response.command}

            //remove the player that has been selected from the list so you cannot select same name
            tennisPlayers = tennisPlayers.filter(player => player != response.command)

            index++;
        }

        resolve(true);
    });
}

/**
 * SelectServer
 * 
 * Select who will be serving
 * 
 * @function SelectServer
 * @returns Promise
 */
function SelectServer(selectedPlayers) {
    return new Promise(async (resolve, reject) => {
        const response = await ListSelect('Who is the serving?', selectedPlayers);

        console.clear();

        resolve(response.command);
    });
}

/**
 * Play
 * 
 * Game starts with options to select
 * who wins points
 * 
 * @function Play
 * @void
 */
async function Play(selectedPlayers) {
    const [player1, player2] = players;

    console.log(`\n--- ${chalk.yellow(player1.name)} ${chalk.blue('vs')} ${chalk.yellow(player2.name)} ---\n`);

    let completed = false;

    while (!completed) {
        //game has now started
        const response = await ListSelect('Who wins the next point?', selectedPlayers);

        console.clear();

        players.forEach(player => {
            if (player.name === response.command) {
                player = {...player, points: player.points++}
            }
        });

        const {finished, message, points, winner} = CalculateScores(players);

        completed = finished;

        players.forEach((player, index) => player.points = points[index]);

        if (!finished) {
            console.log(`\n--- ${player1.server ? '[-]' : ''} ${chalk.yellow(player1.name)} ${scoring[points[0]]} - ${scoring[points[1]]} ${chalk.yellow(player2.name)} ${player2.server ? '[-]' : ''} ${chalk.blue(message.toUpperCase())} ---\n`);
        } else {
            console.log(`\n--- ${chalk.blue('Winner:')} ${chalk.yellow(winner)} ---\n`);
        }
    }
}

export default StartProcess;