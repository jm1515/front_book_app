import Vue from 'vue'
import Router from 'vue-router'
import ListBook from '@/components/ListBook'
import BookDetails from '@/components/BookDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/listBook'
    },
    {
      path: '/listBook',
      name: 'ListBook',
      component: ListBook
    },
    {
      path: '/bookDetails/:bookId',
      name: 'BookDetails',
      component: BookDetails
    }
  ]
})
