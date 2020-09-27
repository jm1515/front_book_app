<template>
  <div>
    <navbar></navbar>
    <div id="title-page">
      <h1>Détails du livre</h1>
    </div>
    <div id="section-book">
      <div id="content-book">
        <b-form @submit="sendData">
          <b-form-group label="Nom du livre :" label-for="inputTitle" class="inputData">
            <b-form-input ref="inputTitle" id="inputTitle" placeholder="Nom du livre" v-model="book.title">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Auteur :" label-for="inputAuthor" class="inputData">
            <b-form-input ref="inputAuthor" id="inputAuthor" placeholder="Nom de l'auteur" v-model="book.author">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Date de parution :" label-for="inputDate" class="inputData">
            <b-form-input ref="inputDate" id="inputDate" placeholder="Date de parution" v-model="book.year">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Résumé :" label-for="inputDesc" class="inputData">
            <b-form-textarea ref="inputDesc" id="inputDesc" placeholder="Résumé du livre"
            v-model="book.description" rows="4" no-resize></b-form-textarea>
          </b-form-group>
          <b-form-group class="inputData" label="Best seller :" label-for="selectValues">
            <b-form-select ref="selectValues" id="selectValues" :options="valuesBestSeller" v-model="book.bestseller">
            </b-form-select>
          </b-form-group>
          <b-form-group label="Prix (en euros) :" label-for="inputPrice" class="inputData">
            <b-form-input ref="inputPrice" id="inputPrice" placeholder="Prix du livre" v-model="book.price">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Commentaires :" label-for="inputComment" class="inputData">
            <b-form-textarea ref="inputComment" id="inputComment" placeholder="Ecrivez un commentaire"
             v-model="book.comment" rows="4" no-resize></b-form-textarea>
          </b-form-group>
          <b-form-group class="inputData">
            <b-button id="delete-btn" variant="danger" @click="goHome">Annuler</b-button>
            <b-button id="save-btn" @click="saveBookData">Enregistrer</b-button>
          </b-form-group>
        </b-form>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Footer from './Footer'

export default {
  name: 'BookDetails',
  components: {Footer, Navbar},
  data () {
    return {
      book: {
        author: '',
        title: '',
        year: '',
        price: '',
        bestseller: '',
        comment: '',
        description: ''
      },
      valuesBestSeller: [{ text: 'Sélectionnez une valeur', value: null }, 'Oui', 'Non']
    }
  },
  http: {
    root: 'url of backend'
  },
  methods: {
    sendData () {
      return true
    },
    goHome () {
      this.$router.push({ name: 'ListBook' })
    },
    async getBookData () {
      this.$resource('urlBooks/' + this.$route.params.bookId).get().then(
        response => {
          console.log('Data', response.data)
          this.book = response.data
          if (this.book.bestseller === true) {
            this.book.bestseller = 'Oui'
          } else {
            this.book.bestseller = 'Non'
          }
        },
        response => {
          console.log('error', response)
        }
      )
    },
    saveBookData () {
      this.book.author = this.$refs.inputAuthor.value
      this.book.title = this.$refs.inputTitle.value
      this.book.year = this.$refs.inputDate.value
      this.book.price = this.$refs.inputPrice.value
      if (this.$refs.selectValues.value === 'Oui') {
        this.book.bestseller = true
      } else if (this.$refs.selectValues === 'Non') {
        this.book.bestseller = false
      } else {
        this.book.bestseller = null
      }
      this.book.comment = this.$refs.inputComment.value
      this.book.description = this.$refs.inputDesc.value
      const paramRoute = this.$route.params.bookId
      if (paramRoute !== 'add') {
        this.$resource('urlBooks/' + this.$route.params.bookId).update(this.book).then(() => {
          this.goBackToHome()
        })
      } else {
        this.$http.post('https://bookserver-backend.herokuapp.com/books', this.book).then(() => {
          this.goBackToHome()
        })
      }
    },
    goBackToHome () {
      this.$router.push({ name: 'ListBook' })
      location.reload()
    }
  },
  created () {
    const paramRoute = this.$route.params.bookId
    if (paramRoute !== 'add') {
      this.getBookData()
    }
  }
}
</script>

<style scoped>
  #title-page h1{
    margin-top: 120px;
    font-weight: bold;
    text-align: center;
    font-size: 30px;
  }
  #section-book{
    background-color: white;
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
    width: 90%;
    margin: 40px auto 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
  }
  #content-book{
    width: 95%;
  }
  .inputData{
    padding-bottom: 20px;
  }
  #delete-btn{
    float: left;
    padding: 15px 100px;
  }
  #save-btn{
    float: right;
    padding: 15px 100px;
  }
  @media screen and (max-width: 655px) {
    #delete-btn{
      margin-bottom: 20px;
      float: none;
    }
    #save-btn{
      float: none;
    }
  }

</style>
