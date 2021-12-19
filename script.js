// import btnSortAB from "./btn-sortAB.png"
// import btnSortBA from "./btn-sortBA.png"

class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isToggleOn:false,
            isToggleOnSign:false,
            products:this.props.products,
            cart:[ {
                name: "tomat",
                cost: 5,
                quantity: 10,
                img: "tomato.jpg",
                id: 1,
                desciption: "Pomidor kak pomidor",
                spec: {
                    color: "red",
                    name: "black Prince",
                    size: "small",
        
                }
            },
        ],
        };
        this.cartToggle=this.cartToggle.bind(this);
        this.signToggle=this.signToggle.bind(this);
        this.cartToggleSign=this.cartToggle.bind(this);
        this.addToCart=this.addToCart.bind(this);
        this.removeFromCart=this.removeFromCart.bind(this);
        this.toggleQuantity=this.toggleQuantity.bind(this);

    }
    cartToggle() {
       this.setState(state => ({
           isToggleOn: !this.state.isToggleOn,
       }));
    }
    signToggle() {
       this.setState(state => ({
           isToggleOnSign: !this.state.isToggleOnSign,
       }));
    }
//////////////////////////////////////////
    addToCart(productId) {
       let products = Object.assign([], this.state.products);
       let cart = Object.assign([], this.state.cart);
        let product = products.filter(product => product.id==productId)[0];
        let cartProduct = cart.filter(product => product.id==productId)[0];


        if(product.quantity==0){
            return;
        }
        product.quantity--;
        this.setState({products:products});
        if(cartProduct){
           cartProduct.quantity++;
 
            this.setState({
                cart:cart,
            });
        }
        else{
            let newProduct = Object.assign({}, product)
            newProduct.quantity=1;
            cart=cart.concat(newProduct);

            this.setState({
                cart:cart,
            });
            
        }
        // console.log(product);

    }


    removeFromCart(productId, quantity) {
       let cart = Object.assign([], this.state.cart);
        cart = cart.filter(product => product.id!=productId);

       let products = Object.assign([], this.state.products);
        let product = products.filter(product => product.id==productId)[0];

        product.quantity+=quantity;




       this.setState({
           cart:cart,
            products:products,
    });

    }

    toggleQuantity(productId, add, quantity){
        let products = Object.assign([], this.state.products);
       let cart = Object.assign([], this.state.cart);
        let product = products.filter(product => product.id==productId)[0];
        let cartProduct = cart.filter(product => product.id==productId)[0];
        let sumQuantity = cartProduct.quantity + product.quantity;

        if(quantity>sumQuantity) {
                product.quantity=0;
                cartProduct.quantity=sumQuantity;

                this.setState({
                    cart:cart,
                    products:products,
                })
            }
       else if(quantity>0) {
        cartProduct.quantity=quantity;
        product.quantity=sumQuantity-quantity;

        this.setState({
            cart:cart,
            products:products,
        })
       }

       else if (quantity==0) {
           this.removeFromCart(productId, cartProduct.quantity);
           return;

          
       }

        else {

            if(add==true){
                this.addToCart(productId);   
            }
    
            else {
                if (cartProduct.quantity==1){
                    this.removeFromCart(productId, 1);
                    return;
                } 
                else{
                    cartProduct.quantity--;
                    product.quantity++;
    
                    this.setState({
                        cart:cart,
                        products:products,
    
                    })
                }
                
            }
        }

       
        
    }

    render() {
        return (
        <div>
            <header>
             <div className="container">
                <div className="header__inner">
                    <div className="header__logo">
                        <img className="logo_white" src="./logos_white.png" />
                    </div>
                <ul className="nav">
                   <li><a href="#" className="nav__link">Home</a></li>
                   <li> <a href="#" className="nav__link">Stock</a></li>
                   <li> <a href="#" className="nav__link">Economy</a></li>
                   <li><a href="#" className="nav__link">Vegetables
                   <ul>
                       <li><a href="#" className="nav__link">Tomato</a></li>
                       <li><a href="#" className="nav__link">Cucumber</a>
                       <ul>
                           <li><a href="#" className="nav__link">Local</a></li>
                           <li><a href="#" className="nav__link">Imported</a></li>
                       </ul>
                       
                       </li>
                       <li><a href="#" className="nav__link">Onion</a></li>
                 </ul>
                       </a></li> 
                   <li> <a href="#" className="nav__link">Drink</a></li>
                   <li> <a href="#" className="nav__link">Meat</a></li>
                    <li><a href="#" className="nav__link">Sign in
                    
                    </a></li>
                    <a href="#" className="nav__link"><button onClick={this.cartToggle} className="cart__btnon" ><i className="fas fa-shopping-cart"></i></button></a>
                    <a href="#" className="nav__link"><button onClick={this.signToggle} className="cart__btnon" >Sign In</button></a>
                

                </ul>
               
            </div>
        </div>
        
    </header>
            

                <div className="container">
                    <div className="filter">
                <div className="dropdown__limit">
                        <p className="label" >Limit: 10</p>
                            <img src="./dropdown-arrow.png" alt="" />
                            <ul className="item_list-limit">
                                <li className="drop_item">Limit: 5</li>
                                <li className="drop_item">Limit: 10</li>
                                <li className="drop_item">Limit: 15</li>
                                <li className="drop_item">Limit: 20</li> 
                            </ul>
                        </div>
                        <button className="btn-sort"><img src="./btn-sortAB.png" alt="" /></button>
                        <button className="btn-sort"><img src="./btn-sortBA.png" alt="" /></button>  
                         </div>  
                 <Products products={this.state.products} addToCart={this.addToCart}/>
                 <Cart isToggleOn={this.state.isToggleOn} cart={this.state.cart} removeFromCart={this.removeFromCart} toggleQuantity={this.toggleQuantity} cartToggle={this.cartToggle}/>
                 <SignIn isToggleOnSign={this.state.isToggleOnSign} cart={this.state.cart} signToggle={this.signToggle}/>
                 
                 </div>

                    <div className="container">
                    <div className="footer">
                        <div className="footer__inner">
                             <h2>Footer</h2>
                        <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt u</h4>
                        </div>

                        <div className="contact">
                            <div className="contact__item">
                                <div className="contact__img">
                                    <img src="./footer-1.png"/>
                                </div>
                                <div className="contact__info">Nobinagar savar,Dhaka Bangladesh</div>
                            </div>
                            <div className="contact__item">
                                    <div className="contact__img">
                                        <img src="./footer-2.png" alt=""/>
                                    </div>
                                
                                    <div className="contact__info">+8801743331996
                                        +8801928737807</div>
                                </div>
                            <div className="contact__item">
                        <div  className="contact__img">
                            <img src="./footer-3.png" alt=""/>
                        </div>
              
                        <div className="contact__info">quickmasud@gmail.com
                            quickmasud@yahoo.com</div>
                    </div>
                        </div>

                         <form action="" method="POST" className="contact__data">
                    <input className="contact__name" type="text" placeholder="Your NAME"/>
                     <input className="contact__email" type="email" placeholder="Your Email"/> 
                    <textarea className="contact__mes" name="" id="" placeholder="Write Message"></textarea>
                    <input className="contact__submit" type="submit" value="send"/>
                </form>
                       
                    </div>

                    </div>
               

            </div>
                
            
            
        )
    }
}

// class IconCart extends React.Component{
//     render() {
//         return (
//             <svg className="cart_box" enable-background="new 0 0 512 512" height="32" width="32" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><path d="m472 452c0 11.046-8.954 20-20 20h-20v20c0 11.046-8.954 20-20 20s-20-8.954-20-20v-20h-20c-11.046 0-20-8.954-20-20s8.954-20 20-20h20v-20c0-11.046 8.954-20 20-20s20 8.954 20 20v20h20c11.046 0 20 8.954 20 20zm0-312v192c0 11.046-8.954 20-20 20s-20-8.954-20-20v-172h-40v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-192v60c0 11.046-8.954 20-20 20s-20-8.954-20-20v-60h-40v312h212c11.046 0 20 8.954 20 20s-8.954 20-20 20h-232c-11.046 0-20-8.954-20-20v-352c0-11.046 8.954-20 20-20h60.946c7.945-67.477 65.477-120 135.054-120s127.109 52.523 135.054 120h60.946c11.046 0 20 8.954 20 20zm-121.341-20c-7.64-45.345-47.176-80-94.659-80s-87.019 34.655-94.659 80z"/></g></svg>
//         )
//     }
// }

class Products extends React.Component {
    constructor(props){
        super(props)
        this.state={
            counter:7,
        }
        this.seeMore=this.seeMore.bind(this)
    }
    seeMore(){
        if(this.state.counter<this.props.products.length) {
            this.setState(state =>({
                counter:state.counter+4
            }))

        }
    }
    render() { 
       let prodFilter = this.props.products.filter((product, index) => {
        return (index>this.state.counter)?  false: true ;

       })
        return (
            <div>
            <div className="products">
                {prodFilter.map(product =>
                    <Product product={product} key={product.id} addToCart={this.props.addToCart}/>
                    )}   
                 </div>
                 <button className="seeMore" onClick={this.seeMore}>See more</button>
            </div>
        )

    }
}

class Cart extends React.Component {
//     constructor(props) {

//     }
//    modalClose(e) {
//     if (e.target!=)
//    }
    render() {
        let toggle="";
       
        if (this.props.isToggleOn){
            toggle = "active";  
        }


        let totalSum=this.props.cart.reduce((sum, product) => sum+product.cost*product.quantity, 0);
       

        return(
           
                <div className={`cart ${toggle}`}>
                   <div className="modalContent">
                    <div className="cart__header">
                        <div className="cart__title">Cart</div>
                    <button className="cart__close" onClick={this.props.cartToggle}><img src="close.png" alt="" width="20px" /></button>
                    </div>
                    <div className="cart__body">
                    <div className="cart__list">
                        <div className="cart__list-item">Delete</div>
                        <div className="cart__list-item">Name</div>
                        <div className="cart__list-item">Cost</div>
                        <div className="cart__list-item">Quantity</div>
                        <div className="cart__list-item">Sum</div>
                    </div>
                    <hr />
                   {this.props.cart.map(product => 
                    <CartItem cartItem={product} key={product.id} removeFromCart={this.props.removeFromCart} toggleQuantity={this.props.toggleQuantity}/>
                    )}
                    <hr />
                    </div>
                    
                    <p className="cart__total">{totalSum} $</p>

                    <div className="cart__footer">
                        <button className="cart__btn">continue</button>
                        <button className="cart__btn">checkout</button>
                    </div>
                    
                </div>
            </div>
                
            
        )
    }
}


class SignIn extends React.Component {
//     constructor(props) {

//     }
//    modalClose(e) {
//     if (e.target!=)
//    }
    render() {
        let toggle="";
       
        if (this.props.isToggleOnSign){
            toggle = "active";  
        }


        let totalSum=this.props.cart.reduce((sum, product) => sum+product.cost*product.quantity, 0);
       

        return(
           
                <div className={`cart ${toggle}`}>
                   <div className="modalContent">
                    <div className="cart__header">
                        <div className="cart__title">Sign In</div>
                    <button className="cart__close" onClick={this.props.signToggle}><img src="close.png" alt="" width="20px" /></button>
                    </div>
                     <div className="signIn">
                        <h1 class="page__title  page__title--center">Вход</h1>

<form action="" class="form  form--auth" method="POST">
    <div class="cabinet__form">
        
    
        <div class="form__group  form__group--md">
            <input type="email" class="form__control" placeholder="Ваш e-mail" />
            <span class="form__line"></span>
        </div>
    
        <div class="form__group  form__group--md">
            <input type="password" class="form__control" placeholder="Пароль" />
            <span class="form__line"></span>
        </div>
    
       
    </div>


    <div class="form__footer  form__footer--center">
        <div class="form__group  form__group--md">
             <button  class="btn btn--blue btn--rounded btn--sm" type="submit">Войти</button>
      </div>
      
    </div>
</form>
                        </div> 
                    
                </div>
            </div>
                
            
        )
    }
}

class Product extends React.Component {


    render() {
        
        
        return (
            
            <div className="product">
                <div className="product_img">
                    <img src={this.props.product.img} alt={this.props.product.name} />
                </div>

                <div className="product_info" >
                    <h2 className="product_name">{this.props.product.name}</h2>
                    
                   
                    <p className="product_desciption">{this.props.product.desciption}</p>
                    <ul className="product_spec">
                        {Object.entries(this.props.product.spec).map((spec,index) => <li className="product_spec-item" key={index}>{spec[0]}:{spec[1]}</li>)}
                    </ul>
                    <p className="product_quantity">{this.props.product.quantity}qt.</p>
                </div>

                <div className="footer_product">
                
                    <p className="product_cost">{this.props.product.cost}$</p>
                 
                   
                <button className="btn" onClick={()=>{this.props.addToCart(this.props.product.id)}}>Добавить</button>
                </div>
             
            </div>

        )


    }
}
class CartItem extends React.Component {
    constructor(props){
        super(props);
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e) {
        if(e.target==""){
            return;
        }
        else {
            this.props.toggleQuantity(this.props.cartItem.id, true, +e.target.value);
        }
    }

    render() {
        return(
            <div className="cart__products">
                        <button className="cart__delete" onClick={()=>{this.props.removeFromCart(this.props.cartItem.id, this.props.cartItem.quantity)}} ><img src="delete.png" alt="" /></button>
                        <div className="cart__mini">
                        <a href="#" className="cart__link"><img className="cart__img" src={this.props.cartItem.img}alt="" />{this.props.cartItem.name}</a>
                        </div>
                        <p className="cart__cost">{this.props.cartItem.cost} $</p>
                        <div className="cart__quantity">
                            <button className="cart__quantity-btn" onClick={()=>{this.props.toggleQuantity(this.props.cartItem.id,true)}}>+</button>
                            <input className="label" value={this.props.cartItem.quantity} onChange={this.handleChange}/>
                            <button className="cart__quantity-btn" onClick={()=>{this.props.toggleQuantity(this.props.cartItem.id,false)}}>-</button>
                        </div>
                        <p className="cart__sum">{this.props.cartItem.cost * this.props.cartItem.quantity} $</p>
                    </div>
        )
    }
}

let products = [
    {
        name: "tomat",
        cost: 5,
        quantity: 10,
        img: "tomato.jpg",
        id: 1,
        desciption: "Pomidor kak pomidor",
        spec: {
            color: "red",
            name: "black Prince",
            size: "small",

        }
    },
    {
        name: "cucumber",
        cost: 2,
        quantity: 10,
        img: "cucumber.jpg",
        id: 2,
        desciption: "Cucumber, prosto cucumber",
        spec: {
            color: "green",
            name: "altaisky",
            size: "small",

        }
    },
    {
        name: "onion",
        cost: 1,
        quantity: 10,
        img: "onion.jpg",
        id: 3,
        desciption: "Onion privat",
        spec: {
            color: "yellow",
            name: "shalot",
            size: "small",

        }
    },
    {
        name: "cabbage",
        cost: 6,
        quantity: 10,
        img: "cabbage.jpg",
        id: 4,
        desciption: "Cabbage but not kashenaya",
        spec: {
            color: "green",
            name: "white Kachannaya",
            size: "big",

        }
    },
    {
        name: "carrot",
        cost: 3,
        quantity: 10,
        img: "carrot.jpg",
        id: 5,
        desciption: "Carrote",
        spec: {
            color: "orange",
            name: "dragon",
            size: "small",

        }
    },
    {
        name: "latuk",
        cost: 2,
        quantity: 10,
        img: "latuk.jpg",
        id: 6,
        desciption: "like in Skyrim but not it",
        spec: {
            color: "green",
            name: "latuk?",
            size: "small",

        }
    },
    {
        name: "potato",
        cost: 5,
        quantity: 10,
        img: "Potato.jpg",
        id: 7,
        desciption: "Nahrena ti tu bulbu na noch el?",
        spec: {
            color: "brown",
            name: "belorusskaya",
            size: "small",

        }
    },
    {
        name: "tsukini",
        cost: 4,
        quantity: 10,
        img: "tsukini.jpg",
        id: 8,
        desciption: "pochty kak kabachok",
        spec: {
            color: "green",
            name: "btsukini",
            size: "middle",

        }
    },
    {
        name: "tomat",
        cost: 5,
        quantity: 10,
        img: "tomato.jpg",
        id: 9,
        desciption: "Pomidor kak pomidor",
        spec: {
            color: "red",
            name: "black Prince",
            size: "small",

        }
    },
    {
        name: "tomat",
        cost: 5,
        quantity: 10,
        img: "tomato.jpg",
        id: 10,
        desciption: "Pomidor kak pomidor",
        spec: {
            color: "red",
            name: "black Prince",
            size: "small",

        }
    },
  
]





ReactDOM.render(
    <App products={products} />,
    
    document.querySelector('#root')

)