
const getUser = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
};
export { getUser };
