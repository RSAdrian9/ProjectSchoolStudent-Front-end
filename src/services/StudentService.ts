import API from "../api/api";

export const getStudents = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get("/students", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los estudiantes:", error);
    throw error;
  }
};

export const getStudentById = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`/students/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener estudiante con ID ${id}:`, error);
    throw error;
  }
};

export const createStudent = async (studentData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.post("/students", studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Estudiante creado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    throw error;
  }
};

export const updateStudent = async (id: number, studentData: any) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.put(`/students/${id}`, studentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar estudiante con ID ${id}:`, error);
    throw error;
  }
};

// se está usando
export const deleteStudent = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.delete(`/students/${id}`, {
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
