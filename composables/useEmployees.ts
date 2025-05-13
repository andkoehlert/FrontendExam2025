import { ref } from "vue";
import type { newEmployee, Employee } from "~/interfaces/employees";


export const showEmployee = () => {

   const error = ref<string | null>(null);
    const loading = ref<boolean>(false)
    const employees = ref<Employee[]>([])
  
  const fetchEmployees = async ():Promise<void> => {
    loading.value = true;

    try {
      const {data, error: fetchError, execute} = await useLazyFetch<Employee[]>('https://fullstackexam2025backend.onrender.com/api/employees', {
        method: 'GET',

        immediate: false, 
      });

      await execute();

      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch employees");
      }

      employees.value = data.value || [];

    } catch (err) {
      error.value = (err as Error).message;

    } finally {
      loading.value = false;

    }
  
  } 

  
    const getTokenAndUserId = (): {token: string, userId: string} => {
      
      const token = localStorage.getItem('lsToken')
      const userId = localStorage.getItem('userIDToken')
  
      if (!token) {
        throw new Error("No token availible")
      }
      if (!userId) {
        throw new Error("No user id availible")
      }
      return {token, userId}
    }
  
  
  
    const validateEmployee = (employee: newEmployee):void => {
      if (!employee.name) {
        throw new Error ('Please provide a employee name')
      }
    }
  
  
    const setDefaultValues = (employee: newEmployee, userId: string) => {
      return {
        name: employee.name || "",
        position: employee.position || "Unknown",
        description: employee.description || "",
        email: employee.email || "",
        profileImage: employee.profileImage || 'https://picsum.photos/500/500',
        bio: employee.bio || "",
        _createdBy: userId
      }
    }
  
  
    const addEmployee = async (employee: newEmployee): Promise<void> => {
      const {token, userId} = getTokenAndUserId()
  
      try {
  
        validateEmployee(employee)
  
        const employeeDefaults = setDefaultValues(employee, userId)
  
        const {data, error, execute} = await useLazyFetch<Employee>('https://fullstackexam2025backend.onrender.com/api/employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body:  employeeDefaults , 
          immediate: false,
        })
  
      await execute()
  
        if (error.value) {
          throw new Error(error.value.message || 'No data available')
        }
  
        if (data.value) {
          employees.value.push(data.value)
          console.log("employee added", data.value)
        }
  
      } catch (err) {
          console.error('Error adding employee:', err)
          error.value = (err as Error).message
          throw err;
        }
            
    }
  
    const deleteEmployeeFromServer = async (id: string, token: string): Promise<void> => {
      const {error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token
        },
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'No data available')
      }
    }

    const removeEmployeeFromState = (id: string): void => {
      employees.value = employees.value.filter(employee => employee._id !== id)
      console.log("employee deleted", id)
    }

    const deleteEmployee = async (id: string): Promise<void> => {
      try {

        const {token} = getTokenAndUserId()
        await deleteEmployeeFromServer(id, token)
        removeEmployeeFromState(id);


      } catch (err) {
        error.value = (err as Error).message
      }
    }

    const updateEmployeeOnServer = async(
      id: string, 
      updatedEmployee: Partial<Employee>, 
      token: string): Promise<Employee> => {

        const {data, error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: updatedEmployee,
          watch: false
        })

        if (error.value) {
          throw new Error(error.value.message || "No data available")
        }

        if (!data.value) {
          throw new Error("No data returned")
        }

        return data.value as Employee
    }

      const updateEmployeeInState = (id: string, updatedEmployee: Employee) => {
        const index = employees.value.findIndex(employee => employee._id === id)
        if (index !== -1) {
          employees.value[index] = updatedEmployee
        }
      }

      const updateEmployee = async(
        id: string, 
        updatedEmployee: Partial<Employee>): Promise<void> => {
        try {
          const {token} =  getTokenAndUserId()
          const updatedEmployeeResponse = await updateEmployeeOnServer(id, updatedEmployee, token)
          updateEmployeeInState(id, updatedEmployeeResponse)
          await fetchEmployees()

        } catch (err) {
            error.value = (err as Error).message
        }
      }
const assignEmployeeToProject = async (projectId: string, employeeId: string): Promise<void> => {
  const { token } = getTokenAndUserId();
  
  try {
    const { error } = await useFetch(`https://fullstackexam2025backend.onrender.com/api/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: { employeeId },
    });

    if (error.value) {
      throw new Error(error.value.message || 'Failed to assign employee');
    }
    // No return needed since we're using Promise<void>
  } catch (err) {
    console.error('Error assigning employee:', err);
    throw err;
  }
};

const removeEmployeeFromProject = async (projectId: string, employeeId: string): Promise<void> => {
  const { token } = getTokenAndUserId();
  
  try {
    const { error } = await useFetch(`https://fullstackexam2025backend.onrender.com/api/projects/${projectId}/employees/${employeeId}`, {
      method: 'DELETE',
      headers: {
        'auth-token': token
      },
    });

    if (error.value) {
      throw new Error(error.value.message || 'Failed to remove employee');
    }
  } catch (err) {
    console.error('Error removing employee:', err);
    throw err;
  }
};


  return {employees, error, loading, updateEmployee, assignEmployeeToProject,
  removeEmployeeFromProject, showEmployee, deleteEmployee, fetchEmployees, addEmployee, getTokenAndUserId, }

}