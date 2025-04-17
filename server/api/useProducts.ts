export default defineEventHandler(async(event) => {

  // query params 
const { name } = getQuery(event)

// post data
const {age} = await readBody(event)

  return {
    message: `hello, ${name} you are ${age} years old`
  }
})