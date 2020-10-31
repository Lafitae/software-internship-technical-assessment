import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let creditcardInput:string = "";
let creditcard:number[] = [];
let sumValue:number = 0;
let totalSum:number = 0;

rl.question("Input your credit card number for validation       ", (creditcardInput) => {
    validate(creditcardInput)
});

function validate(creditcardInput:string):void {
    if(creditcardInput.length <= 1){
        console.log("Invalid input! Your number must have at least 2 digits.");
        process.exit(42);
    }

    creditcardInput = creditcardInput.replace(/\s*/g, "");
    
    creditcard = creditcardInput.split("").map((item) => {
        let parsedInt = parseInt(item, 10);
        if(isNaN(parsedInt)){
            console.log("Invalid input! Numbers only.");
            process.exit(42);
        }
        return parsedInt;
    });
    
    for (let index = 0; index < creditcard.length; index++) {
        if(index % 2 == 0){
            sumValue = 2*creditcard[index];
            if(sumValue > 9){
                sumValue -= 9;
            }
            creditcard[index] = sumValue;
        }
        totalSum += creditcard[index];
    }

    if(totalSum % 10 == 0){
        console.log("Your credit card number is valid");
        process.exit(0);
    }
    else {
        console.log("Your credit card number is NOT valid");
        process.exit(42);
    }
}

process.on('exit', function(code) {
    return console.log(`About to exit with code ${code}`);
});