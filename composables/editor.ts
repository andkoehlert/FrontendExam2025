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
      const {data, error: fetchError, execute} = await useLazyFetch<Post[]>('http://localhost:4000/api/posts', {
        method: 'GET',
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
      console.log("Sending post data:", postDefaults); // Log the data


      const {data, error, execute} = await useLazyFetch<Post>('http://localhost:4000/api/post', {
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
        console.error("API Error:", error.value);
        throw new Error(error.value.message || 'No data available')
      }

      if (data.value) {
        posts.value.push(data.value)
        console.log("post added", data.value)
      }

    } catch (err) {
        console.error('Error adding post:', err)
        error.value = (err as Error).message
        throw err;
      }
          
  }
  return {posts, error, loading, showPost, fetchPosts, addPost, getTokenAndUserId, }

}