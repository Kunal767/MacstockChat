const socket = io('https://nodejs-chatserver.herokuapp.com/', { transports: ['websocket'] });

const form = document.getElementById('sendcontainer');
const messageinp = document.getElementById('msginp');
const messageContainer = document.querySelector('.messagecontainer');

var audio = new Audio("ping.mp3");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageinp.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinp.value = "";
});

var username = prompt("Enter Your Name");

if (username == "" || username == null) {
    var username = "Guest";
}

socket.emit('new-user-joined', username);

socket.on('user-joined', username => {
    append(`${username} joined the chat`, 'left')
})

socket.on('receive', data => {
    append(`${data.username}: ${data.message}`, 'left')
    audio.play();
})

socket.on('left', username => {
    append(`${username} left the chat`, 'left')
})