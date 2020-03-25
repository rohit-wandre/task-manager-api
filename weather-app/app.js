//showing Asynchronous behaviour....
//Node.js is Asynchronous as it need not be executing the code line by line
//waiting for previous command or function to be executed completly and then
//the execution of rest of the program take place...


console.log('Starting...')
setTimeout(()=>{
    console.log('2 second timer')
},2000)
console.log('Ending...')

//Here we can see the Asynchronous behaviour of our program Starting & Ending will
//print first and then after 2 seconds the callback function will be executed...

//functions or code can be executed irrespective of their order in which they are written