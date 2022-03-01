// Error Handle
const errorHandle = (errorId, displayProperty) => {
    document.getElementById('error-' + errorId).style.display = displayProperty;
}

// Spinner Handle
const spinnerAndResultHandle = (id, displayElement) => {
    document.getElementById(id).style.display = displayElement;
}
// Search button Function 
const searchPhone = () => {
    const searchText = document.getElementById('search-input');
    const searchPhoneName = searchText.value.toLowerCase();

    //    clear Search field
    searchText.value = '';

    // Check input is blank or not blank
    if (!searchPhoneName) {
        errorHandle('blank-input', 'block');
    }
    else {
        // get data by Api
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhoneName}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data))

        // when get data that time error display none
        errorHandle('blank-input', 'none');
        errorHandle('not-found', 'none');
        // data is loading display the spinner
        spinnerAndResultHandle('spinner', 'block');
        // when data is loading and spinner the display that time others elements display none
        spinnerAndResultHandle('result-container', 'none');
        spinnerAndResultHandle('phone-details', 'none');
    }
}

// Iteration phones array
const displayPhone = phones => {
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = '';
    // Phone Details
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';

    // Check the data is available
    if (phones.length == 0) {
        // data is not availbe then show the error
        errorHandle('not-found', 'block');
        // display the error and stop spinner
        spinnerAndResultHandle('spinner', 'none')
    }
    else {
        // Display the maximum 20 items
        if (!phones.length <= 20) {
            const phonesLength20 = phones.splice(0, 20);
            phonesLength20.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                    <div class="card w-75">
                        <img src="${phone.image}" class="card-img-top img-thumbnail w-75 mx-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${phone.phone_name}</h5>
                            <p class="card-text">Name: ${phone.brand}</p>
                            <button onclick="phoneDetails('${phone.slug}')" class="btn btn-success">Details</button>
                        </div>
                    </div>`;
                resultContainer.appendChild(div);
            })

        }
        else {
            // display when items under 20
            phones.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                    <div class="card w-75">
                        <img src="${phone.image}" class="card-img-top img-thumbnail w-75 mx-auto" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title">Name: ${phone.phone_name}</h5>
                            <p class="card-text">Name: ${phone.brand}</p>
                            <button onclick="phoneDetails('${phone.slug}')" class="btn btn-success">Details</button>
                        </div>
                    </div>`;
                resultContainer.appendChild(div);
            })
        }
        // when find the phone that times error display none
        errorHandle('not-found', 'none');
        // When Spinner Loading Complete then Display Phone
        spinnerAndResultHandle('result-container', 'flex');
        // when display the phone then stop the spinner
        spinnerAndResultHandle('spinner', 'none');
    }
}


// Create a Method for Phone Details
const phoneDetails = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    const res = await fetch(url);
    const data = await res.json()
    displayPhoneDetail(data.data)
}

// Display phone information 
const displayPhoneDetail = info => {
    // Destructure phone info object
    const { storage, displaySize, chipSet, memory } = info.mainFeatures;
    const [first, second, third, fourth, fifth, sixth] = info.mainFeatures.sensors;
    const { WLAN, Bluetooth, GPS, NFC, Radio, USB } = info.others;

    // Get and set phone details by id
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
         <div class="card w-50 mx-auto">
                <div class="d-md-flex justify-content-center align-items-center shadow p-3">
                    <div>
                        <img src="${info.image}" class="img-fluid img-thumbnail" alt="">
                    </div>
                    <div class="ms-5">
                        <h4>Name: <b>${info.name}</b></h4>
                        <p>${info.releaseDate ? info.releaseDate : 'No Release Date Found'}</p>
                    </div>
                </div>
             <div class="card-header shadow">
                 <h4 class="text-info fw-bold">Main Features:-</h4>
             </div>
             <ul class="list-group list-group-flush">
                 <li class="list-group-item"><b>Storage:</b> ${storage}</li>
                 <li class="list-group-item"><b>Display Size:</b> ${displaySize}</li>
                 <li class="list-group-item"><b>ChipSet:</b> ${chipSet}</li>
                 <li class="list-group-item"><b>Memory:</b> ${memory}</li>
             </ul>
             <div class="card-header shadow">
                 <h4 class="text-info fw-bold">Sensors:-</h4>
             </div>
             <ul class="list-group list-group-flush">
                 <li class="list-group-item">${first}, ${second}, ${third}, ${fourth}, ${fifth}, ${sixth}</li>
             </ul>
             <div class="card-header shadow">
                 <h4 class="text-info fw-bold">Others:-</h4>
             </div>
             <ul class="list-group list-group-flush">
                 <li class="list-group-item"><b>WLAN:</b> ${WLAN}</li>
                 <li class="list-group-item"><b>Bluetooth:</b> ${Bluetooth}</li>
                 <li class="list-group-item"><b>GPS:</b> ${GPS}</li>
                 <li class="list-group-item"><b>NFC:</b> ${NFC}</li>
                 <li class="list-group-item"><b>Radio:</b> ${Radio}</li>
                 <li class="list-group-item"><b>USB:</b> ${USB}</li>
             </ul>
         </div>`;
    phoneDetails.appendChild(div);

    // When Spinner Loading Complete then show Phone Details
    spinnerAndResultHandle('phone-details', 'block');


    /* info.mainFeatures.sensors.forEach(sensor => console.log("1", sensor))
    console.log('hello')
    for (const key in info.others) {
        console.log("2", key)
    } */
}

