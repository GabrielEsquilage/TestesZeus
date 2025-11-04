
// cypress/support/utils.js

function generateRandomName() {
    const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'];
    const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor', 'Anderson'];

    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${randomFirstName} ${randomLastName}`;
}

function generateValidCpf() {
    function randomDigit() {
        return Math.floor(Math.random() * 10);
    }

    function calculateVerifierDigit(cpfPartial) {
        let sum = 0;
        let multiplier = cpfPartial.length + 1;
        for (let i = 0; i < cpfPartial.length; i++) {
            sum += parseInt(cpfPartial[i]) * multiplier;
            multiplier--;
        }
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    let cpfNumbers = Array.from({ length: 9 }, () => randomDigit());

    let firstVerifierDigit = calculateVerifierDigit(cpfNumbers);
    cpfNumbers.push(firstVerifierDigit);

    let secondVerifierDigit = calculateVerifierDigit(cpfNumbers);
    cpfNumbers.push(secondVerifierDigit);

    const cpf = cpfNumbers.join('');

    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function generateEmail() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text + '@teste.com.br';
}

Cypress.Commands.add('generateRandomName', generateRandomName);
Cypress.Commands.add('generateValidCpf', generateValidCpf);
Cypress.Commands.add('generateEmail', generateEmail);
