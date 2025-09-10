const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById('spinner').classList.remove("hidden");
    document.getElementById('tree-container').classList.add('hidden');
  } else {
    document.getElementById('tree-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}


const loadCatagory = () => {

  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};

const removeActive = () => {
  const catButtons = document.querySelectorAll('.cat-btn');
  // console.log(catButton)
  catButtons.forEach(btn => btn.classList.remove('active'));
};

const loadPlantsCard = id => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActive(); //remove all active class
      const clickBtn = document.getElementById(`category-btn-${id}`);
      clickBtn.classList.add('active'); //add active class
      displayPlantsCard(data.plants);
    });
};

const displayPlantsCard = cards => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  console.log(cards);
  cards.forEach(plant => {
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="card bg-white p-5 gap-3">
            <img class="rounded-2xl" src="${plant.image}" alt="">
            <h3 onclick="loadCardDetail(${plant.id})" class="font-bold">${
      plant.name
    }</h3>
            <p class="text-[#1F2937] line-clamp-2">${plant.description}</p>
            <div class="flex justify-between items-center">
              <h4 class="bg-[#DCFCE7] text-[#15803D] p-2 font-medium rounded-2xl px-5">${
                plant.category
              }</h4>
              <p class="font-semibold">৳${plant.price}</p>
            </div>
            <button onclick='addToCart(${JSON.stringify(
              plant
            )})' class="bg-[#15803D] text-white rounded-[20px] py-[10px] mt-[2px]">Add to Cart</button>
          </div>
    `;
    cardContainer.append(card);
  });
  manageSpinner(false);
};

const displayCategories = trees => {
  const catList = document.getElementById('cat-list');
  // categoryList.innerHTML = '';
  for (let tree of trees) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button id="category-btn-${tree.id}" onclick="loadPlantsCard(${tree.id})" class="cat-btn bg-transparent text-[#1F2937] rounded-[4px] w-full py-3 px-3 font-medium text-left hover:bg-[#15803D] hover:text-white">${tree.category_name}</button>
    `;
    catList.append(btnDiv);
  }
};

loadCatagory();

const allPlants = () => {
  const url = 'https://openapi.programming-hero.com/api/plants';
  fetch(url)
    .then(res => res.json())
    .then(data => displayAllPlants(data.plants));
};

const displayAllPlants = plants => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  for (let plant of plants) {
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="card bg-white p-5 gap-3">
            <img class="rounded-2xl items-center" src="${plant.image}" alt="">
            <h3 onclick="loadCardDetail(${plant.id})" class="font-bold ">${
      plant.name
    }</h3>
            <p class="text-[#1F2937] line-clamp-2">${plant.description}</p>
            <div class="flex justify-between items-center">
              <h4 class="bg-[#DCFCE7] text-[#15803D] p-2 font-medium rounded-2xl px-5">${
                plant.category
              }</h4>
              <p class="font-semibold">৳${plant.price}</p>
            </div>
            <button onclick='addToCart(${JSON.stringify(
              plant
            )})' class="bg-[#15803D] text-white rounded-[20px] py-[10px] mt-[2px]">Add to Cart</button>
          </div>
    `;
    cardContainer.append(card);
  }
};
allPlants();

const loadCardDetail = async id => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  console.log(url);
  const res = await fetch(url);
  const details = await res.json();
  displayCardDetails(details.plants);
};

const displayCardDetails = plant => {
  console.log(plant);
  const detailsBox = document.getElementById('details-container');
  detailsBox.innerHTML = `
  <h2 class="text-2xl font-bold">${plant.name}</h2>
        <img class="items-center rounded-2xl my-[10px]" src="${plant.image}" alt="">
        <p><span class="font-bold">Category:</span> ${plant.category}</p>
        <p><span class="font-bold">Price:</span> ৳${plant.price}</p>
        <p><span class="font-bold">Description:</span> ${plant.description}</p>
  `;
  document.getElementById('plant_modal').showModal();
};


// Global cart list
let cart = [];

// Add to cart function
const addToCart = (plant) => {
  // cart array তে push
  cart.push(plant);
  displayCart();
};

// Remove from cart function
const removeFromCart = (index) => {
  cart.splice(index, 1); // index অনুযায়ী remove
  displayCart();
};



// Display cart items
const displayCart = () => {
  const cartContainer = document.querySelector('.add-cart-container');
  cartContainer.innerHTML = `
    <h1 class="font-bold mb-3">Your Cart</h1>
    <div id="cart-items"></div>
    <hr class="my-2">
    <h2 class="font-semibold text-right">Total: ৳${getTotalPrice()}</h2>
  `;

  const itemsDiv = cartContainer.querySelector('#cart-items');

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className =
      "bg-[#F0FDF4] text-[#8C8C8C] p-2 flex justify-between items-center my-2 rounded";

    div.innerHTML = `
      <div>
        <h3 class="font-semibold text-black">${item.name}</h3>
        <p>৳${item.price} x 1</p>
      </div>
      <i onclick="removeFromCart(${index})" class="fa-solid fa-xmark cursor-pointer"></i>
    `;

    itemsDiv.appendChild(div);
  });
};

// Total price
const getTotalPrice = () => {
  return cart.reduce((total, item) => total + item.price, 0);
};
