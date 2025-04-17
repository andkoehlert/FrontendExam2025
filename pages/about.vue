<template>

  
  <div>
    <h2>About</h2>
    <p>Hello</p>
    <p>Wassup</p>
    {{ data }}
  </div>
</template>

<script setup>
const {data} = await useFetch('/api/useProducts?name=mario', {
  method: 'post',
  body: {age: 30}


})
</script>

<style  scoped>
h2 {
  font-size: 2rem;
  color: blue;
}
</style>