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
        this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this._getSumPrice();//метод определяет суммарную стоимость всех товаров на странице
        this.render();//вывод товаров на страницу
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Macbook', price: 2500, image: "img/macbook.jpeg"},
            {id: 2, title: 'Iphone', price: 1300, image: "img/iphone.jpeg"},
            {id: 3, title: 'Airpods', price: 300, image: "img/airpods.jpeg"},
            {id: 4, title: 'Watch', price: 400, image: "img/watch.jpeg"},
        ];
    }
    _getSumPrice(){
        let sumPrice = 0;
        for (let product of this.goods){
            sumPrice += product.price;
        }
        console.log(`Сумма товаров равна ${sumPrice}`);
    }
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
//              block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.image = product.image;
    }
    render(){
        return `<div class="product-item">
                <img class="product-img" src="${this.image}">
                <h3 class="product-name">${this.title}</h3>
                <p class="product-price">${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}
let list = new ProductList();

class Bucket{
    constructor() {
        this.items =[]; //список товаров
        this.clearBucket(); //очистка корзины
        this.sumPrice(); // суммарная стоимость всех товаров в корзине
        this.render(); //вывод корзины на страницу
    }
    clearBucket(){}
    sumPrice(){}
    render(){}
}
class BucketItem{
    constructor(item) {
        this.title = item.title;
        this.id = item.id;
        this.price = item.price;
        this.img = img;
        this.removeItem();// удаление товара из корзины
        this.addTheSame();// добавление такого же товара в корзину
    }
    render(){}
}