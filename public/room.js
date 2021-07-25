const socket = io('/')
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}
 
// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

userId = guid();
console.log(RoomId)

data = {
    'userId':userId,
    'roomId':RoomId
}

socket.emit('join-room',data)

const msg = 'hi'
socket.emit('chatMessage',msg)

socket.on('user-connected',userId=>{
    console.log(userId+' this user has connected')
})

socket.on('message',msg=>{
    console.log(msg)
})

//========================================
const localConnection = new RTCPeerConnection({
    iceServers: [
        {
            urls: "stun:stun.stunprotocol.org"
        },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
    ]
});
localConnection.onicecandidate = e =>{
    console.log(JSON.stringify(localConnection.localDescription))
    console.log(e)
}

const sendchannel = localConnection.createDataChannel("sendChannel");
sendchannel.onmessage = e => console.log(e)
sendchannel.onopen = e =>{
    console.log('open')
}
sendchannel.onclose = e=>{
    console.log('closed')
}
localConnection.createOffer().then(o=>localConnection.setLocalDescription(o))

let remoteConnection;

