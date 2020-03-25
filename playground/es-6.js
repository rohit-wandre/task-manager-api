//object property shorthand
const name='Rohit'
const userAge=21
const user={
    name,//if varaible name is same as property of an object then we don't have to write
                    //the value of it..simply writing the variable name would also work!
    age:userAge,
    location:'Bhopal'
}
console.log(user)

//Object destructuring
const product={
    label:'Red Notebook',
    price:3,
    stock:201,
    salePrice:undefined,
    rating:4.2
}
//const label=product.label
//const stock=product.stock

const{label:productLabel,stock,rating=5}=product
console.log(productLabel)
console.log(stock)
console.log(rating)

const transaction=(type,{label,stock})=>{
    console.log(type,label,stock)
}
transaction('order',product)
