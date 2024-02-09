const countryPageContainer = document.querySelector(".country-page-container");
const back = document.querySelector(".back");
back.addEventListener("click", ()=> {
    history.back()
})

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
                  <p><b>Currencies: </b>${country[0].Object.keys(obj.currencies)[0].name}</p>
                  <p><b>Languages: </b>${country[0].languages}</p>
                </div>
              </div>
              <div class="border-countries">
                  <b>Border Countries: </b>
              </div>
            </div>
          </div>`;
    countryPageContainer.append(countryPage);
    const borderCountries = document.querySelector(".border-countries");
    country[0].borders?.forEach((border) => {
      const borderName = document.createElement("span");
      borderName.innerHTML = `${border}`;
      borderCountries.append(borderName);
    });
  });
