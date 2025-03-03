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
        console.error("Error al obtener los institutos:", error);
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
        console.error(`Error al obtener el instituto con ID ${id}:`, error);
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
        console.log("Instituto creado:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al crear el instituto:", error);
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
        console.error(`Error al actualizar el instituto con ID ${id}:`, error);
        throw error;
    }
};

// se está usando
export const deleteSchool = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        await API.delete(`/schools/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error(`Error al eliminar el instituto con ID ${id}:`, error);
        throw error;
    }
};