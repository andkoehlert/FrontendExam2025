<template>
  <div class="pt-5">
    <div class="flex gap-2" v-if="editor">
      <div class="flex gap-2">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">format_bold</span></i>
          <span></span>
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">format_italic</span></i>
          <span></span>
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">format_strikethrough</span></i>
          <span></span>
        </button>
      </div>

      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        P
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">format_list_bulleted</span></i>
        <span></span>
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">format_list_numbered</span></i>
        <span></span>
      </button>

      <!-- Image Upload Button -->
      <label class="cursor-pointer flex items-center">
        <input 
          type="file" 
          accept="image/*" 
          @change="handleImageUpload" 
          class="hidden"
        />
        <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">image</span></i>
        <span></span>
      </label>

      <div class="flex gap-2 ml-auto">
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">undo</span></i>
          <span></span>
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <i class="material-icons mr-2 order-2"><span class="material-symbols-outlined">redo</span></i>
        </button>
      </div>
    </div>
    <EditorContent :editor="editor" class="prose max-w-none mt-4" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, unref } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useImageUploader } from '@/composables/useImageUploader' // adjust path as needed

// Initialize the editor
const editor = useEditor({
  content: "<p>Psst.. write here 🎉</p>",
  extensions: [
    StarterKit,
    Image.configure({
      inline: true,
      HTMLAttributes: {
        class: 'editor-image',
      },
    }),
  ],
})

// Use the image uploader composable
const { uploadImage } = useImageUploader(editor)

// File input handler
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  const file = input.files[0]
  await uploadImage(file)
  input.value = '' // Reset input field
}

onBeforeUnmount(() => {
  unref(editor)?.destroy()
})

defineExpose({ editor })
</script>


<style>
/* Your existing styles remain the same */
.editor-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0.5em auto;
  border-radius: 4px;
}

.ProseMirror img {
  max-width: min(100%, 400px);
}

.ProseMirror {
padding: 1rem;
border-radius: 0.5rem;
border: solid;

}
</style>