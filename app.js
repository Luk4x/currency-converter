// error: API limit function
const error = apiMessage => {
    // custom select
    const customOption = document.querySelectorAll('.custom-select');
    // 1° Select.
    const realOption = document.getElementById('from-coins');

    convertedCurrencyName.textContent = `Euro (R$ ?)`;
    convertedValue.innerHTML = apiMessage;
    convertedValue.style.fontSize = '16px';
    realOption.disabled = true;
    option.disabled = true;
    customOption.forEach(element => {
        element.style.opacity = '0.7';
    });
    userValue.style.opacity = '0.7';
    userValue.disabled = true;
    convertButton.style.opacity = '0.7';
    convertButton.disabled = true;
};

// API
const request = async currency => {
    const data = await fetch('http://economia.awesomeapi.com.br/json/last/EUR-BRL,USD-BRL,JPY-BRL').then(res => res.json());
    return data[currency].high;
};

// 2° Select.
const option = document.getElementById('to-coins');
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

const initialEuro = async () => {
    const euroQuotation = await request('EURBRL');
    convertedCurrencyName.textContent = `Euro (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(euroQuotation)})`;
};
initialEuro();

// changing elements according to the selected option
option.addEventListener('change', async () => {
    // requesting quotations
    const euroQuotation = await request('EURBRL');
    const dollarQuotation = await request('USDBRL');
    const YenQuotation = await request('JPYBRL');

    meme = document.querySelector('.dollarLessThan5');

    // resetting input
    userValue.value = '';

    // foreign country flag image
    const convertedCurrencyImage = document.getElementById('converted-image');

    let newSrc = '';
    let currencyName = '';
    let quotation = 0;

    if (option.selectedIndex === 0) {
        newSrc = './assets/europe-flag.ico';
        currencyName = 'Euro';
        quotation = euroQuotation;
        currencyModel = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
        meme.style.opacity = '0';
    } else if (option.selectedIndex === 1) {
        newSrc = './assets/us-flag.svg';
        currencyName = 'Dollar';
        quotation = dollarQuotation;
        currencyModel = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
        if (quotation < 5) meme.style.opacity = '0.85';
    } else if (option.selectedIndex === 2) {
        newSrc = './assets/japan-flag.svg';
        currencyName = 'Yen';
        quotation = YenQuotation;
        currencyModel = new Intl.NumberFormat('jp-JP', { style: 'currency', currency: 'JPY' });
        meme.style.opacity = '0';
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
const convert = async () => {
    // requesting quotations
    const euroQuotation = await request('EURBRL');
    const dollarQuotation = await request('USDBRL');
    const YenQuotation = await request('JPYBRL');

    let quotation = 0;

    if (option.selectedIndex === 0) {
        quotation = euroQuotation;
    } else if (option.selectedIndex === 1) {
        quotation = dollarQuotation;
    } else if (option.selectedIndex === 2) {
        quotation = YenQuotation;
    }

    if (userValue.value == '') {
        userValue.style.borderColor = '#980d0d';
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
