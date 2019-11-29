const menuList = document.querySelector('.list-container');
const inputForm = document.querySelector('.form-container');
const items = JSON.parse(localStorage.getItem('items')) || [];


function submitItem(e) {
    e.preventDefault();
    const text = this.querySelector('input[type=text]').value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(menuList, items);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(foodMenu, foods = []) {
    foodMenu.innerHTML = foods.map((food, i) => {
        return `
        <li class="list">
            <input type="checkbox" name="" id="item${i}" data-index = ${i} ${food.done ? 'checked' : '' }>
            <label for="item${i}"> ${food.text}</label>
        </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;
    const elem = e.target;
    const index = elem.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(menuList, items);
}


inputForm.addEventListener('submit', submitItem);
menuList.addEventListener('click', toggleDone);
populateList(menuList, items);