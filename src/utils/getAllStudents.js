const getAllStudents = async () => {
    const result = await fetch("http://localhost:4000/pages/getAllStudents");
    const data = await result.json();
    return data;
};

export default getAllStudents;