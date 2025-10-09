const getPost = async (userId) => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
};
export { getPost };
