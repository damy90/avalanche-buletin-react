import requester from "../infrastructure/requester";
import observer from "../infrastructure/observer";

function requestFail(res) {
    observer.trigger(observer.events.notification, { 
        type: 'error', 
        message: res.responseJSON.description
    });
    
    this.setState({ username: '', password: '' });
}

let create = {
    send: data => {
        return requester.post('appdata', 'avalanche-tests', 'kinvey', data)
    },
    success: res => {
        observer.trigger(observer.events.notification, {type: 'success', message: 'Test submited.'})
        this.props.history.push('/');
    },
    fail: requestFail
}
let edit = {
    send: data =>{
        return requester.put('appdata', 'avalanche-tests/' + data.id, 'kinvey', data);
    },
    fail: requestFail
}

let details = {
    send: id =>{
        return requester.get('appdata', 'avalanche-tests/' + id, 'kinvey');
    },
    fail: requestFail
}
export default {
    create,
    edit,
    details
}