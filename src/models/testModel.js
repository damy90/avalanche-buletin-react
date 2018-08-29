export default {
    defaultState: {
        lat: '',
        lon: '',
        place: '',
        content: '',
        dateCreated: '',
        dangerLevel: ''
    },
    validate: obj => {
        const {place, content, dateCreated} = obj;

        function isValidDate(d) {
            return d instanceof Date && !isNaN(d);
        }
        if (!place) {
            return "Test place is required";
        }

        if (!content) {
            return "Test content/details is required.";
        }

        if (!dateCreated) {
            return "Date created is required.";
        }

        let date = new Date(dateCreated)
        if(!isValidDate(date)) {
            return "Date created should be a valid date.";
        }
    }
};