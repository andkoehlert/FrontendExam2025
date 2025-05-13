import { ref } from "vue";
import type { newProject, Project } from "~/interfaces/projects";
import productsVue from "~/layouts/products.vue";


// Using ref to save Project, error and loading
export const showProject = () => {
  
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false)
  const projects = ref<Project[]>([])


  const fetchProjects = async (): Promise<void> => {
    loading.value = true;
  
    try {
      const {data, error: fetchError, execute} = await useLazyFetch<Project[]>('https://fullstackexam2025backend.onrender.com/api/projects', {
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

  const fetchProjectsByStatus = async (status: string | null = null) => {
    loading.value = true
    try {
      const response = await fetch(
        status
          ? `https://fullstackexam2025backend.onrender.com/api/projects/status/${status}`  // Fetch by specific status
          : 'https://fullstackexam2025backend.onrender.com/api/projects' // If no status, fetch all projects
      )
      
      if (!response.ok) throw new Error('Failed to fetch projects')
      
      const data = await response.json()
      projects.value = data
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      loading.value = false
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


    
      
    
      const addProject = async (project: newProject): Promise<void> => {
      
        // get credentials
        const {token, userId} = getTokenAndUserId();

        try {
          // validate
          validateProject(project);
         // const defaultValues = setDefaultValues(project, userId)

         const projectData = {
          ...project, // use everything as-is from projectToAdd
          products: project.products // this ensures the array gets passed through
        };
          // fetch
          const {data, error, execute} = await useLazyFetch<Project>('https://fullstackexam2025backend.onrender.com/api/projects',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token
            },
            body:  projectData , 
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


      const deleteProjectFromServer = async (id: string, token: string): Promise<void> => {
        const {error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/projects/${id}`, {
          method: 'DELETE',
          headers: {
            'auth-token': token
          },
        })

        if (error.value) {
          throw new Error(error.value.message || 'No data available')
        } }

        const removeProjectFromState = (id: string): void => {
          projects.value = projects.value.filter(project => project._id !== id)
          console.log("Project deleted", id)
        }

        const deleteProject = async (id: string): Promise<void> => {
        try {

          const {token} = getTokenAndUserId()
          await deleteProjectFromServer(id, token)
          removeProjectFromState(id);
        
        } 
        catch (err) {
          error.value = (err as Error).message
        }
        }  
        
      const updateProjectOnServer = async (id: string, updatedProject: Partial<Project>, token: string): Promise<Project> => {
        const {data, error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/projects/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: updatedProject,
          watch: false
        })
         if (error.value) {
                throw new Error(error.value.message || "No data available")
              }
              // const responseText = await data.text() Usefetch already gives parsed data
              if (!data.value) {
                throw new Error("No data returned")
              }
              return data.value as Project
        }

  const updateProjectInState = (id: string, updatedProject: Project) => {
  const index = projects.value.findIndex(project => project._id === id);
  if (index !== -1) {
    projects.value[index] = updatedProject; // This was the main issue
  }
};
        const updateProject = async(id: string, updatedProject: Partial<Project> ):Promise<void> => {
         try {
          const {token} = getTokenAndUserId()
          const updatedProjectResponse = await updateProjectOnServer(id, updatedProject, token)
          updateProjectInState(id, updatedProjectResponse)
          await fetchProjects()
  

         } catch (err) {
          error.value = (err as Error).message
      }}
       

        


  return {error, loading, projects, fetchProjectsByStatus, fetchProjects, updateProject, showProject, addProject, getTokenAndUserId, deleteProject}




}  
      