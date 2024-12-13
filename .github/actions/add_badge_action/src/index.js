const core = require('@actions/core');
const fs = require('fs').promises;

async function main() {
    try {        
        console.log('Starting the script...');
        console.log('Mostrem el directori actual de treball:', process.cwd());

        const resultat_test = core.getInput('test_result');
        const img_error = 'https://img.shields.io/badge/test-failure-red';
        const img_exit = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';
        const badge = resultat_test === 'success' ? img_exit : img_error;
        const missatge_badge = `RESULTAT DELS ÚLTIMS TESTS \n ![Test result badge](${badge})`;

        const oldReadmePath = './OldREADME.md';
        let oldReadmeContent = await fs.readFile(oldReadmePath, 'utf-8');
        let newReadmeContent = oldReadmeContent + "\n" + missatge_badge;
        const readmePath = './README.md';
        await fs.writeFile(readmePath, newReadmeContent);

        // console.log(`Attempting to read: ${oldReadmePath}`);
        // console.log('Successfully read OldREADME.md');
        // console.log(`Old README content:\n${oldReadmeContent}`);
        // console.log(`New README content:\n${newReadmeContent}`);
        // console.log(`Attempting to write to: ${readmePath}`);
        // console.log('Successfully wrote to README.md');

        process.exit(0);
    } catch (e) {
        console.error(e);
        core.setFailed(e.message);
    }

};

main();
