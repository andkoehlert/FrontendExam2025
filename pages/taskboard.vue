<template>
  <div>
    <label>Select Project:</label>
    <select v-model="selectedProjectId" @change="handleProjectChange">
      <option value="">All Projects</option>
      <option v-for="project in projects" :key="project._id" :value="project._id">
        {{ project.name }}
      </option>
    </select>
  </div>

  <div class="debug-info">
    <p>Filtered Tasks Count: {{ filteredTasksCount }}</p>
  </div>

  <div v-if="loading">Loading...</div>
  <div v-if="error" class="error-message">{{ error }}</div>

  <div>
    <div>
      <input v-model="newTaskName" placeholder="Add priority" />
      <button @click="handleAddTask">Add Priority</button>
    </div>

    <div v-if="!loading" class="kanban">
      <div v-for="(list, label) in taskColumns" :key="label" class="column">
        <h3>{{ label }} ({{ getRefByLabel(label).value.length }})</h3>
   <draggable
  v-model="getRefByLabel(label).value"
  group="tasks"
  item-key="_id"
  @change="() => handleDrop(getRefByLabel(label).value, label)"
>
          <template #item="{ element }">
            <div class="task">
              <p>{{ element.name }}</p>
              <button @click="deleteProduct(element._id)">❌</button>
            </div>
          </template>
          <template #footer>
            <div v-if="!getRefByLabel(label).value.length" class="empty-state">
              No {{ label }} tasks
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>

  <div class="project-list">
    <h2>Projects</h2>
    <div v-for="project in projects" :key="project._id" class="project-card">
      <h3>{{ project.name }}</h3>
      <p>{{ project.description }}</p>
      <p><strong>Status:</strong> <span :class="'status-badge ' + project.status">{{ project.status }}</span></p>
      <p><strong>Location:</strong> {{ project.lokation }}</p>
      <p><strong>Dates:</strong> {{ project.startDate }} – {{ project.endDate }}</p>
      <div>
        <strong>Employees:</strong>
        <ul>
          <li v-for="e in project.employees" :key="e._id">{{ e.employeeId || 'Unassigned' }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import { showTasks } from '../composables/useTask';
import { showProject } from '../composables/UseProjects';
import draggable from 'vuedraggable';
import { onMounted, ref, computed, watch } from 'vue';
import type { Task } from '~/interfaces/task';

// Using composables
const {
  tasks,
  loading,
  error,
  fetchtasks,
  addTask,
  updateTask,
  deleteProduct,
} = showTasks();

const {
  projects,
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  getTokenAndUserId
} = showProject();

// Filtered task lists
const todo = ref<Task[]>([]);
const inProgress = ref<Task[]>([]);
const done = ref<Task[]>([]);
const filteredTasks = ref<Task[]>([]);

const selectedProjectId = ref('');
const newTaskName = ref('');

// Computed properties
const filteredTasksCount = computed(() => filteredTasks.value.length);

const taskColumns = computed(() => ({
  todo: todo.value,
  inProgress: inProgress.value,
  done: done.value,
}));

// Fetch tasks and projects on mount
onMounted(async () => {
  await fetchProjects();
  await fetchtasks();
  splitTasks();
});

// Watch for changes
watch(tasks, splitTasks, { deep: true });
watch(selectedProjectId, splitTasks);

// Helper functions
function getRefByLabel(label: string) {
  switch (label) {
    case 'todo': return todo;
    case 'inProgress': return inProgress;
    case 'done': return done;
    default: throw new Error('Invalid label');
  }
}
function splitTasks() {
  filteredTasks.value = selectedProjectId.value
    ? tasks.value.filter((task) => {
        const taskProjectId = task.projectId
          ? typeof task.projectId === 'object'
            ? String(task.projectId._id)
            : String(task.projectId)
          : null;
        return taskProjectId === selectedProjectId.value;
      })
    : tasks.value;

  todo.value = filteredTasks.value.filter((t) => t.status === 'todo');
  inProgress.value = filteredTasks.value.filter((t) => t.status === 'inProgress');
  done.value = filteredTasks.value.filter((t) => t.status === 'done');
}

async function handleAddTask() {
  if (!newTaskName.value.trim()) return;

  try {
    const { userId } = getTokenAndUserId(); 
    
    if (!selectedProjectId.value) {
      error.value = 'Please select a project first';
      return;
    }
    
    const newTask = {
      name: newTaskName.value,
      status: 'todo',
      _createdBy: userId,
      projectId: selectedProjectId.value
    };
    
    await addTask(newTask);
    newTaskName.value = '';
    await fetchtasks();
    
  } catch (err) {
   // console.error('Error adding task:', err);
    error.value = (err as Error).message;
  }
}
async function handleDrop(newList: Task[], newStatusLabel: string) {
  const newStatus = newStatusLabel as 'todo' | 'inProgress' | 'done';

  try {
    // Go through the list in this column
    for (const task of newList) {
      if (task.status !== newStatus) {
        await updateTask(task._id, { status: newStatus });
        task.status = newStatus;
      }
    }

   
  } catch (err) {
   // console.error('Error updating task status:', err);
    error.value = 'Failed to update task status';
  }
}

</script>

<style scoped>
.kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
}


.column {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  min-height: 200px;
}

@media (max-width: 768px) {
  .kanban {
    grid-template-columns: 1fr;
  }
  
  .column {
    margin-bottom: 20px;
  }
}

.column h3 {
  text-transform: capitalize;
  color: rgb(0 220 130);
  border-bottom: 2px solid rgb(0 220 130);
  padding-bottom: 6px;
  margin-bottom: 12px;
}

.task {
  background: #fff;
  margin-bottom: 12px;
  padding: 12px;
  border-left: 4px solid rgb(0 220 130);
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.1s ease;
}

.task:hover {
  transform: translateY(-2px);
}

.task button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #e74c3c;
}

.empty-state {
  color: #999;
  font-style: italic;
  padding: 12px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 4px;
  margin: 8px;
}

.error-message {
  color: #e74c3c;
  padding: 8px;
  margin: 8px 0;
  background: #f8d7da;
  border-radius: 4px;
}

input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  margin-right: 8px;
  font-size: 14px;
}

button {
  padding: 8px 16px;
  background-color: rgb(0 220 130);
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

button:hover {
  background-color: rgb(0 200 120);
}

.project-list {
  margin-top: 40px;
}

.project-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-left: 5px solid rgb(0 220 130);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.status-badge {
  padding: 2px 8px;
  border-radius: 4px;
  background: #eee;
  font-weight: bold;
  text-transform: capitalize;
}

.status-badge.delayed {
  background-color: #f8d7da;
  color: #721c24;
}

.status-badge.completed {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.inProgress {
  background-color: #fff3cd;
  color: #856404;
}

select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 12px;
  margin-right: 8px;
}


</style>