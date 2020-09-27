<template>
  <div>
    <navbar></navbar>
    <div id="top-content">
      <h1>Accueil</h1>
    </div>
    <div id="list-book">
      <b-card v-for="book in lists" :key="book.title" class="content-book" text-variant="black" :title="book.title">

        <b-card-text>
          <b>Auteur : </b> {{ book.author }}
        </b-card-text>
        <b-card-text>
          <b>Date : </b> {{ book.year }}
        </b-card-text>
        <b-card-text>
          <b>Résumé : </b> {{ book.description }}
        </b-card-text>
        <b-button id="delete-btn" variant="danger" @click="showDialog(book._id)">Supprimer</b-button>
        <b-button @click="redirectToBook(book._id)">Modifier</b-button>

      </b-card>

      <div>
        <b-modal id="modal-delete" ref="dialogDelete" title="Suppression" ok-title="Supprimer" ok-variant="danger" cancel-title="Annuler" @cancel="hideDialog"
        @ok="deleteBook">
          <p class="my-4"> Etes-vous sûr de vouloir supprimer ce livre ?</p>
        </b-modal>
      </div>
    </div>

    <div id="navigation-fill">
      <div>
        <b-pagination v-model="currentPage" :per-page="nbDataPage" :total-rows="rows" align="fill" class="custom-pagination"
        @click.native="scrollToTop"></b-pagination>
      </div>
    </div>

    <fab :position="position"
         :bg-color="bgColor"
         :actions="fabActions"
         @refresh="reloadPage"
         @newBook="createBook"
    ></fab>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'
import fab from 'vue-fab'

export default {
  name: 'ListBook',
  components: { Footer, Navbar, fab },
  data () {
    return {
      currentPage: 1,
      nbDataPage: 5,
      books: [],
      bookId: '',
      bgColor: '#778899',
      position: 'bottom-right',
      fabActions: [
        {
          name: 'refresh',
          icon: 'cached'
        },
        {
          name: 'newBook',
          icon: 'create'
        }
      ]
    }
  },
  http: {
    root: 'url of backend'
  },
  methods: {
    showDialog (id) {
      this.$refs['dialogDelete'].show()
      this.bookId = id
    },
    hideDialog () {
      this.$refs['dialogDelete'].hide()
    },
    redirectToBook (id) {
      this.$router.push('urlBookDetails/' + id)
      this.scrollToTop()
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    async getBooks () {
      this.$resource('urlBooks').get().then(
        response => {
          this.books = response.data
        },
        response => {
          console.log('error', response)
        }
      )
    },
    deleteBook () {
      this.$resource('urlBooks/' + this.bookId).delete().then(() => {
        this.reloadPage()
      })
    },
    createBook () {
      this.$router.push('urlBookDetails/add')
      this.scrollToTop()
    },
    reloadPage () {
      location.reload()
    }
  },
  computed: {
    lists () {
      if (this.books.length === 0) {
        this.getBooks()
      }
      return this.books.slice((this.currentPage - 1) * this.nbDataPage, this.currentPage * this.nbDataPage)
    },
    rows () {
      return this.books.length
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #top-content h1{
    margin-top: 120px;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
  #list-book{
    margin-top: 50px;
  }
  .content-book{
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
    background-color: white;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
  #delete-btn{
    margin-right: 20px;
  }
  #navigation-fill {
    width: 80%;
    margin: 50px auto 80px;
  }
  .custom-pagination{
    font-weight: bold;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
  }
  .custom-pagination /deep/ > .page-item.active .page-link {
    color: white;
    background-color: #6c757d;
    border-color: #6c757d;
  }
  .custom-pagination /deep/ > .page-item .page-link {
    color: black;
  }

  /*a {
    color: #42b983;
  }*/
</style>
