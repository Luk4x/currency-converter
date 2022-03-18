// request function
function get(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}

// API limit error function
const error = apiMessage => {
    convertedCurrencyName.textContent = `Euro (R$ ?)`;
    convertedValue.innerHTML = apiMessage;
    convertedValue.style.fontSize = '16px';
    realOption.disabled = true;
    option.disabled = true;
    userValue.style.opacity = '0.7';
    userValue.disabled = true;
    convertButton.style.opacity = '0.7';
    convertButton.disabled = true;
};

// currconv currency API
const request = currency => {
    let url = `https://free.currconv.com/api/v7/convert?q=${currency}&compact=ultra&apiKey=`;
    const api = get(url);
    const apiJ = JSON.parse(api);
    // apiJ['status'] = 400;
    // apiJ['error'] = 'Free API reached limit.';
    if (apiJ['status'] === 400) {
        error(apiJ['error']);
        return apiJ['error'];
    } else {
        return apiJ[currency];
    }
};

// 1° Select.
const realOption = document.getElementById('from-coins');
// 2° Select.
const option = document.getElementById('to-coins');
// foreign country flag image
const convertedCurrencyImage = document.getElementById('converted-image');
// currency name and value in real (under the flag image)
const convertedCurrencyName = document.querySelector('.converted-symbol-name');
// currency symbol and value converted
const convertedValue = document.querySelector('.converted-value');
let currencyModel = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
// input value on content
const userValue = document.getElementById('user-value');
// input value on result
const toConvertValue = document.querySelector('.to-convert-value');
// button
const convertButton = document.querySelector('.convert-button');

// initial select quotation (euro)
let quotation = request('EUR_BRL');
if (typeof quotation === 'number') {
    convertedCurrencyName.textContent = `Euro (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quotation)})`;
}

// changing elements according to the selected option
option.addEventListener('change', () => {
    // resetting input
    userValue.value = '';

    let newSrc = '';
    let currencyName = '';

    if (option.selectedIndex === 0) {
        newSrc = './assets/europe-flag.ico';
        currencyName = 'Euro';
        quotation = request('EUR_BRL');
        currencyModel = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
    } else if (option.selectedIndex === 1) {
        newSrc = './assets/us-flag.svg';
        currencyName = 'Dollar';
        quotation = request('USD_BRL');
        currencyModel = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    } else if (option.selectedIndex === 2) {
        newSrc = './assets/japan-flag.svg';
        currencyName = 'Yen';
        quotation = request('JPY_BRL');
        currencyModel = new Intl.NumberFormat('jp-JP', { style: 'currency', currency: 'JPY' });
    }
    convertedCurrencyImage.src = newSrc;
    convertedCurrencyName.textContent = `${currencyName} (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quotation)})`;
    convertedValue.innerHTML = currencyModel.format(0);
    toConvertValue.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0);

    widthAfterSync();
});

// input tweaks
const inputSync = event => {
    if (userValue.style.borderColor !== '#3b3c47') userValue.style.borderColor = '#3b3c47';

    if (event.key === 'Enter') {
        convert();
    }
};
userValue.addEventListener('keypress', inputSync);

// syncing toConvert and converted value after width
const widthAfterSync = () => {
    const toConvertWidth = toConvertValue.offsetWidth;
    const convertedWidth = convertedValue.offsetWidth;

    toConvertValue.style.setProperty('--js-width1', `${toConvertWidth + 6}px`);
    convertedValue.style.setProperty('--js-width2', `${convertedWidth + 6}px`);
};
widthAfterSync();

// converting action
const convert = () => {
    if (userValue.value == '') {
        userValue.style.borderColor = 'red';
        toConvertValue.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(0);
        convertedValue.innerHTML = currencyModel.format(0);
    } else {
        result = parseFloat(userValue.value) / quotation;
        toConvertValue.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(userValue.value));
        convertedValue.innerHTML = currencyModel.format(result);
    }

    widthAfterSync();
};
convertButton.addEventListener('click', convert);
