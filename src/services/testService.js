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
    },
    fail: requestFail
}
let edit = {
    send: data =>{
        return requester.update('appdata', 'avalanche-tests/' + data.id, 'kinvey', data);
    },
    success: res => {
        observer.trigger(observer.events.notification, {type: 'success', message: 'Test updated.'})
    },
    fail: requestFail
}

let details = {
    send: id =>{
        return requester.get('appdata', 'avalanche-tests/' + id, 'kinvey');
    },
    fail: requestFail
}

let remove = {
    send: id => {
        return requester.remove('appdata', 'avalanche-tests/' + id, 'kinvey');
    },
    success: res => {
        observer.trigger(observer.events.notification, {type: 'success', message: 'Entity deleted.'})
    },
    fail: requestFail
}

let get = {
    send: (query) => {
        let endPoint = 'avalanche-tests/';
        if(query && typeof query!== 'string') {
            query = '?query=' + JSON.stringify(query);
            endPoint += query;
        }

        return requester.get('appdata', endPoint, 'kinvey');
    },
    fail: requestFail
}
export default {
    create,
    edit,
    details,
    remove,
    get
}