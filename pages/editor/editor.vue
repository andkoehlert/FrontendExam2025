<template>
<form @submit.prevent="submitPost">
  <h1>Write your post here</h1>
  <p class="mt-4 mb-4">Please write a title..</p>

  <input
    v-model="newPost.title"
    placeholder="Title"
    class="input"
    required
  />

  <input
    v-model="newPost.authorId"
    placeholder="Author"
    class="input"
  />

  <Editor ref="editorComponent" />

  <button type="submit" class="btn my-4">Publish</button>
</form>
  <!--Existing posts-->
  <div class="pt-10">
    <div class="grid grid-cols-4 gap-5">
      <div v-if="loading">Loading...</div>
      <div v-for="post in posts" :key="post._id">
        <EditorCard 
        :post="post" 
        :onDelete="deletePost" 
        />

      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: 'auth'
})
import { ref } from 'vue'
import Editor from '../../components/editor/editor.vue'
 
import type { JSONContent } from '@tiptap/vue-3'
import { onMounted } from 'vue';
import { showPost } from '../../composables/editor';
import type { Post } from '~/interfaces/post';
const {posts, error, loading, fetchPosts, addPost, getTokenAndUserId, deletePost} = showPost();

onMounted(() => {
  fetchPosts();
});

const newPost = ref<{
  title: string;
  authorId: string,
  content: JSONContent | null;
  _createdBy: string;
}>({
  title: '',
  authorId: '',
  content: null,
  _createdBy: ''
});


const submitPost = async () => {

  if (!editorComponent.value || !editorComponent.value.editor) {
   // console.log('Editor is not available');
    return;
  }
  const content = editorComponent.value?.editor.getJSON() ?? null;
newPost.value.content = content;

// console.log("Content being sent:", newPost.value.content);


  const {userId} = getTokenAndUserId();
  newPost.value._createdBy = userId;

  try {
    await addPost(newPost.value);
    newPost.value = {title: '', content: null, _createdBy: '', authorId: ''}
  } catch (err) {
   // console.log('Error submitting post:', err)
  }
  
}

const title = ref('')
const editorComponent = ref<{ editor: { getJSON: () => JSONContent } } | null>(null)



  // Later: await $fetch('/api/news', { method: 'POST', body: payload })

</script>

<style>
.ProseMirror {
  padding: 1rem;
  border-radius: 0.5rem;
  border: solid;
}

.input {
  border: solid 0.5px #a7a7a7;
  padding: 0.5rem;
  margin-right: 1rem;
}
</style>
