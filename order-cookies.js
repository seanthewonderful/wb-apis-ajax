import axios from 'axios';

async function orderCookies(evt) {
  evt.preventDefault();  // prevent 'submit' event from reloading the page

  const formData = {
    cookieType: document.querySelector("#cookie-type-field").value,
    qty: document.querySelector("#qty-field").value
  }

  const response = await axios.post('/order-cookies', formData);
  document.querySelector('#order-status').innerText = response.data.msg;
  document.querySelector('#order-total').innerText = "Total: $" + response.data.total.toFixed(2);
}

document.querySelector('#order-form').addEventListener('submit', orderCookies);