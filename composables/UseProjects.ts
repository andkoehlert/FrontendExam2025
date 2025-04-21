import { ref } from "vue";
import type { newProject, Project } from "~/interfaces/projects";


// Using ref to save Project, error and loading
export const showProject = () => {
  
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false)
  const projects = ref<Project[]>([])


  const fetchProjects = async (): Promise<void> => {
    loading.value = true;
  
    try {
      const {data, error: fetchError, execute} = await useLazyFetch<Project[]>('http://localhost:4000/api/projects', {
        method: 'GET',
        // venter med at fetch til jeg selv klader den(execute)
        immediate: false, 
      });
  
      await execute();
  
      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch products");
      }
  
      projects.value = data.value || [];
  
    } catch (err) {
      error.value = (err as Error).message;
  
    } finally {
      loading.value = false;
    }
  }


  return {error, loading, projects, fetchProjects, showProduct}

}