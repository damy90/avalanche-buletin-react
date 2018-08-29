export default {
    defaultState: {
        username: '',
        password: '',
        passwordRepeat: ''

    },
    validate: obj => {
        const {username, password, passwordRepeat} = obj;

        if (!username) {
            return "Username is required";
        }

        if (!password) {
            return "Password is required.";
        }

        if (!passwordRepeat) {
            return "Please repeat your password.";
        }

        if (password !== passwordRepeat) {
            return "Password fields missmatch.";
        }
    }
};