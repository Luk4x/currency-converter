// API
const getCurrency = async () => {
    const url = 'http://economia.awesomeapi.com.br/json/last/EUR-BRL,USD-BRL,JPY-BRL';

    try {
        const apiData = await fetch(url).then(res => res.json());
        return { euroQuotation: apiData['EURBRL'].high, dollarQuotation: apiData['USDBRL'].high, yenQuotation: apiData['JPYBRL'].high };
    } catch (err) {
        console.error('ErrOr:', err.message);
    }
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

// showing initial quotation (euro)
const initialQuotation = async () => {
    const quotations = await getCurrency();
    convertedCurrencyName.textContent = `Euro (${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(quotations.euroQuotation)})`;
};
initialQuotation();

// changing elements according to the selected option
option.addEventListener('change', async () => {
    meme = document.querySelector('.dollarLessThan5');
    const quotations = await getCurrency();

    // resetting input
    userValue.value = '';

    // foreign country flag image
    const convertedCurrencyImage = document.getElementById('converted-image');

    let newSrc = '';
    let currencyName = '';
    let quotation = '';
    switch (option.selectedIndex) {
        case 0:
            newSrc = './assets/europe-flag.ico';
            currencyName = 'Euro';
            quotation = quotations.euroQuotation;
            currencyModel = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
            meme.style.opacity = '0';
            break;

        case 1:
            newSrc = './assets/us-flag.svg';
            currencyName = 'Dollar';
            quotation = quotations.dollarQuotation;
            currencyModel = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
            if (quotation < 5) meme.style.opacity = '0.85';
            break;

        case 2:
            newSrc = './assets/japan-flag.svg';
            currencyName = 'Yen';
            quotation = quotations.yenQuotation;
            currencyModel = new Intl.NumberFormat('jp-JP', { style: 'currency', currency: 'JPY' });
            meme.style.opacity = '0';
            break;

        default:
            break;
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
    const quotations = await getCurrency();

    let quotation = '';
    switch (option.selectedIndex) {
        case 0:
            quotation = quotations.euroQuotation;
            break;

        case 1:
            quotation = quotations.dollarQuotation;
            break;

        case 2:
            quotation = quotations.yenQuotation;
            break;

        default:
            break;
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
