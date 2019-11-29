const inputOrder = document.querySelector('.form-container');
const menuListing = document.querySelector('.list-container');
const orders = JSON.parse(localStorage.getItem('order')) || [];

function takeOrder(e) {
    e.preventDefault();
    let text = this.querySelector('input[type=text]').value;
    let order = {
        text,
        done: false
    };
    orders.push(order);
    saveOrder('order', orders, menuListing);
    this.reset();    
}

function displayOrder(menuList, orders = []) {
    menuList.innerHTML = orders.map((order, i) => {
        return `
        <li class="list">
            <input type="checkbox" name="" id="item${i}" data-index = ${i} ${order.done ? 'checked' : '' }>
            <label for="item${i}"> ${order.text}</label>
        </li>
        `;
    }).join('');
}

function saveOrder(key, value, display) {
    localStorage.setItem(`${key}`, JSON.stringify(value));
    displayOrder(display, value);
}

function toggleChecked(e) {
    const food = e.target;
    if (!food.matches('input')) return;
    const foodIndex = food.dataset.index;
    orders[foodIndex].done = !orders[foodIndex].done;//click it to check or uncheck the order
    saveOrder('order', orders, menuListing);    
}
inputOrder.addEventListener('submit', takeOrder);
menuListing.addEventListener('click', toggleChecked);
displayOrder(menuListing, orders);