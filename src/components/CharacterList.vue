<script setup>
import CharacterCard from './CharacterCard.vue';
import { defineProps } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
const { characters } = defineProps({
  characters: Array
});
const [parent] = useAutoAnimate();
</script>
<template>
  <div class="mt-[60px] grid gap-4 xl:grid-cols-5 sm:grid-cols-3 grid-cols-2" ref="parent">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>
<style scoped>

</style>