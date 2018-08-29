export default {
    defaultState: {
        password: '',
        newPassword: ''
    },
    validate: obj => {
        const {password, newPassword} = obj;

        if (!password) {
            return "Old password is required.";
        }

        if (!newPassword) {
            return "New password is required.";
        }
    }
};