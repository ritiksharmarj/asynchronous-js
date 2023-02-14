'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const renderCountryData = (data, className = '') => {
   const html = `
        <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
               data.population / 1000000
            ).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(
               data.languages
            ).join(', ')}</p>
            <p class="country__row"><span>💰</span>${
               Object.values(data.currencies).at(0).name
            }</p>
          </div>
        </article>
   `;

   countriesContainer.insertAdjacentHTML('beforeend', html);
   countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = (country) => {
   // AJAX call for country
   const request = new XMLHttpRequest();
   request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
   request.send();

   request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);

      // Render country
      renderCountryData(data);

      // Get neighbour country
      const neighbour = data.borders?.[0];

      if (!neighbour) return;

      // AJAX call for neighbour countries
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function () {
         const [data2] = JSON.parse(this.responseText);
         console.log(data2);

         renderCountryData(data2, 'neighbour');
      });
   });
};

getCountryAndNeighbour('India');
