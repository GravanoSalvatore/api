<!-- <template>
  <div>
    <h1>Крипто Новости</h1>
    <div v-if="loading">Загрузка новостей...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="news && news.length">
        <div v-for="article in news" :key="article.id" class="news-item">
          <img :src="article.imageurl" alt="News Image" />
          <h2>{{ article.title }}</h2>
          <p>{{ article.body }}</p>
          <a :href="article.url" target="_blank">Читать далее</a>
        </div>
      </div>
      <div v-else>
        <p>Новостей пока нет.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    this.fetchNews();
  },
  methods: {
    async fetchNews() {
      this.loading = true;
      try {
        console.log("[Компонент] Запрос новостей с API...");
        const response = await $fetch("/api/fetchNews");
        console.log("[Компонент] Ответ API:", response);
        this.news = response;
      } catch (err) {
        console.error("[Компонент] Ошибка при запросе новостей:", err);
        this.error = "Ошибка при загрузке новостей.";
      } finally {
        this.loading = false;
      }
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
</style> -->
<template>
  <div class="container mt-4">
    <!-- <h1 class="text-center mb-4">Крипто Новости</h1> -->
    <div v-if="loading" class="text-center">Загрузка новостей...</div>
    <div v-else-if="error" class="text-danger">{{ error }}</div>
    <div v-else>
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        <div v-for="article in news" :key="article.id" class="col">
          <div class="card h-100">
            <img :src="article.imageurl" class="card-img-top" alt="News Image" />
            <div class="card-body">
              <h5 class="card-title">{{ article.title }}</h5>
              <p class="card-text text-muted">
                {{ formatDate(article.published_on) }}
              </p>
              <div class="card-text text-scroll">
                {{ article.body }}
              </div>
              <a :href="article.url" target="_blank" class="btn btn-primary mt-3">Читать далее</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      loading: false,
      error: null,
    };
  },
  async mounted() {
    this.fetchNews();
  },
  methods: {
 
  async fetchNews() {
    this.loading = true;
    try {
      console.log("[Компонент] Запрос новостей с API...");
      const response = await $fetch("/api/fetchNews");
      console.log("[Компонент] Ответ API:", response);
      this.news = response.map((article) => ({
        ...article,
        title: article.title, // Отображается переведенный заголовок
        body: article.body,   // Отображается переведенный текст
      }));
    } catch (err) {
      console.error("[Компонент] Ошибка при запросе новостей:", err);
      this.error = "Ошибка при загрузке новостей.";
    } finally {
      this.loading = false;
    }
  
},

    // async fetchNews() {
    //   this.loading = true;
    //   try {
    //     console.log("[Компонент] Запрос новостей с API...");
    //      const response = await $fetch("/api/fetchNews");
    //     //const response = await $fetch('https://api.cryptocurrencybulls.com/api/fetchNews');

    //     console.log("[Компонент] Ответ API:", response);
    //     this.news = response;
    //   } catch (err) {
    //     console.error("[Компонент] Ошибка при запросе новостей:", err);
    //     this.error = "Ошибка при загрузке новостей.";
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    formatDate(timestamp) {
      const date = new Date(timestamp * 1000);
      return date.toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 5px;
}
.card-img-top {
  max-height: 200px;
  object-fit: cover;
}
.card-title {
  font-size: 16px;
  margin-bottom: 10px;
}
.card-text {
  font-size: 14px;
  color: #555;
}
.text-scroll {
  max-height: 100px;
  overflow-y: auto;
  font-size: 14px;
  color: #555;
}
.text-scroll::-webkit-scrollbar {
  width: 6px;
}
.text-scroll::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 3px;
}
.text-scroll::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
</style>
