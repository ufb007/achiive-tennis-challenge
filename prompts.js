import inquirer from 'inquirer';

export async function AskQuestion() {
    // return await inquirer
    //     .prompt({
    //         type: 'input',

    //     })
}

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