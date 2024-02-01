import inquirer from 'inquirer';

/**
 * ListSelect
 * 
 * Lists the prompts of given array
 * 
 * @function ListSelect
 * @param {string} message
 * @param {*} list 
 * @return Promise
 */
export async function ListSelect(message = null, list = []) {
    return await inquirer
        .prompt([
            {
                type: 'list',
                name: 'command',
                message: message,
                loop: false,
                choices: list
            }
        ]);
}