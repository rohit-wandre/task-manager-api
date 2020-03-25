//const square=(x)=>x*x
//console.log(square(9994555))
//arrow  function agar niche use karenge toh
//name woh name property ko access nahi kar payega....
const event={
    name:'Birthday party',
    guestList:['rohit','ravi','raj'],
    printGuestList(){
        console.log('Guest List for '+this.name)
        this.guestList.forEach((guest) => {//arrow  functions don't bind their this value
                                            //they access this value in the context in which
                                            //they are created
            console.log(guest+' is attending '+this.name)
        })
    }
}
event.printGuestList()