
    // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    // Some data we can work with

    const inventors = [
        { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
        { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
        { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
        { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
        { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
        { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
        { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
        { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
        { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
        { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
        { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
        { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
      ];
  
      const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick', 'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', 'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi', 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken', 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];
      
      // Array.prototype.filter()
      // 1. Filter the list of inventors for those who were born in the 1500's
    let fifteenHundreds = inventors.filter(people => people.year >= 1500 && people.year < 1600);
      console.log(fifteenHundreds);
      // Array.prototype.map()
      // 2. Give us an array of the inventors' first and last names
    let fullName = inventors.map(element => `${element.first} ${element.last}`);
      console.log(fullName);
      // Array.prototype.sort()
      // 3. Sort the inventors by birthdate, oldest to youngest
    let sortBirth = inventors.sort((a,b) => {
            return a.year > b.year ? 1 : -1;
        } );
    console.table(sortBirth);
      // Array.prototype.reduce()
      // 4. How many years did all the inventors live?
    let inventorsYear = inventors.reduce((total, current) => {
        return total + (current.passed - current.year);
        },0);
    console.log(inventorsYear);
      // 5. Sort the inventors by years lived
    const yearsLived = inventors.sort((a,b) => {
        let aInvetor = a.passed - a.year;
        let bInvetor = b.passed - b.year;
        return aInvetor > bInvetor ? 1 : -1;
    });
    console.table(yearsLived);
      // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
      // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    const category = document.querySelector('.mw-category');
    console.log(category);
  
      // 7. sort Exercise
      // Sort the people alphabetically by last name
    const lastName = people.sort((a,b) => {
        let [aFirst, aLast] = a.split(', ');
        let [bFirst, bLast] = b.split(', ');

        return aLast > bLast ? 1 : -1;
    });
    console.table(lastName);
      // 8. Reduce Exercise
      // Sum up the instances of each of these
      const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
  
      const tranportation = data.reduce(function(obj, transport)  {
        if(!obj[transport]) {
            obj[transport] = 0;
        }
        obj[transport]++;
        return obj;
      },{});
    console.log(tranportation);