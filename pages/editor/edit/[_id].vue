<template>
  <div class="card">
    <h1>Edit Post</h1>

    <!-- Error message display -->
    <div class="text-center text-red-500">{{ error }}</div>

    <!-- Loading state -->
    <div v-if="loading">Loading...</div>

    <!-- The form for editing the post -->
    <div v-if="post">
      <form @submit.prevent="updatePostHandler" class="grid grid-cols-2 gap-10">
        <!-- Post title input -->
        <input
          type="text"
          v-model="post.title"
          placeholder="Title"
          class="p-2 border rounded"
        />
        
        <!-- Post author input -->
        <input
          type="text"
          v-model="post.authorId"
          placeholder="Author"
          class="p-2 border rounded"
        />
        
        <!-- Content area: Use Tiptap for displaying and editing -->
        <div class="p-2 border rounded">
          <h2 class="uppercase font-bold">Content</h2>
          <TiptapEditor v-model="post.content" /> 
        </div>

        <!-- Submit button -->
        <div class="col-span-2 flex">
          <button 
            type="submit" 
            class="mt-4 min-w-[100px] bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { showPost } from '../../../composables/editor'
import type { Post } from '~/interfaces/post'
import TiptapEditor from '../../../components/editor/editor.vue' 

const { posts, updatePost, fetchPostById } = showPost()
const route = useRoute()
const id = route.params._id as string
const post = ref<Post | null>(null)
const loading = ref(true)
const error = ref('')

// Compute clean content for the editor if necessary (parsing from raw JSON)
const cleanContent = computed(() => {
  if (!post.value?.content) return { type: 'doc', content: [] }
  try {
    return JSON.parse(JSON.stringify(post.value.content)) // remove proxy/reactivity
  } catch {
    return { type: 'doc', content: [] }
  }
})

// Fetch the specific post by its ID
const getSpecificPost = async () => {
  try {
    const fetchedPost = await fetchPostById(id)

    if (!fetchedPost) {
      error.value = 'Post not found'
      return
    }

    post.value = fetchedPost

    // Ensure valid structure for Tiptap editor
    if (typeof post.value.content === 'string') {
      try {
        post.value.content = JSON.parse(post.value.content)
      } catch (err) {
        post.value.content = { type: 'doc', content: [] }
      }
    }

    if (!post.value.content?.type || !post.value.content?.content) {
      post.value.content = { type: 'doc', content: [] }
    }

   // console.log('Fetched full post:', post.value)
  } catch (e) {
    error.value = 'Error fetching post'
  //  console.error(e)
  } finally {
    loading.value = false
  }
}

// Handle the update of the post
const updatePostHandler = async () => {
  if (!post.value) return

  try {
    // Create a clean update payload with the latest content
    const updatedData = {
      title: post.value.title,
      content: post.value.content, // Content from the editor
      authorId: post.value.authorId
    }

    // Send the updated post data
    await updatePost(post.value._id, updatedData)
    alert('Post updated successfully')
    // Optionally: Navigate back or refresh data
  } catch (e) {
    error.value = 'Failed to update post'
   // console.error(e)
  }
}

// Fetch the post when the component is mounted
onMounted(() => {
  getSpecificPost()
})
</script>

<style scoped>

</style>
