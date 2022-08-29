const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// const products = [
//     {
//         id:1,
//         title: 'Macbook',
//         price: 2500,
//         image: "img/macbook.jpeg"
//     },
//     {
//         id:2,
//         title: 'Iphone',
//         price: 1300,
//         image: "img/iphone.jpeg"
//     },
//     {
//         id:3,
//         title: 'Airpods',
//         price: 300,
//         image: "img/airpods.jpeg"
//     },
//     {
//         id:4,
//         title: 'Watch',
//         price: 400,
//         image: "img/watch.jpeg"
//     },
// ];
//
// const renderProduct = (item) =>  `
//     <div class="product-item">
//         <h3 class="product-name">${item.title}</h3>
//         <p class="product-price">${item.price}</p>
//         <img class="product-img" src=${item.image}>
//     </div>
// `
//
// const renderPage = list => {
//     const productList = list.map(item => renderProduct(item)).join(' ');
//     //console.log(productList);
//     document.querySelector('.products').innerHTML = productList;
// }
//
// renderPage(products);

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._getProducts()
        .then(data => { //data - объект js
             this.goods = data;
             this.render()
        });

        // this._fetchProducts();
        // this.getSum();//метод определяет суммарную стоимость всех товаров на странице
        // this.render();//вывод товаров на страницу
    }
    // _fetchProducts(){
    //     this.goods = [
    //         {id: 1, title: 'Macbook', price: 2500, image: "img/macbook.jpeg"},
    //         {id: 2, title: 'Iphone', price: 1300, image: "img/iphone.jpeg"},
    //         {id: 3, title: 'Airpods', price: 300, image: "img/airpods.jpeg"},
    //         {id: 4, title: 'Watch', price: 400, image: "img/watch.jpeg"},
    //     ];
    // }
    _getProducts(){

        return fetch(`${API}/catalogData.json`)
            .then(result=> result.json())
            .catch(error => {
                console.log(error);
            });
    }

    // getSum(){
    //     let sumPrice = 0;
    //     for (let product of this.goods){
    //         sumPrice += product.price;
    //     }
    //     console.log(`Сумма товаров равна ${sumPrice}`);
    // }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
        }
    }
}

class ProductItem{
    constructor(product, img='https://via.placeholder.com/200x150'){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        // this.img = product.img;
    }
    render(){
        return `<div class="product-item">
                <h3 class="product-name">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}


class Basket{
    constructor(container='.basket') {
        this.container = container;
        this.items =[]; //список товаров
        // this.clearBasket(); //очистка корзины
        // this.sumPrice(); // суммарная стоимость всех товаров в корзине
        this._getBasketItems()
        .then(data => { 
            this.items = data.contents;
            this.render()
       });
    }
    _getBasketItems(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.items){
            const item = new BasketItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
        }
    }
}
class BasketItem{
    constructor(product) {
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.quantity = product.quantity;
        // this.img = img;
        // this.removeItem();// удаление товара из корзины
        // this.addTheSame();// добавление такого же товара в корзину
    }
    render(){
        return `<div class="product-item">
                <h3 class="product-name">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <p class="product-quantity">${this.quantity}</p>
            </div>`
    }
}
let list = new ProductList();
let list2 = new Basket();

