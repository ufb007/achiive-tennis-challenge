import { jest } from '@jest/globals';
import inquirer from 'inquirer';
import { stdout } from 'stdout-stderr';
import { ListSelect } from '../src/prompts';

describe('test prompts', () => {
    test('test command with list of array', async () => {
        const message = 'Choose your player';
        const tennisPlayers = ['Roger Federer', 'Rafael Nadal'];

        jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce({ chosenOption: 'Roger Federer' });

        stdout.start();

        const response = await ListSelect(message, tennisPlayers);

        expect(inquirer.prompt).toHaveBeenCalledWith([
            {
                type: 'list',
                name: 'command',
                message,
                loop: false,
                choices: tennisPlayers
            }
        ])
    });

    test('test list select function', async () => {
        const message = 'Choose your player';
        const tennisPlayers = ['Roger Federer', 'Rafael Nadal'];

        jest.spyOn(inquirer, 'prompt').mockResolvedValueOnce('Roger Federer');

        const response = await ListSelect(message, tennisPlayers);

        expect(response).toEqual('Roger Federer');
    });
});