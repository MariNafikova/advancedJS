const API = 'https://raw./githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cartProducts: [],
        imgCart: 'https://via.placeholder.com/50x100',
        imgProduct: 'https://via.placeholder.com/200x150',
        userSearch: '',
        showCart: false,
        error: false
    },
    methods: {
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            /*this.products.forEach(el => {
                if(!this.filtered.includes(el)){
                    el.visible = false;
                } else {
                    el.visible = true;
                }
            }) */
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.error = true;
                })
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`) // В этом файле содержится условие удаления файлов из корзины в зависимости от значения result
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartProducts.find(product => item.id_product == product.id_product);
                        if(find){
                            find.quantity++;
                        } else{
                            this.$set(item, 'quantity',1)
                            this.cartProducts.push(item);
                        }
                    }
            })
        },
        remove(item){
            this.getJson(`${API}/addToBasket.json`) // В этом файле содержится условие удаления файлов из корзины в зависимости от значения result
                .then(data => {
                    if (data.result === 1) {
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(item), 1);
                        }
                    }
                })
        },
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let item of data){
                    // el.visible = true;
                    this.products.push(item);
                    this.filtered.push(item);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents){
                    this.cartProducts.push(el);
                }
            })
            
        // this.getJson(`getProducts.json`)
        //     .then(data => {
        //         for(let el of data){
        //             this.products.push(el);
        //         }
        //     })
    }
});
