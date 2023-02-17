var chatbotHTML = `
<style>
body {
  position: relative;
}

#chat-bot {
    position: fixed;
    bottom: 2%;
    right: 1%;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
}

#send-button {
    /* width: 60px; */
    /* height: 60px; */
    font-size: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 20px;
    padding: 19px;
}

.chat-area {
    position: fixed;
    z-index: 9;
    bottom: 15%;
    right: 5px;
    min-width: 32%;
    max-width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 4px 0px #161d35;
    border-radius: 0;
    font-size: 16px;
    padding: 0;
    background: #fff;
}

#chat-window {
    height: 350px;
    overflow: auto;
    background: #f9f9f9;
    padding: 10px 20px;
}

#chatMsgOUtput p {
    padding: 10px 0px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
}

#chatMsgOUtput strong {
    color: #575ed8;
}

label {
    box-sizing: border-box;
    display: block;
    padding: 10px 20px;
}

.chat-input {
    padding: 10px 20px;
    margin: 0px;
    background: #fff;
    gap: 5px;
    position: relative;
}

#message {
    border-radius: 50px;
    width: 100%;
    background: #fff;
    padding: 15px;
    border: 1px solid #ccc;
    font-size: 16px;
}
</style>
<div class="chat-bot-area">
<div class="chat-area" id="chat-area-hideorshow">
    <div id="chat-window">
        <div id="chatMsgOUtput"></div>
    </div>
    <div class="d-flex flex-row justify-content-between chat-input">
            <input id="message" type="text" placeholder="Message" required />
            <button class="btn btn-primary" id="send-button"><i class='fa fa-paper-plane'></i></button>
    </div>
</div>
<div class="chat-button">
    <button class="btn btn-primary" onclick="chatBotArea()" id="chat-bot"><i class='fa fa-comments'></i></button>
</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></script>
`
var bodyHTML = document.body.innerHTML
bodyHTML = bodyHTML + chatbotHTML
document.body.innerHTML = bodyHTML

var headHTML = document.head.innerHTML
headHTML = headHTML + `
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>

    `
document.head.innerHTML = headHTML

var message = document.getElementById('message');
var btn = document.getElementById('send-button');
var chatMsgOUtput = document.getElementById('chatMsgOUtput');
let grievanceFlg = false;
let listFlg = false;
let i = 0;
const dataMsg = 'Hey, I am chat-bot. How can I help you?'
let ListFilterArr = []
const dataJson = [
    {
        img: 'https://img.staticmb.com/mbphoto/property/cropped_images/2022/Nov/25/Photo_h180_w240/61936505_4_PropertyImage833-0256378881996_180_240.jpg',
        title: 'Spaze Privy',
        amount: 100000,
        category: 'Villa',
        description: 'For sale ready to move in new builder floor in sushantlok 1 c - block plot size 215 sq yards east facing stilt plus four floors available upper ground floor',
        location: 'Gurgaon',
        fullLocation: 'Sushant Lok 1, Gurgaon, Delhi NCR',
        buyOrRent: 'Buy'
    },
    {
        img: 'https://img.staticmb.com/mbphoto/property/cropped_images/2022/Jul/29/Photo_h180_w240/62355437_1_149001f61a949daaef7a45166edb3e420201106124404976_180_240.jpg',
        title: 'Delhi Homes',
        amount: 120000,
        category: 'Villa',
        description: 'For sale ready to move in new builder floor in sushantlok 1 c - block plot size 215 sq yards east facing stilt plus four floors available upper ground floor',
        location: 'Gurgaon',
        fullLocation: 'Sushant Lok 1, Gurgaon, Delhi NCR',
        buyOrRent: 'Buy'
    },
    {
        img: 'https://img.staticmb.com/mbphoto/property/cropped_images/2022/Jul/29/Photo_h180_w240/62355437_1_149001f61a949daaef7a45166edb3e420201106124404976_180_240.jpg',
        title: 'Vista Tower',
        amount: 20000,
        category: 'Apartment',
        description: 'For sale ready to move in new builder floor in sushantlok 1 c - block plot size 215 sq yards east facing stilt plus four floors available upper ground floor',
        location: 'Jaipur',
        fullLocation: 'Sushant Lok 1, Gurgaon, Delhi NCR',
        buyOrRent: 'Rent'
    },
    {
        img: 'https://img.staticmb.com/mbphoto/property/cropped_images/2022/Jul/29/Photo_h180_w240/62355437_1_149001f61a949daaef7a45166edb3e420201106124404976_180_240.jpg',
        title: 'Shivalik C Tower',
        amount: 50000,
        category: 'Apartment',
        description: 'For sale ready to move in new builder floor in sushantlok 1 c - block plot size 215 sq yards east facing stilt plus four floors available upper ground floor',
        location: 'Kolkata',
        fullLocation: 'Sushant Lok 1, Gurgaon, Delhi NCR',
        buyOrRent: 'Rent'
    },
    {
        img: 'https://img.staticmb.com/mbphoto/property/cropped_images/2022/Jul/29/Photo_h180_w240/62355437_1_149001f61a949daaef7a45166edb3e420201106124404976_180_240.jpg',
        title: 'Universal Tower',
        amount: 1000000,
        category: '3BHK',
        description: 'For sale ready to move in new builder floor in sushantlok 1 c - block plot size 215 sq yards east facing stilt plus four floors available upper ground floor',
        location: 'South Delhi',
        fullLocation: 'Sushant Lok 1, Gurgaon, Delhi NCR',
        buyOrRent: 'Buy'
    }
]


const chatBotArea = () => {
    var x = document.getElementById("chat-area-hideorshow");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  } 


const appartmentFilter = async (type) => {

    chatMsgOUtput.innerHTML += `<p><strong> Me :</strong> ${type} Apartment </p>`
    message.value = ''
    ListFilterArr = [];
    i = 4;
    listFlg = true;
    grievanceFlg = false;
    ListFilterArr.push(type)
    chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${chatArr[i]} </p>`
}

const appartmentList = async () => {

    const dataArr = dataJson.filter(e =>
        e.buyOrRent === ListFilterArr[0] &&
        e.location.toLowerCase().trim() === ListFilterArr[1].toLowerCase().trim() &&
        e.category.toLowerCase().trim() === ListFilterArr[2].toLowerCase().trim() &&
        e.amount <= ListFilterArr[3] &&
        e.amount >= ListFilterArr[4]);

    let arrHtml = ``

    dataArr.map(e => {
        arrHtml += `
        <div class="card" style="width: 18rem;">
        <img src="${e.img}" class="card-img-top" alt="${e.title}">
        <div class="card-body">
          <a href="https://hamptons.ae/"><h5 class="card-title">${e.title}</h5></a>
          <p class="card-text">${e.fullLocation} </p>
          <p class="card-text"> ₹${e.amount}/- </p>
        </div>
      </div>
      <br>
      `
    })

    chatMsgOUtput.innerHTML += arrHtml.length ? `<p><strong> ChatBot :</strong> ${arrHtml} </p>`: `<p><strong> ChatBot :</strong> No Apartment Found </p>`

    chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${dataMsg} </p><button onclick="appartmentFilter('Buy')" class="btn btn-outline-primary">Buy Apartment</button>
    <button onclick="appartmentFilter('Rent')" class="btn btn-outline-primary">Rent Apartment</button>
    <button onclick="grievance()" class="btn btn-outline-primary">Grievance</button>
    ` ;

    ListFilterArr = [];
    i = 0;
    listFlg = false;
    grievanceFlg = false;
}


let grievanceArr = []
const chatArr = ['Please Enter your name', 'Please Enter the Subject', 'Please Type Your Grievance', 'Thank You! We will get back to you soon', 'Please Enter the Location', 'Please Enter Property Category', 'Please Enter Max Price', 'Please Enter Min Price', 'Searching']
const grievance = () => {
    grievanceArr = [];
    i = 0;
    grievanceFlg = true;
    listFlg = false;
    chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${chatArr[i]} </p>`
    message.value = ''

}

const saveData = async () => {
    const response = await fetch('http://192.168.1.12:5001/grievance/', {
        method: 'POST',
        body: JSON.stringify({
            name: grievanceArr[0],
            subject: grievanceArr[1],
            description: grievanceArr[2]
        }), // string or object
        headers: {
            'Content-Type': 'application/json'
            // "Content-Type": "multipart/form-data"
        }
    });

    const myJson = await response.json();
    message.value = ''
    console.log(myJson)

    chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${dataMsg} </p><button onclick="appartmentFilter('Buy')" class="btn btn-outline-primary">Buy Apartment</button>
    <button onclick="appartmentFilter('Rent')" class="btn btn-outline-primary">Rent Apartment</button>
    <button onclick="grievance()" class="btn btn-outline-primary">Grievance</button>
    ` ;

    grievanceArr = [];
    i = 0;
    grievanceFlg = false;
    listFlg = false;
}

window.addEventListener('DOMContentLoaded', () => {
    i = 0;
    chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${dataMsg} </p><button onclick="appartmentFilter('Buy')" class="btn btn-outline-primary">Buy Apartment</button>
    <button onclick="appartmentFilter('Rent')" class="btn btn-outline-primary">Rent Apartment</button>
    <button onclick="grievance()" class="btn btn-outline-primary">Grievance</button>
    ` ;
}, false);

btn.addEventListener('click', async () => {
    if(grievanceFlg && !listFlg) {
        if (message.value.length) {
            grievanceArr.push(message.value)
            i++;
            message.value = ''
            chatMsgOUtput.innerHTML += `<p><strong> Me :</strong> ${grievanceArr[i - 1]} </p>`
            chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${chatArr[i]} </p>`
            if (grievanceArr.length === 3) {
                saveData();
            }
        }
    }
    else if(!grievanceFlg && listFlg) {
        if (message.value.length) {
            ListFilterArr.push(message.value)
            i++;
            message.value = ''
            chatMsgOUtput.innerHTML += `<p><strong> Me :</strong> ${ListFilterArr[i - 4]} </p>`
            chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${chatArr[i]} </p>`
            if (ListFilterArr.length === 5) {
                appartmentList();
            }
        }
    }
    else {
        i = 0;
        const messageData = message.value
        chatMsgOUtput.innerHTML += `<p><strong> Me :</strong> ${messageData} </p>`
        message.value = ''
        chatMsgOUtput.innerHTML += `<p><strong> ChatBot :</strong> ${dataMsg} </p><button onclick="appartmentFilter('Buy')" class="btn btn-outline-primary">Buy Apartment</button>
        <button onclick="appartmentFilter('Rent')" class="btn btn-outline-primary">Rent Apartment</button>
        <button onclick="grievance()" class="btn btn-outline-primary">Grievance</button>
        ` ;
    }
})
