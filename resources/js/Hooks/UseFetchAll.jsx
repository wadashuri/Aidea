import { useState, useEffect } from 'react';
import axios from 'axios';

const UseFetchAll = (url, config = {}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(url, config);
                setData(response.data.items);
            } catch (err) {
                console.error("Error fetching data", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default UseFetchAll;