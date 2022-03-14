const option = document.getElementById('to-coins');
const convertedCurrencyImage = document.getElementById('converted-image');
const convertedCurrencyName = document.querySelector('.converted-symbol-name');
const convertedValue = document.querySelector('.converted-value');
let currencySymbol = `&#8364;`;
let quotation = 5.54;

option.addEventListener('change', () => {
    let newSrc = '';
    let currencyName = '';
    if (option.selectedIndex === 0) {
        newSrc = './assets/europe-flag.ico';
        currencyName = 'Euro';
        currencySymbol = `&#8364;`;
        quotation = 5.54;
    } else if (option.selectedIndex === 1) {
        newSrc = './assets/us-flag.svg';
        currencyName = 'Dollar';
        currencySymbol = `&#36;`;
        quotation = 5.08;
    } else if (option.selectedIndex === 2) {
        newSrc = './assets/bitcoin-symbol.svg';
        currencyName = 'Bitcoin';
        currencySymbol = `&#8383;`;
        quotation = 198721.78;
    } else if (option.selectedIndex === 3) {
        newSrc = './assets/japan-flag.svg';
        currencyName = 'Yen';
        currencySymbol = '&#165;';
        quotation = 0.043;
    }
    convertedCurrencyImage.src = newSrc;
    convertedCurrencyName.textContent = `${currencyName} (R$ ${quotation.toFixed(3).replace('.', ',')})`;
    convertedValue.innerHTML = `${currencySymbol} 0`;
});

// onchange input, change real and reset other.

const convert = () => {
    const userValue = document.getElementById('user-value');
    const toConvertValue = document.querySelector('.to-convert-value');
    toConvertValue.textContent = `R$ ${parseFloat(userValue.value).toFixed(2).replace('.', ',')}`;
    let result = parseFloat(userValue.value) * quotation;
    convertedValue.innerHTML = `${currencySymbol} ${result.toFixed(2)}`;
};

const convertButton = document.querySelector('.convert-button');
convertButton.addEventListener('click', convert);
