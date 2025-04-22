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
        throw new Error(fetchError.value.message || "Failed to fetch projects");
      }
  
      projects.value = data.value || [];
  
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


   const validateProject = (project: newProject):void => {
      if (!project.name) {
        throw new Error ('Please provide a project name')
      }
    }


    
      const setDefaultValues = (project: newProject, userId: string) => {
        return {
          name: project.name || 'Varde 20',
          description: project.description || 'New project description default value',
          lokation: project.lokation || 'Varde',
          startDate: project.startDate || Date,
          endDate: project.endDate || Date,
          status: project.status || 'not-started', 
          contract: project.contract || 'Unknown',
          _createdBy: userId
        }
      }
    
      const addProject = async (project: newProject): Promise<void> => {
      
        // get credentials
        const {token, userId} = getTokenAndUserId();

        try {
          // validate
          validateProject(project)
          const defaultValues = setDefaultValues(project, userId)

          // fetch
          const {data, error, execute} = await useLazyFetch<Project>('http://localhost:4000/api/projects',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            },
            body:  defaultValues , 
            immediate: false,
          })

          // execute
          await execute();

          // check for error.value
          if (error.value) {
            throw new Error(error.value.message || 'No data available')
          }

          // push data.value
          if (data.value) {
            projects.value.push(data.value)
            console.log("projects added", data.value)
          }

          // catch error
        } catch (err) {
          console.error('Error adding project:', err)
          error.value = (err as Error).message
          throw err;
        }

      }


  return {error, loading, projects, fetchProjects, showProject, addProject, getTokenAndUserId}




}