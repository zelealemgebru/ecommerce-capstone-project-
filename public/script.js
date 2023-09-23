//get a parties
const fakestore = document.querySelector('#fakestore');
const GetAllfakestoreProducts = document.querySelector('#fakestoreProducts');
const GetfakestoreSingleProducts = document.querySelector('#fakestoresingleproducts');
const GetfakestoreCarts = document.querySelector('#fakestoreCarts');
const fakestoreNewProducts = document.querySelector('#fakestorenewProducts');
//API URL
const GETALLPRODUCTS_API_URL =
  'https://fakestoreapi.com/allproducts';
const SINGLEPRODUCTS_API_URL =
  'https://fakestoreapi.com/singleproducts';
  const DELETEPRODUCTS_API_URL =
  'https://fakestoreapi.com/products/6';
const GETALLUSERS_API_URL =
  'https://fakestoreapi.com/getallusers';
const SINGLEGETALLUSERS_API_URL =
  'https://fakestoreapi.com/singleusers';
const SORTRESULTS_API_URL =
  'https://fakestoreapi.com/sortresult';
const GETALLCATEGORIES_API_URL =
  'https://fakestoreapi.com/getallcategories';
const GETINECATEGORIES_API_URL =
  'https://fakestoreapi.com/singlecategories';
const ADDNEWPRODUCTS_API_URL =
  'https://fakestoreapi.com/addnewproducts';
const UPDATEPRODUCTS_API_URL =
  'https://fakestoreapi.com/updateproducts';
const GETALLCARTS_API_URL =
  'https://fakestoreapi.com/getallcarts';
const GETSINGLECARTS_API_URL =
  'https://fakestoreapi.com/getsinglecarts';
const ADDNEWCARTS_API_URL =
  'https://fakestoreapi.com/addnewcarts';
const UPDATECARTS_API_URL =
  'https://fakestoreapi.com/updatecarts';
const GETSINLGECARTS_API_URL =
  'https://fakestoreapi.com/getsinglecarts';

// get all products
const getAllProducts = async () => {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}`)
    .then(res=>res.json())
    .then(json=>console.log(json))  
     return products
  } catch (error) {
    console.error(error)
  }
};

// get single party by id
const getProductsById = async (id) => {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`);
    then(res=>res.json())
    .then(json=>console.log(json))
    return singleproducts;
  } catch (error) {
    console.error(error);
  }
};

// delete party by id
const deleteproducts = async (id) => {
  try {
    const product = await fetch(`${PRODUCTS_API_URL}/${id}`, {
      method: "DELETE"
  })
  const products = await product/6.
  .then(res=>res.json())
  .then(json=>console.log(json))
} catch (error) {
  console.log(error)
}
};
// render a single party by id
   const renderSinglePartyById = async (id) => {
  try {
    // fetch party details from server
    const party = await getPartyById(id);

    // GET - /api/workshop/guests/party/:partyId - get guests by party id
    const guestsResponse = await fetch(`${GUESTS_API_URL}/party/${id}`);
    const guests = await guestsResponse.json();

    // GET - /api/workshop/rsvps/party/:partyId - get RSVPs by partyId
    const rsvpsResponse = await fetch(`${RSVPS_API_URL}/party/${id}`);
    const rsvps = await rsvpsResponse.json();

    // GET - get all gifts by party id - /api/workshop/parties/gifts/:partyId -BUGGY?
    // const giftsResponse = await fetch(`${PARTIES_API_URL}/party/gifts/${id}`);
    // const gifts = await giftsResponse.json();

    // create new HTML element to display party details
    const partyDetailsElement = document.createElement('div');
    partyDetailsElement.classList.add('party-details');
    partyDetailsElement.innerHTML = `
            <h2>${party.name}</h2>
            <p>${party.location}</p>
            <p>${party.time}</p>
            <h3>Guests:</h3>
            <ul>
            ${guests
              .map(
                (guest, index) => `
              <li>
                <div>${guest.name}</div>
                <div>${rsvps[index].status}</div>
              </li>
            `
              )
              .join('')}
          </ul>

        `; {
    partyContainer.appendChild(partyDetailsElement);
    const DetailButton = document.createElement("button");
    DetailButton.innertext = 'details'
        }

    // add event listener to close button
      
      closeButton.addEventListener('click', () => {
      partyDetailsElement.remove();
    });
  } catch (error) {
    console.error(error);
  }
};

// render all parties
const renderParties = async (parties) => {
  try {

    parties.forEach((party) => {
      const partyElement = document.createElement('div');
      partyElement.classList.add('party');
      partyElement.innerHTML = `
                <h2>${party.name}</h2>
                <p>${party.description}</p>
                <p>${party.date}</p>
                <p>${party.time}</p>
                <p>${party.location}</p>
                <button class="details-button" data-id="${party.id}">See Details</button>
                <button class="delete-button" data-id="${party.id}">Delete</button>
            `;
            
const backButton = document.createElement('button')
backButton.innerText = "back"
      
      partyContainer.appendChild(partyElement);
// see details

  const DetailsButton = partyElement.querySelector('.details-button');
  DetailsButton.addEventListener('click', async (event) => {
  const partyid = event.preventDefault(Defoult)
await renderSinglePartyById(partyid,partyElement)
});
      // delete party
      const deleteButton = partyElement.querySelector('.delete-button');
      deleteButton.addEventListener('click', async (event) => {
        const partyid = event.target.dataset.id
        await deleteParty(partyid)

      });
    });
  } catch (error) {
    console.error(error);
  }
};

// init function
const init = async () => {
  const allParties = await getAllParties();
  renderParties(allParties);
};

init();
