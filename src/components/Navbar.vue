<template>
    <div>
      <b-navbar id="top-navbar" type="dark" variant="dark" toggleable="lg">
        <b-navbar-nav>
          <b-nav-item @click="goHome">
            <b>Book App</b>
          </b-nav-item>
        </b-navbar-nav>
      </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    goHome () {
      this.$router.push({ name: 'ListBook' })
      location.reload()
    }
  }
}
</script>

<style scoped>
  #top-navbar {
    box-shadow: 0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15);
    height: 70px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }
</style>
