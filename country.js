const countryPageContainer = document.querySelector(".country-page-container");
const back = document.querySelector(".back");
back.addEventListener("click", ()=> {
    history.back()
})

const theme = document.querySelector(".theme");

theme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (theme.textContent.trim() === "Dark Mode") {
        theme.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mode`
    } else {
        theme.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode`
    }
});

const countryName = new URLSearchParams(location.search).get("name");
console.log(countryName);

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((country) => {
    console.log(country[0]);
    
    const countryPage = document.createElement("div");
    countryPage.classList.add("country-page");
    countryPage.innerHTML = `
    <div class="country-page">
            <div class="flag">
              <img src=${country[0].flags.svg} alt="" />
            </div>
            <div class="details-container">
              <h3 class="country-page-title">${country[0].name.common}</h3>
              <div class="title-details">
                <div class="left-details">
                  <p><b>Native Name: </b>${country[0].name.official}</p>
                  <p><b>Population: </b>${country[0].population.toLocaleString(
                    "en-In"
                  )}</p>
                  <p><b>Region: </b>${country[0].region}</p>
                  <p><b>Sub Region: </b>${country[0].subregion}</p>
                  <p><b>Capital: </b>${country[0].capital}</p>
                </div>
                <div class="right-details">
                  <p><b>Top Level Domain: </b>${country[0].tld[0]}</p>
                  <p><b>Currencies: </b>${Object.values(country[0].currencies)[0].name}</p>
                  <p><b>Languages: </b>${Object.values(country[0].languages).join(", ")}</p>
                </div>
              </div>
              <div class="border-countries">
                  <b>Border Countries: </b>
              </div>
            </div>
          </div>`;
    countryPageContainer.append(countryPage);
    if (country[0].borders){
      country[0].borders.forEach(border => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then(res => res.json())
        .then(data => {
          const borderCountries = document.querySelector(".border-countries");
            const borderName = document.createElement("a");
            borderName.innerHTML = `${data[0].name.common}`;
            borderName.href = `country.html?name=${data[0].name.common}`
            borderCountries.append(borderName);
        })
      });
      
    }
  });
