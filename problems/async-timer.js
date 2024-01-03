
const users ["nisha@gmail.com", "sneha@gmail.com", "sam@gmail.com");
function delay(user){

return new Promise(resolve

setTimeout(function(){

resolve( Email sent to ${user}");  1000);

})

}

async function sendEmail(){

for(user of users){

const confirmation await delay(user):

console.log(confirmation);

}

console.log('Email sent to all the users...)

}

sendEmail():