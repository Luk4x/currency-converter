const convert = () => {
    const userValue = document.getElementById('user-value');
    const toConvertValue = document.querySelector('.to-convert-value');
    toConvertValue.textContent = `R$ ${parseFloat(userValue.value).toFixed(2).replace('.', ',')}`;
    const convertedValue = document.querySelector('.converted-value');
    const option = document.getElementById('to-coins');
    const convertedImage = document.getElementById('converted-image');
    const convertedCoinName = document.querySelector('.converted-symbol-name');
    let result = 0;
    let symbol = ``;
    let newSrc = '';
    let coinName = '';
    if (option.selectedIndex === 0) {
        result = parseFloat(userValue.value) * 5.54;
        symbol = `&#8364;`;
        newSrc = './assets/europe-flag.ico';
        coinName = 'Euro';
    } else if (option.selectedIndex === 1) {
        result = parseFloat(userValue.value) * 5.08;
        symbol = `&#36;`;
        newSrc = './assets/us-flag.svg';
        coinName = 'Dollar';
    } else if (option.selectedIndex === 2) {
        result = parseFloat(userValue.value) * 198721.78;
        symbol = `&#8383;`;
        newSrc = './assets/bitcoin-symbol.svg';
        coinName = 'Bitcoin';
    } else if (option.selectedIndex === 3) {
        result = parseFloat(userValue.value) * 0.043;
        symbol = '&#165;';
        newSrc = './assets/japan-flag.svg';
        coinName = 'Yen';
    }
    convertedImage.src = newSrc;
    convertedCoinName.textContent = coinName;
    convertedValue.innerHTML = `${symbol} ${result.toFixed(2)}`;
};
const convertButton = document.querySelector('.convert-button');
convertButton.addEventListener('click', convert);
