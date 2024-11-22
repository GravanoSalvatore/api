<template>
  <div>
    <div v-if="!news.length">Новостей пока нет.</div>
    <div v-else>
      <div v-for="article in news" :key="article.id" class="news-item">
        <img :src="article.imageurl" alt="News Image" />
        <h2>{{ article.title }}</h2>
        <p>{{ article.body }}</p>
        <a :href="article.url" target="_blank">Читать далее</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.news-item {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.news-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}
.news-item h2 {
  font-size: 18px;
  margin-bottom: 10px;
}
.news-item p {
  font-size: 14px;
  color: #555;
}
</style>
