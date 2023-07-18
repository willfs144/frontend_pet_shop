const API_URL_GET_PRODUCTS = 'https://willfs144.pythonanywhere.com/productos/getproducts';
const API_URL_USER_LOGIN = 'https://willfs144.pythonanywhere.com/dj-rest-auth/login/'
const API_URL_DELETE_PRODUCT = (idProduct) => `https://willfs144.pythonanywhere.com/productos/deleteproduct/${idProduct}`

const message = document.getElementById("message");

function loadBtns() {
    btnLogin.onclick = () => loginUser();    
    message.style.display = 'none';
}

async function loadProduct() {
    const res = await fetch(API_URL_GET_PRODUCTS);
    const data = await res.json();
    console.log(data);
    

    if(res.status !== 200) {
         messageErrorAPI(res,data.message);
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');

        img1.src = data[0].image;
        img2.src = data[1].image;
        img3.src = data[2].image;
    }
}


async function loginUser() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    console.log("login: "+username+" "+password);
    const res = await fetch(API_URL_USER_LOGIN,{
        method: 'POST',
        headers: {
             'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }), 
    });

    const data = await res.json();
    console.log("login");
    console.log(res);
    if (res.status !== 200) {
        messageErrorAPI(res,data.message);        
    } else {
        messageSuccesAPI("Bienvenido: ", username);
        login.style.display = 'none';
    }
}

async function listProduct() {
    const res = await fetch(API_URL_GET_PRODUCTS);
    const data = await res.json();
    console.log(data);
    
    if(res.status !== 200) {
         messageErrorAPI(res, data.message);
    } else {
        const boxContainerElement = document.getElementById('box-container-products');
        boxContainerElement.innerHTML = "";
        data.forEach(product => {       
            
        // Crea el primer div con la clase "box"   
        const divBox = document.createElement("div");
        divBox.className = 'box';        
            // Crea el segundo div con la clase "icons"
            const divIcons = document.createElement("div");      
            divIcons.className = 'icons';                
            addIconsProduct(divIcons, product.id);
             // Crea el segundo div con la clase "image"
            const divImage = document.createElement("div");      
            divImage.className = 'image';

            addImageProduct(product,divImage);
            // Crea el cuarto div con la clase "content"
            const divContent = document.createElement('div');
            divContent.className = 'content';

             addDetailProduct(product,divContent);
        // Agrega todos los divs como hijos del elemento padre
        divBox.appendChild(divIcons);
        divBox.appendChild(divImage);
        divBox.appendChild(divContent);
        
        boxContainerElement.appendChild(divBox);
        });    
    }
}

async function deleteProduct(idProduct) {
    const res = await fetch(API_URL_DELETE_PRODUCT(idProduct), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    console.log('Delete');
    console.log(res);

    if (res.status !== 204) {
        console.log("Error producto eliminar: " + res.status);
        listProduct();
    } else { 
        console.log("producto eliminado");
        listProduct();
    }
}

function messageErrorAPI(res, msg) {
    message.style.display = "block";
    message.classList.add("alert","alert-danger", "alert-dismissible", "fade", "show");
    const btnMessage = document.createElement("button");
    btnMessage.type = "button";
    btnMessage.classList.add("btn-close");
    btnMessage.setAttribute("data-bs-dismiss", "alert");
    btnMessage.setAttribute("aria-label", "Close");
    message.innerText = "Error " + res.status + " " + msg;
    message.appendChild(btnMessage);
    
}

function messageSuccesAPI(messageData, resultData) {
    message.style.display = "block";
    message.classList.add("alert","alert-danger", "alert-dismissible", "fade", "show");
    const btnMessage = document.createElement("button");
    btnMessage.type = "button";
    btnMessage.classList.add("btn-close");
    btnMessage.setAttribute("data-bs-dismiss", "alert");
    btnMessage.setAttribute("aria-label", "Close");
    message.innerText = messageData+" " + resultData;
    message.appendChild(btnMessage);
}

function addIconsProduct(divIcons, idProduct){
// Crea los elementos <a> con las clases y href correspondientes
    const link1 = document.createElement('a');
    link1.href = '#';
    link1.className = 'fas fa-shopping-cart';

    const link2 = document.createElement('a');
    link2.href = '#';
    link2.className = 'fas fa-heart';

    const link3 = document.createElement('a');
    link3.href = '#';
    link3.id = "deleteProduct";
    link3.onclick = () => deleteProduct(idProduct);
    link3.className = 'fas fa-trash';
            
divIcons.appendChild(link1);
divIcons.appendChild(link2);
divIcons.appendChild(link3);
}

function addImageProduct(product,divImage) {
// Crea el elemento <img>
    const image = document.createElement('img');

    // Verifica si el producto tiene una imagen
    if (product.image) {
        image.src = product.image;
        image.alt = "Imagen del producto";
    } else {
        image.src = 'image/footer_background.jpg';
        image.alt = "Default Image";
    }
    // Agrega el elemento <img> como hijo del tercer div
divImage.appendChild(image);
}

function addDetailProduct(product, divContent) {
// Crea el elemento <h3> con el título del producto
    const h3 = document.createElement('h3');
    h3.innerText = product.title;

    // Crea el elemento <div> con el precio del producto
    const priceDiv = document.createElement('div');
    priceDiv.className = 'amount';
    priceDiv.innerText = product.price;

// Agrega los elementos <h3> y <div> como hijos del cuarto div
divContent.appendChild(h3);
divContent.appendChild(priceDiv);   
}


loadBtns();
loadProduct();
listProduct();

