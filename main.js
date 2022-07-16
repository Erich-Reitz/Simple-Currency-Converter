const { exit } = require('process');
const input = require('sync-input');

const exchange = {
    "USD": 1,
    "JPY": 113.5,
    "EUR": .89,
    "RUB": 74.36,
    "GBP": .75
}

function printWelcomeMessage() {
    console.log("Welcome to Currency Converter!")
}

function printExchangeInformation() {
    for (const [key, value] of Object.entries(exchange)) {
        console.log("1 USD equals  " + value + " " + key); // 1 USD equals 113.5 JPY
    }
}


function calculateResult(amount, originalCurrency, currencyToConvertTo) {
    return amount * exchange[currencyToConvertTo] / exchange[originalCurrency];
}


function printResult(amount_orig, res, originalCurrency, currencyToConvertTo) {
    console.log(`Result: ${amount_orig} ${originalCurrency} equals ${Number(res).toFixed(4)} ${currencyToConvertTo}`)
}

function getCurrencyToConvertTo() {
    const currencyToConvertTo = input("To: ").toUpperCase();

    return currencyToConvertTo;
}


function getOriginalCurrency() {
    console.log("What do you want to convert?");
    const originalCurrency = input("From: ").toUpperCase();

    return originalCurrency;
}

function loop() {
    while (true) {
        console.log("What do you want to do?");
        console.log("1-Convert currencies 2-Exit program");
        const choice = input("Choice: ");
        if (choice == 1) {
            convert();
        }
        else if (choice == 2) {
            console.log("Have a nice day!");
            exit(0);
        } else {
            console.log("Unknown input");
        }
    }

}

function convert() {
    const originalCurrency = getOriginalCurrency();
    if (!(originalCurrency in exchange)) {
        console.log("Unknown currency");
        return;
    }

    const currencyToConvertTo = getCurrencyToConvertTo();
    if (!(currencyToConvertTo in exchange)) {
        console.log("Unknown currency");
        return;
    }

    let amount = Number(input("Amount: "));

    if (Number.isNaN(amount)) {
        console.log("The amount has to be a number")
        return;
    }
    if (amount < 1) {
        console.log("The amount can not be less than 1.");
        return;
    }

    const result = calculateResult(amount, originalCurrency, currencyToConvertTo);
    printResult(amount, result, originalCurrency, currencyToConvertTo);
}
function main() {
    printWelcomeMessage();
    printExchangeInformation();
    loop()
}


main(); // start the program