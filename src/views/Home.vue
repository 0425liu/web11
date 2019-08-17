<template>
  <div class="home">
 
  {{name}}
 <VuexTest :value.sync="name"   v-permission="['admin']"></VuexTest>
  </div>
</template>

<script>
// @ is an alias to /src
import VuexTest from "@/components/vuex";


export default {
  name: "home",
  data(){
    return {
      name:"liukang"
    }
  },
  components: {
      VuexTest
  }
};
</script>
