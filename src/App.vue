<template>
  <div id="app">
    <a href="">Карта</a>
    <a href="">Аналитика</a>
    <a href="">Отчёт</a>
    <router-link to="/dtp">ДТП</router-link>
    <router-link to="/rating">Рейтинг ГО</router-link>
    <router-view/>  <!-- здесь будет текущая форма/таблица -->
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  div {
    padding-top: 20px;
    padding-left: 10px;
  }

  a, router-link {
    font: caption;
    font-size: 14px;
    text-decoration: none;
    font-style: normal;
    width: 100px;
    padding: 20px;
  }
</style>