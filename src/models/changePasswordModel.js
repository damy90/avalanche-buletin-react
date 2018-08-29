export default {
    defaultState: {
        password: '',
        newPassword: '',
        passwordRepeat: ''
    },
    validate: obj => {
        const {password, newPassword, passwordRepeat} = obj;

        if (!password) {
            return "Old password is required.";
        }

        if (!newPassword) {
            return "New password is required.";
        }

        if (!passwordRepeat) {
            return "Please repeat your password.";
        }

        if (newPassword !== passwordRepeat) {
            return "Password fields are not the same.";
        }
    }
};