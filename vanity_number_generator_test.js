let phoneNumber = 8885553353;

if (typeof phoneNumber == "number"){
    phoneNumber = phoneNumber.toString();
}

const firstSixDigits = phoneNumber.substr(0, 6);
const numberToConvert = phoneNumber.substr(phoneNumber.length - 4).split('');

const numberLetterMap = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
};

const generateVanityNumbers = numberInput => {
    if(numberInput === "") return [];

    let phoneArray = Array.from(numberInput);

    let concat = (arr, x) => Array(arr.length * x)
        .fill()
        .map((b, i) => arr[i % arr.length])
        .sort((a, b) => a.localeCompare(b));

    let results = Array(numberLetterMap[phoneArray[0]].length)
        .fill()
        .map((_, i) => numberLetterMap[phoneArray[0]][i]);

    for(let digit = 1; digit < phoneArray.length; digit++) {
        let x = numberLetterMap[phoneArray[digit]];
        results = concat(results, x.length).map((b, i) => b + x[i % x.length]);
    }

    return findTopFiveNumbers(results);
}

const findTopFiveNumbers = vanityNumbers => {
    let filteredCombinations = [];
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    // Find the best 5 words by looking for vowels
    for (let i = 0; i < vanityNumbers.length && filteredCombinations.length < 5; i++) {
        if (!vowels.includes(vanityNumbers[i].charAt(0))
            && vowels.includes(vanityNumbers[i].charAt(1))
            && vowels.includes(vanityNumbers[i].charAt(3))){
                filteredCombinations.push(vanityNumbers[i].toUpperCase());
        }
    }

    for (let i = 0; i < vanityNumbers.length && filteredCombinations.length < 5; i++) {
        if (vowels.includes(vanityNumbers[i].charAt(1))
            && vowels.includes(vanityNumbers[i].charAt(3))){
            filteredCombinations.push(vanityNumbers[i].toUpperCase());
        }
    }

    for (let i = 0; i < vanityNumbers.length && filteredCombinations.length < 5; i++) {
        if (vowels.includes(vanityNumbers[i].charAt(1))){
            filteredCombinations.push(vanityNumbers[i].toUpperCase());
        }
    }

    for (let i = 0; i < vanityNumbers.length && filteredCombinations.length < 5; i++) {
        if (vowels.includes(vanityNumbers[i].charAt(3))){
            filteredCombinations.push(vanityNumbers[i].toUpperCase());
        }
    }

    for (let i = 0; i < vanityNumbers.length && filteredCombinations.length < 5; i++) {
            filteredCombinations.push(vanityNumbers[i].toUpperCase());
    }

    return filteredCombinations;
}

let filteredCombinations = generateVanityNumbers(numberToConvert);

for (let i = 0; i < filteredCombinations.length; i++) {
    let fullNumber = firstSixDigits + filteredCombinations[i];
    filteredCombinations[i] = fullNumber.substr(0,3) + '-' + fullNumber.substr(3, 3) + '-' + fullNumber.substr(6);
}

console.log(filteredCombinations);
