import { ref } from "vue";
import type { newPost, Post } from "../interfaces/post";


// Using ref to save Post, error and loading
export const showPost = () => {
  
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false)
  const posts = ref<Post[]>([])


  const fetchPosts = async (): Promise<void> => {
    loading.value = true;
  
    try {
      const {token} =  getTokenAndUserId()

      const {data, error: fetchError, execute} = await useLazyFetch<Post[]>('https://fullstackexam2025backend.onrender.com/api/posts', {
        method: 'GET',
         headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        immediate: false, 
      });
  
      await execute();
  
      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch posts");
      }
  
      posts.value = data.value || [];
  
    } catch (err) {
      error.value = (err as Error).message;
  
    } finally {
      loading.value = false;
    }
  }

const fetchPostById = async (id: string): Promise<Post | null> => {
  loading.value = true;
  try {
    const { data, error: fetchError } = await useFetch<Post | Post[]>(`https://fullstackexam2025backend.onrender.com/api/posts/${id}`, {
      method: 'GET',
      watch: false
    });

    if (fetchError.value) {
      throw new Error(fetchError.value.message || "Failed to fetch post");
    }

    if (!data.value) {
      return null;
    }

    const postData = Array.isArray(data.value) ? data.value[0] : data.value;

    return postData;
  } catch (err) {
    error.value = (err as Error).message;
    return null;
  } finally {
    loading.value = false;
  }
};


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



  const validatePost = (post: newPost):void => {
    if (!post.title) {
      throw new Error ('Please provide a title')
    }
  }


  const setDefaultValues = (post: newPost, userId: string) => {
    
    return {
      title: post.title || 'Default title',
      content: post.content || 'New post content default value',
      authorId: post.authorId || 'admin',
      _createdBy: userId
    }
  }


  const addPost = async (post: newPost): Promise<void> => {
    const {token, userId} = getTokenAndUserId()

    try {

      validatePost(post)

      const postDefaults = setDefaultValues(post, userId)
     // console.log("Sending post data:", postDefaults); // Log the data


      const {data, error, execute} = await useLazyFetch<Post>('https://fullstackexam2025backend.onrender.com/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body:  postDefaults , 
        immediate: false,
      })

    await execute()

      if (error.value) {
       // console.error("API Error:", error.value);
        throw new Error(error.value.message || 'No data available')
      }

      if (data.value) {
        posts.value.push(data.value)
       // console.log("post added", data.value)
      }

    } catch (err) {
      //  console.error('Error adding post:', err)
        error.value = (err as Error).message
        throw err;
      }    
  }


    const deletePostFromServer = async (id: string, token: string): Promise<void> => {
      const {error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/post/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token
        },
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'No data available')
      }
    }

    const removePostFromState = (id: string): void => {
      posts.value = posts.value.filter(post => post._id !== id)
     // console.log("post deleted", id)
    }

    const deletePost = async (id: string): Promise<void> => {
      try {

        const {token} = getTokenAndUserId()
        await deletePostFromServer(id, token)
        removePostFromState(id);


      } catch (err) {
        error.value = (err as Error).message
      }
    }

    const updatePostOnServer = async (id: string, updatedPost: Partial<Post>, token: string): Promise<Post> => {
      const {data, error} = await useFetch(`https://fullstackexam2025backend.onrender.com/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: updatedPost,
        watch: false
      })

      if (error.value) {
        throw new Error(error.value.message || "No data available")
      }
      // const responseText = await data.text() Usefetch already gives parsed data
      if (!data.value) {
        throw new Error("No data returned")
      }
      return data.value as Post
    }

    const updatePostInState = (id: string, updatedPost: Post) => {
      // Finding the product in the list of product based on _id
      const index = posts.value.findIndex(post => post._id === id)
      if (index !== -1) {
        posts.value[index] = updatedPost
      }
    }

    const updatePost = async (id: string, updatedProduct: Partial<Post>): Promise<void> => {
      try {
        // getting token
        const {token} =  getTokenAndUserId()
        // sending to server
        const updatedPostResponse = await updatePostOnServer(id, updatedProduct, token)
        // After response update
        updatePostInState(id, updatedPostResponse)
        // and fetch products again
        await fetchPosts()

      } catch (err) {
          error.value = (err as Error).message
      }
    }



  return {posts, error, loading, fetchPostById, showPost, updatePost, deletePost, fetchPosts, addPost, getTokenAndUserId, }

}