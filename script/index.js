const loadCatagory = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(json => displayCategories(json.categories));
};

const loadPlantsCard = (id) =>{
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayPlantsCard(data.plants));
}

const displayPlantsCard = (cards) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";
  console.log(cards);
  cards.forEach((plant) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="card bg-white p-5 gap-3">
            <img class="rounded-2xl" src="${plant.image}" alt="">
            <h3 class="font-bold ">${plant.name}</h3>
            <p class="text-[#1F2937] line-clamp-2">${plant.description}</p>
            <div class="flex justify-between items-center">
              <h4 class="bg-[#DCFCE7] text-[#15803D] p-2 font-medium rounded-2xl px-5">${plant.category}</h4>
              <p class="font-semibold">৳${plant.price}</p>
            </div>
            <button class="bg-[#15803D] text-white rounded-[20px] py-[10px] mt-[2px]">Add to Cart</button>
          </div>
    `;
    cardContainer.append(card);
  })
  
}


const displayCategories = (trees) => {
  const catList = document.getElementById('cat-list');
  // categoryList.innerHTML = '';
  for (let tree of trees) {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
    <button onclick="loadPlantsCard(${tree.id})" class="bg-transparent text-[#1F2937] rounded-[4px] w-full py-3 px-3  text-[15px] font-medium text-left hover:bg-[#15803D] hover:text-white">${tree.category_name}</button>
    `;
    catList.append(btnDiv);
  }
};
loadCatagory();


const allPlants = () => {
  const url = 'https://openapi.programming-hero.com/api/plants'
  fetch(url)
    .then(res => res.json())
    .then(data => displayAllPlants(data.plants));
}

const displayAllPlants = (plants) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  for (let plant of plants) {
    const card = document.createElement('div');
    card.innerHTML = `
    <div class="card bg-white p-5 gap-3">
            <img class="rounded-2xl h-50 w-50 items-center" src="${plant.image}" alt="">
            <h3 class="font-bold ">${plant.name}</h3>
            <p class="text-[#1F2937] line-clamp-2">${plant.description}</p>
            <div class="flex justify-between items-center">
              <h4 class="bg-[#DCFCE7] text-[#15803D] p-2 font-medium rounded-2xl px-5">${plant.category}</h4>
              <p class="font-semibold">৳${plant.price}</p>
            </div>
            <button class="bg-[#15803D] text-white rounded-[20px] py-[10px] mt-[2px]">Add to Cart</button>
          </div>
    `;
    cardContainer.append(card);
  }
}
allPlants();