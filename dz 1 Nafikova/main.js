const products = [
    {
        id:1,
        title: 'Macbook',
        price: 2500,
        image: "img/macbook.jpeg"
    },
    {
        id:2,
        title: 'Iphone',
        price: 1300,
        image: "img/iphone.jpeg"
    },
    {
        id:3,
        title: 'Airpods',
        price: 300,
        image: "img/airpods.jpeg"
    },
    {
        id:4,
        title: 'Watch',
        price: 400,
        image: "img/watch.jpeg"
    },
];

const renderProduct = (item) =>  `
    <div class="product-item">
        <h3 class="product-name">${item.title}</h3>
        <p class="product-price">${item.price}</p>
        <img class="product-img" src=${item.image}>
    </div>
`

const renderPage = list => {
    const productList = list.map(item => renderProduct(item)).join(' ');
    //console.log(productList);
    document.querySelector('.products').innerHTML = productList;
}

renderPage(products);