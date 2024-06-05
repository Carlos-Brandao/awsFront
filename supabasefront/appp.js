const productList = document.querySelector('#products');
const addProductForm = document.querySelector('#add-product-form');
const updateProductForm = document.querySelector('#update-product-form');
const updateProductId = document.querySelector('#update-id');
const updateProductName = document.querySelector('#update-name');
const updateProductPrice = document.querySelector('#update-price');

var inputName = document.getElementById('name');
var inputDesc = document.getElementById('description');
var inputPrice = document.getElementById('price');

// Function to fetch all products from the server
async function fetchProducts() {
  const response = await fetch('http://3.88.13.145:3000/products');
  const products = await response.json();

  // Clear product list
  productList.innerHTML = '';

  // Add each product to the list
  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `${product.name} - $${product.price} - Desc:${product.description}`;

    // Add update button for each product
    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Update';
    updateButton.id = "upd";
    updateButton.addEventListener('click',  () => {
      
        inputDesc.value = product.description;
        inputName.value = product.name;
        inputPrice.value = product.price;
        produtoID = product.id;
     // updateProductId.value = product.id;
     // updateProductName.value = product.name;
    //  updateProductPrice.value = product.price;
      
    });
    li.appendChild(updateButton);

    productList.appendChild(li);
  });
}


// Event listener for Add Product form submit button
addProductForm.addEventListener('submit', async event => {
  //event.preventDefault();
  var name = addProductForm.elements['name'].value;
  const price = addProductForm.elements['price'].value;
  const description = addProductForm.elements['description'].value;
  addProduct(name,price,description);
  deleteProduct(produtoID);

  //await updateProduct2(11,"BOZINHO", price, description);
  //addProductForm.reset();
  await fetchProducts();
});

// Function to add a new product
async function addProduct(name, price, description) {
  const response = await fetch('http://3.88.13.145:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, price, description })
  });
  return response.json();
}

// Function to delete a new product
async function deleteProduct(id) {
  const response = await fetch('http://3.88.13.145:3000/products/' + id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify({id})
  });
  return response.json();
}
// Function to add a new product
async function updateProduct(productId, name, price, description) {

  const response = await fetch('http://3.88.13.145:3000/products/' + productId, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name, description: description, price: price })
  });
  return response.json();
}

async function updateProduct2(productId, name, price, description) {

}


// Fetch all products on page load
fetchProducts();
