<script setup>
import CharacterCard from './CharacterCard.vue';
import { defineProps } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue';

// Define props passed from App.vue
const { characters } = defineProps({
  characters: Array
});

// Setup auto-animate for character list container
const [parent] = useAutoAnimate();
</script>

<template>
  <div class="md:mt-[120px] mt-[120px] grid gap-4 xl:grid-cols-5 sm:grid-cols-3 grid-cols-2" ref="parent">
    <CharacterCard
      v-for="character in characters"
      :key="character.id"
      :character="character"
    />
  </div>
</template>

<style scoped>
.character-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
}
</style>