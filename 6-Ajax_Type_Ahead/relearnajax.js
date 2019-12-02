//  get the database from github
const endpoint =
  'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

//  convert from JSON to readable data
const citiesDatabase = [];
const databasePromise = fetch(endpoint)
  .then(blob => blob.json()) // response type from the url
  .then(data => citiesDatabase.push(...data));
console.log(databasePromise);
//  search cities/state based on criteria(chars)

function searchCities(inputChar, database) {
  //  filter the database
  return database.filter(place => {
    const regex = new RegExp(inputChar, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  // change the numbers to commas
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const inputForm = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions-box');

function displayCities() {
  const input = this.value;
  const output = searchCities(input, citiesDatabase); // return filtered array
  const addList = output
    .map(place => {
      const regex = new RegExp(input, 'gi');
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${input}</span>` // highlight the matched char
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${input}</span>`
      );
      const population = numberWithCommas(place.population);
      //  return it to the HTML;
      return `<li> <span class="name">${cityName}, ${stateName}</span><span class="population">${population}</span></li>`;
    })
    .join(''); // to return text, we need to join it, if not addition of comma will be inputted to suggestions box too
  suggestionsBox.innerHTML = addList;
}

inputForm.addEventListener('change', displayCities);
inputForm.addEventListener('keyup', displayCities);
