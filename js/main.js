const formBody = document.getElementById('form-body');
const closeForm = document.getElementById('close-form');
const openForm = document.getElementById('open-form');
const formEdit = document.getElementById('form-body-edit');


closeForm.addEventListener('click', () => {
    formBody.style.top = '-1000px'; 
})
openForm.addEventListener('click', () => {
    formBody.style.top = '0';
})


const formUI = document.getElementById('form');
const listCarsUI = document.getElementById('show-cars-list');

let arrayCars = []


const createItem = (plate, brand, model, colour, year, price) => {
    let item = {
        plate,
        brand,
        model,
        colour,
        year,
        price
    }
    arrayCars.push(item)
    return item;
    
    
}

const saveDB = () => {
    localStorage.setItem('listCars', JSON.stringify(arrayCars));

    printDB();
}
// createItem(1, "ford", "auto", "blue", 2020, 2000);
// // console.log(createItem(1, "ford", "auto", "blue", 2020, 2000000000)); 
// console.log(arrayCars)

const printDB = () => {

    listCarsUI.innerHTML = '';

    arrayCars = JSON.parse(localStorage.getItem('listCars'));
    

    if (arrayCars === null) {
        arrayCars = [];
    } else {
        arrayCars.forEach(element => {
            listCarsUI.innerHTML += `<tr>
                                        <td><input type="checkbox"></td>
                                        <td>${element.plate}</td>
                                        <td>${element.brand}</td>
                                        <td>${element.model}</td>
                                        <td>${element.colour}</td>
                                        <td>${element.year}</td>
                                        <td>$ ${element.price}</td>
                                        <td><div>
                                                <i class="btn-primary edit fas fa-edit">edidt </i>
                                                <i class="btn-primary delete fas fa-trash-alt">delete</i>
                                            </div>
                                        </td>
                                    </tr>`
        });
    }
}

const deleteDB = (plate) => {
    let indexArray = arrayCars.findIndex((element) => element.plate === plate);
    arrayCars.splice(indexArray, 1);
    saveDB();
}
// const editDB = (text) => {

//     arrayCars = JSON.parse(localStorage.getItem('listCars'));
//     let ArrayEdit = arrayCars.findIndex((element) => element.plate === text);
//     document.getElementById('plateUI').value = arrayCars[ArrayEdit].plate;
//     document.getElementById('brandUI').value = arrayCars[ArrayEdit].brand;
//     document.getElementById('modelUI').value = arrayCars[ArrayEdit].model;
//     document.getElementById('colourUI').value = arrayCars[ArrayEdit].colour;
//     document.getElementById('yearUI').value = arrayCars[ArrayEdit].year;
//     document.getElementById('priceUI').value = arrayCars[ArrayEdit].price;
    

    
    
//     console.log(ArrayEdit)

//     let editButton = document.querySelector('.edit-button');
    
//     editButton.onsubmit = function () {
//     let task = indexAarray.value;
//         if (task) {
//             self.arrayCars.splice(index, 1, task.trim())
//         }
        
//     }
//     formEdit.style.display = 'block';
//     
//     saveDB();
    

// }




// envents

formUI.addEventListener('submit', (e) => {
    e.preventDefault();
    const plateUI  = document.getElementById('plate').value;
    const brandUI  = document.getElementById('brand').value;
    const modelUI = document.getElementById('model').value;
    const colourUI = document.getElementById('colour').value;
    const yearUI = document.getElementById('year').value;
    const priceUI = document.getElementById('price').value;


    createItem(plateUI, brandUI, modelUI, colourUI, yearUI, priceUI);
    saveDB();
    formUI.reset();
    formBody.style.top = '-1000px';

    // console.log(brandUI, modelUI, colourUI, yearUI, priceUI)
})



document.addEventListener('DOMContentLoaded', printDB);



listCarsUI.addEventListener('click', (e) => {

    e.preventDefault();

    
    if (e.target.innerHTML === 'edit' || e.target.innerHTML === 'delete') {
        let text = e.path[3].childNodes[3].innerHTML;
        if (e.target.innerHTML === 'delete') {
            //accion de eliminar
            deleteDB(text)
        }
        if (e.target.innerHTML === 'edit') {
            // accion de editar
            editDB(text);
        }
    }

})

