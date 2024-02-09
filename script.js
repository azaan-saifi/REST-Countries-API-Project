const countriesContainer = document.querySelector(".countries-container")

fetch("https://restcountries.com/v3.1/all")
.then(res => res.json())
.then((data) => {
    console.log(data[0])
    data.forEach(country => {
        
        const countryCard = document.createElement("a")
        countryCard.classList.add("country-card")
        countryCard.setAttribute("href", `country.html?name=${country.name.common}`)
        countryCard.innerHTML = `
        <img src=${country.flags.svg} alt="">
                        <div class="card-content">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p><b>Population: </b>${country.population.toLocaleString('en-In')}</p>
                            <p><b>Region: </b>${country.region}</p>
                            <p><b>Capital: </b>${country.capital?.[0]}</p>
                        </div>`
        countriesContainer.append(countryCard)
    });

})
