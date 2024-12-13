const core = require('@actions/core');
const fs = require('fs').promises;

async function main() {

    try {
        const testResult = core.getInput('test_result');
        const imgFail = 'https://img.shields.io/badge/test-failure-red';
        const imgSuccess = 'https://img.shields.io/badge/tested%20with-Cypress-04C38E.svg';
        const badge = testResult === 'success' ? imgSuccess : imgFail;
        const textBadge = `RESULTAT DELS ÚLTIMS TESTS \n ![Test result badge](${badge}) \n`;
        const docsText = await fs.readFile('./docs/activitat_gh_action.md', 'utf8');
        await fs.writeFile('./README.md', textBadge);
        await fs.appendFile('./README.md', docsText);
        process.exit(0);
    } catch (error) {
        core.setFailed(error);
    }

};

main();
