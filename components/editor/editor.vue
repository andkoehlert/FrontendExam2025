<template>
  <div class="pt-5">
    <div class="flex gap-2" v-if="editor">
      <div class="flex gap-2">
        <!-- Bold, Italic, Strike, Heading buttons -->
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

      <!-- Heading buttons -->
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
      <!-- ... other heading buttons ... -->

      <!-- List buttons -->
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

    <!-- Editor Content Area -->
    <EditorContent :editor="editor" class="prose max-w-none mt-4" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, unref, watch, nextTick } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useImageUploader } from '@/composables/useImageUploader' // adjust path as needed

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      type: 'doc',
      content: [{
        type: 'paragraph',
        content: [{ type: 'text', text: 'Psst.. write here 🎉' }]
      }]
    })
  }
})
const emit = defineEmits(['update:modelValue', 'update:content'])

// Initialize the editor
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image.configure({
      inline: true,
      HTMLAttributes: {
        class: 'editor-image',
      },
    }),
  ],
  onUpdate: () => {
    if (editor.value) {
      const json = editor.value.getJSON()
      console.log('Editor content updated:', json) // Debug log
      emit('update:modelValue', json)
    }
  }
})

// Watch for changes in the prop (v-model) and sync with the editor content
watch(
  () => props.modelValue,
  async (newValue) => {
    if (editor.value && newValue) {
      const currentContent = JSON.stringify(editor.value.getJSON())
      const newContent = JSON.stringify(newValue)
      if (currentContent !== newContent) {
        console.log('[watch] Updating editor content with:', newValue)
        await nextTick()
        editor.value.commands.setContent(newValue)
      }
    }
  },
  { immediate: true, deep: true }
)

// Use the image uploader composable
const { uploadImage } = useImageUploader(editor)

// File input handler
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files || input.files.length === 0) return
  const file = input.files[0]
  await uploadImage(file)
  input.value = '' 
}

onBeforeUnmount(() => {
  unref(editor)?.destroy()
})

defineExpose({ editor })
</script>

<style>
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


</style>
