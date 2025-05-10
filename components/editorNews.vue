<template>
  <div class="card">
    <div class="grid grid-cols-1 gap-10">
     <p><NuxtLink to="/" class="btn py-2 px-4">Go back</NuxtLink></p>

      <div class="p-7">
      
        <div class="col-span-1 mb-7 prose max-w-none">
           <h3 class="font-bold border-b-2 mb-4 pb-2">
          <span class="font-normal"> {{ post.title }}</span>
        </h3>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Author:
          <span class="font-normal"> {{ post.authorId }}</span>
        </h3>
          <EditorContent :editor="editor" />
        </div>
        
      </div>
      
      <div class="grid grid-cols-2  p-4">
       
      
        
      
        
     
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '../interfaces/post';
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { computed, onBeforeUnmount } from 'vue'

const props = defineProps<{
  post: Post
}>()

// Extract the first image from content for the main display
const mainImage = computed(() => {
  if (!props.post.content?.content) return null
  const imageNode = props.post.content.content.find(
    node => node.type === 'image'
  )
  return imageNode?.attrs?.src || null
})

const safeContent = (() => {
  if (typeof props.post.content === 'string') {
    try {
      return JSON.parse(props.post.content)
    } catch {
      console.warn('Invalid content format. Falling back to empty content.')
      return { type: 'doc', content: [] }
    }
  }
  return props.post.content
})()

const editor = useEditor({
  content: safeContent,
  editable: false,
  extensions: [
    StarterKit,
    Image.configure({
      HTMLAttributes: {
        class: 'editor-image'
      }
    })
  ],
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.editor-image {
  max-width: 100%;
  height: auto;
  margin: 1rem auto;

}

.ProseMirror {

    border: none !important;
}
</style>

