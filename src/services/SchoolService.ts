import API from "../api/api";

export const getSchools = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get("/schools", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching schools:", error);
        return []; 
    }
};

export const getSchoolById = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.get(`/schools/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching school with ID ${id}:`, error);
        throw error;
    }
};

export const createSchool = async (schoolData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.post("/schools", schoolData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("School created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error creating school:", error);
        throw error;
    }
};

export const updateSchool = async (id: number, schoolData: any) => {
    try {
        const token = localStorage.getItem("token");
        const response = await API.put(`/schools/${id}`, schoolData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error updating school with ID ${id}:`, error);
        throw error;
    }
};

export const deleteSchool = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        await API.delete(`/schools/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(`Error deleting school with ID ${id}:`, error);
        throw error;
    }
};
