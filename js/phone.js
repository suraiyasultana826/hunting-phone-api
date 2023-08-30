
const loadPhone = async (searchText = 13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones)
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones)


    const phoneContainer = document.getElementById('phone-container')

    //clear phone container cars before adding new cards;
    phoneContainer.textContent = '';

    //display show all button if there are more than 12 phones
   const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden')
    }
    else{
        showAllContainer.classList.add('hidden')
    }

    //display only first 12 phones
    phones = phones.slice(0,12);

    



    phones.forEach(phone => {
        // console.log(phone);
        //2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
       //3.set innerHTML
        phoneCard.innerHTML = `
        
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick='handleShowDetails("${phone.slug}")' class="btn btn-primary">Show Details</button>
                      </div>
                </div>
        `;
        //4.append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpinner(false);


}

//
const handleShowDetails = async(id) => {
    console.log('show', id);
    //load single data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `<img src = '${phone.image}' alt =''/>
    // <p><span> Storage: ${phone?.mainFeatures?.storage}</span></p>
    `
    // show the modal
    show_details_modal.showModal()
}

//handle search button
const handleSearch = () => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-dots');
   if(isLoading){
    loadingSpinner.classList.remove('hidden')
   }
   else{
    loadingSpinner.classList.add('hidden')
   }
}

loadPhone('04');