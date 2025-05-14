import { ref } from "vue";
import type { newTask, Task } from "~/interfaces/task";


// Using ref to save product, error and loading
export const showTasks = () => {
  
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false)
  const tasks = ref<Task[]>([])


  const fetchtasks = async (): Promise<void> => {
    loading.value = true;
  
    try {
            const {token} =  getTokenAndUserId()

      const {data, error: fetchError, execute} = await useLazyFetch<Task[]>('https://fullstackexam2025backend.onrender.com/api/tasks', {
        method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        // venter med at fetch til jeg selv klader den(execute)
        immediate: false, 
      });
  
      await execute();
  
      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch tasks");
      }
  
      tasks.value = data.value || [];
  
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



  const validateTask = (task: newTask):void => {
    if (!task.name) {
      throw new Error ('Please provide a task name')
    }
  }


  const setDefaultValues = (task: newTask, userId: string) => {
    return {
      name: task.name,
      status: task.status || 'inProgress',
      createdAt: task.createdAt || Date,
      _createdBy: userId
    }
  }

const addTask = async (task: newTask): Promise<void> => {
  const {token, userId} = getTokenAndUserId()

  try {
    validateTask(task)

    // Ensure we're sending the complete task data
    const taskData = {
      ...task,
      _createdBy: userId, // Use the actual user ID
      employees: task.employees || []
    };

   // console.log('Sending task data to server:', taskData);

    const {data, error, execute} = await useLazyFetch<Task>('https://fullstackexam2025backend.onrender.com/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
      body: JSON.stringify(taskData), // Make sure to stringify
      immediate: false,
    })

    await execute()

    if (error.value) {
      throw new Error(error.value.message || 'Failed to add task')
    }

    if (data.value) {
      tasks.value.push(data.value)
     // console.log("Task added successfully:", data.value)
    }
  } catch (err) {
   // console.error('Error adding task:', err)
    error.value = (err as Error).message
    throw err
  }
}


    const deleteTaskFromServer = async (id: string, token: string): Promise<void> => {
      const {error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token
        },
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'No data available')
      }
    }

    const removeTaskFromState = (id: string): void => {
      tasks.value = tasks.value.filter(t => t._id !== id)
    //  console.log("task deleted", id)
    }

    const deleteProduct = async (id: string): Promise<void> => {
      try {

        const {token} = getTokenAndUserId()
        await deleteTaskFromServer(id, token)
        removeTaskFromState(id);


      } catch (err) {
        error.value = (err as Error).message
      }
    }

    const updateTaskOnServer = async (id: string, updatedTask: Partial<Task>, token: string): Promise<Task> => {
      const {data, error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: updatedTask,
        watch: false
      })

      if (error.value) {
        throw new Error(error.value.message || "No data available")
      }
      // const responseText = await data.text() Usefetch already gives parsed data
      if (!data.value) {
        throw new Error("No data returned")
      }
      return data.value as Task
    }

    const updateTaskInState = (id: string, updatedTask: Task) => {
      // Finding the task in the list of task based on _id
      const index = tasks.value.findIndex(t => t._id === id)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
    }

    const updateTask = async (id: string, updatedTask: Partial<Task>): Promise<void> => {
      try {
        // getting token
        const {token} =  getTokenAndUserId()
        // sending to server
        const updatedTaskResponse = await updateTaskOnServer(id, updatedTask, token)
        // After response update
        updateTaskInState(id, updatedTaskResponse)
        // and fetch products again
        await fetchtasks()

      } catch (err) {
          error.value = (err as Error).message
      }
    }


  return {error, loading, tasks, deleteProduct, addTask, fetchtasks, showTasks, getTokenAndUserId, validateTask, updateTask}
};

