Задание 1
1) Поля 1,2,3 допускают только числовые значения.
2) Поле 4 позволяет выбрать любую в интервале от 01-01-2020 до 31-12-2020.
3) Кнопка «Отправить» должна быть активна только при условии:
- все поля 1-4 заполнены;
- в полях 1-3 введены допустимые значения.
4) При нажатии на кнопку «Отправить» из формы отправляется  запрос на сервер:
- метод POST;
- content-type: application/json;
- тело запроса должно содержать json-объект, содержащий введенные в поля значения.
- значение из поля 4 должно быть записано в объект в формате «ГГГГ-ММ-ДД» (например «2020-01-02»).
5) Размеры формы должны быть:
- ширина не более 30% окна;
- высота не более 50% окна;
6) Требования к стилю оформления (цветовая палитра, шрифты, иконки) отсутствуют.
<template>
<!--  при клике на кнопку вызывается метод "onSubmit"-->
  <form @submit.prevent="onSubmit">

<!--    поле "Количество ДТП"-->
    <label for="nCrashed">Количество ДТП</label>
    <input
        id="nCrashed"
        type="text"
        v-model.trim="nCrashed"
        :class="{invalid: ($v.nCrashed.$dirty && !$v.nCrashed.required) || (!$v.nCrashed.numeric)}"
    >
    <small class="isError" v-if="!$v.nCrashed.numeric">Введите числовое значение!</small>

<!--    поле "Количество раненых"-->
    <label for="nWounded">Количество раненых</label>
    <input
        id="nWounded"
        type="text"
        v-model.trim="nWounded"
        :class="{invalid: ($v.nWounded.$dirty && !$v.nWounded.required) || !$v.nWounded.numeric}"
    >
    <small class="isError" v-if="!$v.nWounded.numeric">Введите числовое значение!</small>

<!--    поле "Количество погибших"-->
    <label for="nLosted">Количество погибших</label>
    <input
        id="nLosted"
        type="text"
        v-model.trim="nLosted"
        v-bind:class="{isError: true}"
        :class="{invalid: ($v.nLosted.$dirty && !$v.nLosted.required) || !$v.nLosted.numeric}"
    >
    <small class="isError" v-if="!$v.nLosted.numeric">Введите числовое значение!</small>

<!--    поле выбора даты-->
    <label for="d">Дата</label>
    <input
        id="d"
        type="date"
        min="2020-01-01"
        max="2020-12-31"
        v-model="d"
        :class="{invalid: ($v.d.$dirty && !$v.d.required)}"
    >

<!--    кнопка активна в случае корректно заполненных полей формы-->
    <button
        type="submit"
        v-bind:disabled="($v.nCrashed.$invalid || $v.nWounded.$invalid || $v.nLosted.$invalid || $v.d.$invalid)"
    >Отправить</button>
  </form>
</template>

<script>
import {required, numeric} from 'vuelidate/lib/validators'

export default {
  name: "DTP",

  data() {
    return {
      nCrashed: '',
      nWounded: '',
      nLosted: '',
      d: ''
    }
  },
  validations: {
    nCrashed: {required, numeric},
    nWounded: {required, numeric},
    nLosted: {required, numeric},
    d: {required}
  },
  methods: {

    // метод формирования объекта с данными из формы
    // и отправки его на сервер
    onSubmit() {
      // инициализируем объект, который будем отправлять на сервер
      // записываем в объект данные из формы
      const formData = {
        nCrashed: this.nCrashed,
        nWounded: this.nWounded,
        nLosted: this.nLosted,
        d: this.d
      }

      // отправляем запрос на сервер по адресу http://httpbin.org/post
      // методом POST
      // в теле запроса json объект "formData", содержащий
      // данные из формы
      fetch('http://httpbin.org/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(formData)
      });
    }
  }
}

</script>

<style scoped>
  form {
    text-align: left;
    width: 30%;
    height: 50%;
    margin-top: 40px;
  }

  input {
    width: 100%;
    font-family: "Lato", sans-serif;
    font-size: 0.875rem;
    font-weight: 300;
    color: #374853;
    line-height: 2.375rem;
    min-height: 2.375rem;
    position: relative;
    border: 1px solid #565656;
    border-radius: 5px;
    background: #fff;
    padding: 0 0.8125rem;
    transition: border .1s ease;
    box-sizing: border-box;
  }
  .isError {
    width: 100%;
    font-family: "Lato", sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: #f63e1e;
    line-height: 2.375rem;
    min-height: 2.375rem;
    position: relative;
    padding: 0 0.8125rem;
    transition: border .1s ease;
    box-sizing: border-box;
  }

  label {
    font-size: 0.8125rem;
    color: #4b6372;
    margin-bottom: 0.3125rem;
    margin-left: 0.875rem;
    margin-top: 0.9rem;
    display: block;
    font-family: "Lato", sans-serif;
    text-align: center;
  }

  button {
    position: relative;
    top: 50%;
    left: 50%;
    margin-top: 20px;
    padding: 9px 25px;
    border-radius: 5px;
    background-color: white;
    color: #5fa9fc;
    border: 2px solid #5fa9fc;
  }
</style>