const list = document.querySelector('.list');
const input = document.querySelector('.input');
let workArray;


async function responseApi() {
  const response = await fetch(`https://gist.githubusercontent.com/VasilyMur/43ef6df83bba694f871f11a16ed7556d/raw/b6edff674e35452d6c57ec64177a558f7adb432e/moscowSubway.json`);
  const normalResponse = await response.json(response);
  const array = normalResponse.map(el => {
    return el.name;
  });
  
  return array;

}

async function dataToListHtml() {
  const arrayOfData = await responseApi();
  workArray = arrayOfData;
  arrayOfData.forEach(data => {
    const li = document.createElement('li');
    li.classList.add('list__item');
    li.textContent = data;
    list.append(li);
  });
}

function updateList(array) {
  const list = document.querySelector('.list');
  for (let i = 0; i < array.length; i++) {
    list.insertAdjacentHTML('beforeend', getTemplate(array[i]))
  }
}

function getTemplate(text) {
  return `
    <li class="list__item">${text}</li>
  `
}

dataToListHtml();

input.addEventListener('input', (e) => {
  const list = document.querySelector('.list');
  list.innerHTML = '';
  let filteredArray = workArray;
  const inputValue = e.currentTarget.value.toLowerCase();
  for (let i = 0; i < workArray.length; i++) {
    if(workArray[i].toLowerCase().startsWith(inputValue)) {
      filteredArray = workArray.filter(el => el === workArray[i]);
      updateList(filteredArray)
    }
  }


  
});



