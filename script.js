const balance = document.querySelector('.balance');

window.onload = async function () {
  const response = await fetch('./data.json');
  const data = await response.json();

  let hash = {};
  let totalAmount = 0;

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    hash = {
      ...hash,
      [element.day]: element.amount
    }
    totalAmount += element.amount;
  }

  console.log(hash, totalAmount);
  const days = [...document.querySelectorAll('[data-day]')];
  days.map(day => {
    const height = hash[day.dataset.day] >= 100 ? '100%' : `${hash[day.dataset.day]}%`;
    day.insertAdjacentHTML('afterbegin', `
      <div class="graph--column" data-amount="$${hash[day.dataset.day]}" style="height: ${height};">
      </div>
    `)
  });

  balance.innerHTML = `$${totalAmount.toFixed(2)}`;
};