const currencyEl_top = document.getElementById('currency-top');
const currencyEl_bottom = document.getElementById('currency-bottom');
const amountEl_top = document.getElementById('amount-top');
const amountEl_bottom = document.getElementById('amount-bottom');

const rateEl = document.getElementById('rate');
const btnSwap = document.getElementById('swap');

// Fetch exchange rate and update the DOM
const carculate = async function () {
  const currencyTop = currencyEl_top.value;
  const currencyBottom = currencyEl_bottom.value;

  const res = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${currencyTop}`
  );
  const data = await res.json();
  const rate = data.rates[currencyBottom];

  rateEl.innerHTML = `1 ${currencyTop} = ${rate} ${currencyBottom}`;
  amountEl_bottom.value = (amountEl_top.value * rate).toFixed(2);
};

// Swap rate and carculate
const swap = function () {
  const temp = currencyEl_top.value;
  currencyEl_top.value = currencyEl_bottom.value;
  currencyEl_bottom.value = temp;

  carculate();
};

// Event listeners
currencyEl_top.addEventListener('change', carculate);
amountEl_top.addEventListener('input', carculate);
currencyEl_bottom.addEventListener('change', carculate);
amountEl_bottom.addEventListener('input', carculate);

btnSwap.addEventListener('click', swap);

carculate();
