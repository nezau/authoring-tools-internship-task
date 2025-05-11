<template>
  <div>
    <section class="hero-section">
      <div class="hero-content">
        <h1>Welcome to City Distance Calculator!</h1>
        <button class="scroll-button" @click="scrollToTable">Calculate</button>
      </div>
    </section>

    <section id="city-table" class="table-section">
      <CityTable />
    </section>
  </div>
</template>

<script setup>
import CityTable from './utils/CityList.vue'

const scrollToTable = () => {
  const table = document.getElementById('city-table')
  if (table) {
    table.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
</style>
