export const toAccounting = (rawNum) => {
    let num = rawNum.replace(/,/g, "");
    let negative = parseFloat(rawNum) < 0;
    if (negative) {
        num = rawNum.substring(1);
    }
    const splitNum = num.split(".");
    const wholeDigits = splitNum[0];
    const numberOfCommas = wholeDigits.length % 3 === 0 ? parseInt(wholeDigits.length / 3) - 1 : parseInt(wholeDigits.length / 3);
    let tempArray = [];
    for (let i = 0 ; i < wholeDigits.length ; i ++) {
        tempArray.push(wholeDigits[i])
    }
    for (let i = 1 ; i <= numberOfCommas ; i ++) {
        tempArray.splice(wholeDigits.length - i * 3, 0, ",");
    }
    let convertedNum = "";
    for (let i in tempArray) {
        convertedNum += tempArray[i]
    }
    return negative ? `(${convertedNum}.${splitNum[1] ? splitNum[1] : 0})` : convertedNum + "." + (splitNum[1] ? splitNum[1] : "00");
}

export const current = 'Current Portfolio';
export const proposed = 'Proposed Portfolio';

export const suitable = 'Suitable';
export const unsuitable = 'Unsuitable';