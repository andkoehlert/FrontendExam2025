<template>
  <div class="card">
    <div class="grid grid-cols-2 gap-10 ">
      <div class="p-7 ">
        <img :src="product.imageURL" alt="product" class="mx-auto my-7 max-h-80">
      </div>
      <div class="grid grid-cols-2 shadow-lg shadow-dark-400/100 p-4 ">
        <p class="font-bold border-b-2 mb-4 pb-2">Name:
          <span class="font-normal">
            {{ product.name  }}
          </span>
        </p>
            <p class="font-bold border-b-2 mb-4 pb-2">Stock:
          <span class="font-normal">
            {{product.stock  }}
          </span>
        </p>
               <p class="font-bold border-b-2 mb-4 pb-2">Quantity needed:
          <span class="font-normal">
            {{product.quantity }}
          </span>
        </p>
             <p class="font-bold border-b-2 mb-4 pb-2">Supplier:
          <span class="font-normal">
            {{product.supplier  }}
          </span>
        </p>
          <p class="font-bold border-b-2 mb-4 pb-2">Order date:
          <span class="font-normal">
            {{product.orderDate   }}
          </span>
        </p>
            <p class="font-bold border-b-2 mb-4 pb-2">Arrival Date:
          <span class="font-normal">
            {{product.arrivalDate  }}
          </span>
        </p>
            <p class="font-bold border-b-2 mb-4 pb-2">Product description:
          <span class="font-normal">
            {{product.description  }}
          </span>
        </p>
       
       
       
       
      
            
            
                

        
       
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/interfaces/products';

const props = defineProps<{
  product: Product,
 
    }>()


</script>

<style scoped>

</style>