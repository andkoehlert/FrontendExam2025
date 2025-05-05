import { ref } from "vue";
import type { newEmployee, Employee } from "~/interfaces/employees";


export const showEmployee = () => {

   const error = ref<string | null>(null);
    const loading = ref<boolean>(false)
    const employees = ref<Employee[]>([])
  
  const fetchEmployees = async ():Promise<void> => {
    loading.value = true;

    try {
      const {data, error: fetchError, execute} = await useLazyFetch<Employee[]>('http://localhost:4000/api/employees', {
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


  return {employees, error, loading, showEmployee, fetchEmployees}

}