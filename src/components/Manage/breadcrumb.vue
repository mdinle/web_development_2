<template>
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <RouterLink :to="{ name: crumb.name }" v-if="index < breadcrumbs.length - 1">{{ crumb.meta.breadcrumb }}
        </RouterLink>
        <span v-else>{{ crumb.meta.breadcrumb }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const breadcrumbs = computed(() => {
  const breadcrumbs = route.matched.map(match => ({
    name: match.name,
    path: match.path,
    meta: match.meta
  }))

  // Prepend Home if it's not the first breadcrumb
  if (breadcrumbs[0].name !== 'Home') {
    breadcrumbs.unshift({ name: 'dashboard', path: '/', meta: { breadcrumb: 'Home' } })
  }

  return breadcrumbs
})
</script>
<style scoped>
.breadcrumb {
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 0;
  list-style: none;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
  margin: 0 0.5rem;
}

.breadcrumb-item a {
  color: #007bff;
  text-decoration: none;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.breadcrumb-item span {
  color: #6c757d;
}

.breadcrumb-item span::after {
  content: '>';
  margin: 0 0.5rem;
}

.breadcrumb-item:last-child span::after {
  content: '';
}

.breadcrumb-item:last-child a {
  font-weight: bold;
}

.breadcrumb-item:last-child span {
  font-weight: bold;
}

.breadcrumb-item:last-child span::after {
  content: '';
}

@media (max-width: 768px) {
  .breadcrumb {
    justify-content: center;
    padding-bottom: 10px;
    font-size: small;
  }
}
</style>