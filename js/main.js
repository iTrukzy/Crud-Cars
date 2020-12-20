const formBody = document.getElementById('form-body');
const closeForm = document.getElementById('close-form');
const openForm = document.getElementById('open-form');


closeForm.addEventListener('click', () => {
    formBody.style.display = 'none'; 
})
openForm.addEventListener('click', () => {
    formBody.style.display = 'block';
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
                                        <td>${element.plate}</td>
                                        <td>${element.brand}</td>
                                        <td>${element.model}</td>
                                        <td>${element.colour}</td>
                                        <td>${element.year}</td>
                                        <td>$ ${element.price}</td>
                                        <td><div>
                                                <i class="btn-primary edit fas fa-edit">edit</i>
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
const editDB = (plate) => {
    let plateUI = arrayCars.findIndex((element) => element.plate === plate);

    formBody.style.display = 'block';

    

}




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
    formBody.style.display = 'none';

    // console.log(brandUI, modelUI, colourUI, yearUI, priceUI)
})



document.addEventListener('DOMContentLoaded', printDB);



listCarsUI.addEventListener('click', (e) => {

    e.preventDefault();

    

    if (e.target.innerHTML === 'edit' || e.target.innerHTML === 'delete') {
        let text = e.path[3].childNodes[1].innerHTML;
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








































// const cars = [
//     {
//         brand,
//         model,
//         colour,
//         year,
//         price
//     },
// ]

// function addCars() {
//     const brand  = document.getElementById('brand').value;
//     const model = document.getElementById('model').value;
//     const colour = document.getElementById('colour').value;
//     const year = document.getElementById('year').value;
//     const price = document.getElementById('price').value;


// }


// function printCars() {
//     let html = '';
//     html += `<tr>
//                 <td><img src="#" alt="Image" id="img"></td>
//                 <td>${brand}</td>
//                 <td>${model}</td>
//                 <td>${colour}</td>
//                 <td>${year}</td>
//                 <td>$ ${price}</td>
//                 <td><div>
//                         <button class="btn-primary edit"><i class="fas fa-edit"></i></button>
//                         <button class="btn-primary delete"><i class="fas fa-trash-alt"></i></button>
//                     </div>
//                 </td>
//             </tr>`
//     document.getElementById('show-cars-list').innerHTML = html;
// }
// printCars();