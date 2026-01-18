/*
const cart = [
    {
        productId : "P1200",
        quantity : 2,
        price : 1000,
        name : "Aloe cream",
        altNames : ['aloe' , 'cream'],
        image : "https://images.com/image-sample.jpg"
    }
]
*/

export function getCart(){
    let cartInstring = localStorage.getItem("cart")

    if(cartInstring == null){
        cartInstring = "[]"
        localStorage.setItem("cart" , cartInstring)
    }

    const cart = JSON.parse(cartInstring)
    return cart;
}


export function addToCart(product , qty){
    const cart = getCart()

    //Check existing products - same as map --> findIndex...
    const existingProductIndex = cart.findIndex((item)=>{
        return item.productId == product.productId
    })

    if(existingProductIndex == -1){
        cart.push(
            {
                productId : product.productId,
                quantity : qty,
                price : product.price,
                name : product.name,
                altNames : product.altNames,
                image : product.images[0]
            }
        )
        localStorage.setItem("cart" , JSON.stringify(cart))
    }else{
        const newQty = cart[existingProductIndex].quantity + qty

        if(newQty <= 0){
            const newCart = cart.filter(((item , index)=>{
                return index !== existingProductIndex;
            }))

            localStorage.setItem("cart" , JSON.stringify(newCart))
        }else{
            cart[existingProductIndex].quantity = newQty
            localStorage.setItem("cart" , JSON.stringify(cart))
        }
    }
}

export function getTotal(){
    const cart = getCart()
    let total = 0
    cart.forEach((item) => {
        total += item.price*item.quantity
    })

    return total;
}

export function getTotalQuantity(){
    const cart = getCart()
    let totalQuantity = 0
    cart.forEach((item) => {
        totalQuantity += item.quantity
    })

    return totalQuantity;
}