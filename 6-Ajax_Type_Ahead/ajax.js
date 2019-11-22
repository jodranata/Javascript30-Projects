//database for cities
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


//get the cities database to our data;
const cities = [];

//get the database from the endpoint
const promise = fetch(endpoint)
                .then(blob => blob.json())
                .then(data => cities.push(...data));


function searchCities(searchInput, citiesDatabase) {
    return citiesDatabase.filter(place => {//return the filtered citiesDatabase we want based on searchInput
        //place is the object inside of cities variable (array);
        //search the citiesDatabase using searchInput as Regex
        const regex = new RegExp(searchInput, 'gi');
        return place.city.match(regex) || place.state.match(regex);

});}


function numberWithCommas(x) { // change the numbers to commas
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//take the input and ul from the HTML
const inputSearch = document.getElementById('search-input');
const suggestionsBox = document.getElementById('suggestions-box');

//used displayFilteredCities Function every time we typed into the input box
inputSearch.addEventListener('change', displayFilteredCities);
inputSearch.addEventListener('keyup', displayFilteredCities);

//get the value from what we typed  and
//return the output cities and state based on the value
function displayFilteredCities() {
    //used searchCities to filter the cities database(object) using the value we typed in input(HTML). and assign it to matchedCities variable 
    const matchedCities = searchCities(this.value, cities);
    
    //the matchedCities will be outputted to HTML, but first we assign what we want to return to html to addList
    const addList = matchedCities.map(place => {
        const regex = new RegExp (this.value, 'gi'); //using the value we typed to be outputted to HTML. (example we typed bos, it'll outputted boston & bossies, with bos is highlighted)
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);//highlight the character in matchedCities based on what we typed
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);//higlight the state
        const population = numberWithCommas(place.population);//get the population of the matched cities
        //return it to the HTML
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span> 
                <span class="population">${population}</span>
            </li>
            `;
    }).join('');
    suggestionsBox.innerHTML = addList; //change the ul and li in the suggestion-box HTML
}
