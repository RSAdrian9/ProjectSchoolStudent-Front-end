import API from "../api/api";

export const getStudents = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/student", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in obtaining students:", error);
        return []; 
    }
};  

export const getStudentById = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/student/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error obtaining student with ID ${id}:`, error);
        throw error;
    }
};

export const createStudent = async (studentData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.post("/student", studentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("Student created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error when creating the student:", error);
        throw error;
    }
};

export const updateStudent = async (id: number, studentData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.put(`/student/${id}`, studentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating student with ID ${id}:`, error);
        throw error;
    }
};

export const deleteStudent = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.delete(`/student/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting student with ID ${id}:`, error);
        throw error;
    }
};