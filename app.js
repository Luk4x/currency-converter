// request function
function get(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return request.responseText;
}

// currency API
const request = currency => {
    let url = `https://free.currconv.com/api/v7/convert?q=${currency}&compact=ultra&apiKey=6b6c6149f67139c54d38`;
    const api = get(url);
    const apiJ = JSON.parse(api);
    return apiJ[currency];
};

// 2° Select.
const option = document.getElementById('to-coins');
// foreign country flag image
const convertedCurrencyImage = document.getElementById('converted-image');
// currency name and value in real (under the flag image)
const convertedCurrencyName = document.querySelector('.converted-symbol-name');
// currency symbol and value converted
const convertedValue = document.querySelector('.converted-value');
let currencyModel = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
// initial select quotation (euro)
let quotation = request('EUR_BRL');
convertedCurrencyName.textContent = `Euro (R$ ${quotation.toFixed(3).replace('.', ',')})`;
// input value on content
const userValue = document.getElementById('user-value');
// input value on result
const toConvertValue = document.querySelector('.to-convert-value');
// button
const convertButton = document.querySelector('.convert-button');

// changing elements according to the selected option
option.addEventListener('change', () => {
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
    convertedCurrencyName.textContent = `${currencyName} (R$ ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quotation)})`;
    convertedValue.innerHTML = `${currencyModel.format(0)}`;
});

// converting action
const convert = () => {
    if (userValue.value == '') {
        userValue.style.borderColor = 'red';
        toConvertValue.textContent = 'R$ 0,00';
        convertedValue.innerHTML = `${currencySymbol} 0.00`;
    } else {
        userValue.style.borderColor = '#3b3c47';
        result = parseFloat(userValue.value) / quotation;
        toConvertValue.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(parseFloat(userValue.value));
        convertedValue.innerHTML = `${currencyModel.format(result)}`;
    }
};

convertButton.addEventListener('click', convert);
