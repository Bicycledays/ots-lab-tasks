Задание 2
1) Страница с таблицей должна быть прокручиваемой, либо использовать для таблицы паджинацию для навигации от начала рейтинга до конца.
2) При загрузке страницы таблица формируется по алфавитному порядку названий объектов.
3) При клике на название колонки «Городской округ» должна выполняться сортировка строк в прямом и обратном направлении.
4) Требования к стилю оформления (цветовая палитра, шрифты, иконки) отсутствуют. Допускается использование как нативных стилей браузера, так и верстки с использованием Bootstrap.

5)* Реализовать сортировку строк по всем оставшимся колонкам таблицы, аналогично сортировке строк по колонке «Городской округ»

<template>
  <div class="older">
    <h1 style="text-align: center">Рейтинг городских округов</h1>
    <v-data-table
        :headers="headers"
        :items="districts"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation-1"
        @page-count="pageCount = $event"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-pagination
          v-model="page"
          :length="pageCount"
      ></v-pagination>
    </div>
  </div>
</template>
<script>
import table from '@/table/table.json'
export default {
  data () {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      headers: [
        {
          text: 'Городской округ',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Прошедшие сутки', value: 'day' },
        { text: 'Прошедшая неделя', value: 'week' },
        { text: 'Прошедший месяц', value: 'month' }
      ],
      districts: table.districtTables
    }
  }
}
</script>

<style>
  .older {
    padding-top: 10px;
    border-right-style: solid;
    border-right-color: #f0906a;
    width: 600px;
  }

  span {
    font-size: 14px;
  }

  table {
    padding-right: 10px;
  }

  td, th {
    text-align: center;
    border: 1px solid #dbdfe3;
  }
</style>