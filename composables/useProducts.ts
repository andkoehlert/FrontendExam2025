import { ref } from "vue";
import type { newProduct, Product } from "~/interfaces/products";


// Using ref to save product, error and loading
export const showProduct = () => {
  
  const error = ref<string | null>(null);
  const loading = ref<boolean>(false)
  const products = ref<Product[]>([])


  const fetchProducts = async (): Promise<void> => {
    loading.value = true;
  
    try {
      const {data, error: fetchError, execute} = await useLazyFetch<Product[]>('http://localhost:4000/api/products', {
        method: 'GET',
        // venter med at fetch til jeg selv klader den(execute)
        immediate: false, 
      });
  
      await execute();
  
      if (fetchError.value) {
        throw new Error(fetchError.value.message || "Failed to fetch products");
      }
  
      products.value = data.value || [];
  
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



  const validateProduct = (product: newProduct):void => {
    if (!product.name) {
      throw new Error ('Please provide a product name')
    }
  }


  const setDefaultValues = (product: newProduct, userId: string) => {
    return {
      name: product.name,
      description: product.description || 'New product description default value',
      imageURL: product.imageURL || 'https://picsum.photos/500/500',
      category: product.category || 'steel',
      quantity: product.quantity || 20,
      stock: product.stock || 45,
      supplier: product.supplier || 'Unknown', 
      orderDate: product.orderDate || Date,
      arrivalDate: product.arrivalDate || Date,
      _createdBy: userId
    }
  }


  const addProduct = async (product: newProduct): Promise<void> => {
    const {token, userId} = getTokenAndUserId()

    try {

      validateProduct(product)

      const productDefaults = setDefaultValues(product, userId)

      const {data, error, execute} = await useLazyFetch<Product>('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body:  productDefaults , 
        immediate: false,
      })

    await execute()

      if (error.value) {
        throw new Error(error.value.message || 'No data available')
      }

      if (data.value) {
        products.value.push(data.value)
        console.log("product added", data.value)
      }

    } catch (err) {
        console.error('Error adding product:', err)
        error.value = (err as Error).message
        throw err;
      }
          
  }


    const deleteProductFromServer = async (id: string, token: string): Promise<void> => {
      const {error} = await useFetch(`http://localhost:4000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'auth-token': token
        },
      })
      
      if (error.value) {
        throw new Error(error.value.message || 'No data available')
      }
    }

    const removeProductFromState = (id: string): void => {
      products.value = products.value.filter(product => product._id !== id)
      console.log("product deleted", id)
    }

    const deleteProduct = async (id: string): Promise<void> => {
      try {

        const {token} = getTokenAndUserId()
        await deleteProductFromServer(id, token)
        removeProductFromState(id);


      } catch (err) {
        error.value = (err as Error).message
      }

      
    }

    const updateProductOnServer = async (id: string, updatedProduct: Partial<Product>, token: string): Promise<Product> => {
      const {data, error} = await useFetch(`http://localhost:4000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
        body: updatedProduct,
        watch: false
      })

      if (error.value) {
        throw new Error(error.value.message || "No data available")
      }
      // const responseText = await data.text() Usefetch already gives parsed data
      if (!data.value) {
        throw new Error("No data returned")
      }
      return data.value as Product
    }

    const updateProductInState = (id: string, updatedProduct: Product) => {
      // Finding the product in the list of product based on _id
      const index = products.value.findIndex(product => product._id === id)
      if (index !== -1) {
        products.value[index] = updatedProduct
      }
    }

    const updateProduct = async (id: string, updatedProduct: Partial<Product>): Promise<void> => {
      try {
        // getting token
        const {token} =  getTokenAndUserId()
        // sending to server
        const updatedProductResponse = await updateProductOnServer(id, updatedProduct, token)
        // After response update
        updateProductInState(id, updatedProductResponse)
        // and fetch products again
        await fetchProducts()

      } catch (err) {
          error.value = (err as Error).message
      }
    }


  return {error, loading, products, deleteProduct, addProduct, fetchProducts, showProduct, getTokenAndUserId, validateProduct, updateProduct}
};

