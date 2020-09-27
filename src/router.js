import Vue from 'vue'
import Router from 'vue-router'
import DTP from '@/components/DTP' // импортируем компонент

Vue.use(Router) // регистрируем Router как плагин

export default new Router({
    mode: 'history',   // чтобы были слэши в путях
    routes: [          // массив, где каждый объект - новая страница
        {
            path: '/dtp',       // путь, который будет в URL
            component: DTP      // компонент, который будет загружен, импортирован в начале
        },
        {
            path: "/rating",
            component: () => import('./components/Rating')    // lazy loading
        }
    ]
})