const searchInput = document.getElementById('searchInput');
const searchbtn = document.getElementById('search-btn');
const countryContainer = document.getElementById('country-container');
const errordiv = document.getElementById('error');
const countryDetails = document.getElementById('country-details');



searchbtn.addEventListener('click', function () {
    const search = searchInput.value;
    if (search === '') {
        errordiv.innerText = 'NoT Found';
        countryContainer.innerHTML = '';
        countryDetails.innerHTML = '';
        return;
    }
    searchInput.value = '';
    const url = `https://restcountries.eu/rest/v2/name/${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaydata(data))
})



const displaydata = items => {
    console.log(items);
    if (items.status === 404) {
        errordiv.innerText = 'result not found'
        countryContainer.innerHTML = '';
        countryDetails.innerHTML = '';
        return;
    }
    else {
        errordiv.innerText = '';
    }
    // console.log('found')
    // console.log(items);
    items.forEach(item => {
        // console.log(item.flag)
        countryContainer.textContent = '';
        countryDetails.textContent = '';
        const div = document.createElement('div');
        div.classList.add('col-md-3');
        div.innerHTML = `
        <div class="rounded overflow-hidden border p-2">
        <img src="${item.flag}" class="w-100" alt="" />
    </div>

    <div class="
py-2
d-flex
justify-content-between
align-items-center
d-md-block
text-md-center
">
        <h1>${item.name}</h1>
        <button onclick="showdetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
    </div>
        `;
        countryContainer.appendChild(div);
    });


};

const showdetails = alpha => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${alpha}`)
        .then(res => res.json())
        .then(data => displaydetails(data))
}

const displaydetails = details => {

    countryDetails.innerHTML =
        `<div class="col-md-12">
        <h1>${details.name}</h1>
        <p>City:${details.capital}</p>
        <p>Currencies:${details.currencies[0].symbol}</p>
    </div>
    `;

}
