<template>
  <div>
    <div>冲啊，手榴弹扔了{{$store.state.count}}个</div>
    <p>{{$store.getters.score}}</p>
    <button @click="add">扔一个</button>
    <button @click="addAsync">蓄力扔俩</button>
    <input :value="value" @input="$emit('update:value',$event.target.value)"/>
  </div>
</template>

<script>
export default {
  props:{
    value:String
  },
  methods: {
    add() {
      // 修改状态用commit
      this.$store.commit("increment");
    },
    addAsync() {
      this.$store.dispatch("incrementAsync");
    }
  }
};
</script>
