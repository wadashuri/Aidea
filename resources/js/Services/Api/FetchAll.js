import axios from 'axios';

const FetchAll = async (url, config = {}) => {
    try {
        const response = await axios.get(url, config);
        return response.data.items;
    } catch (error) {
        console.error("Error fetching data", error);
        throw error;
    }
};

export default FetchAll;