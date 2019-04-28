<template>
  <v-app>
    <v-navigation-drawer
      id="app-drawer"
      app
      dark
      floating
      persistent
      mobile-break-point="991"
      width="260"
    >
      <v-img
        src="https://images.unsplash.com/photo-1514116799412-5876d319c242?ixlib=rb-1.2.1&w=1000&q=80"
        height="100%"
      >
        <v-layout
          class="fill-height"
          column
        >
          <v-list-tile avatar>
            <v-list-tile-avatar
              color="white"
            >
              <img src="./assets/icon_agrotech.png">
            </v-list-tile-avatar>
            <v-list-tile-title class="title">
              Agrotech
            </v-list-tile-title>
          </v-list-tile>
          <v-divider/>
          <v-list-tile
            v-if="responsive"
          >
            <v-text-field
              class="purple-input search-input"
              label="Search..."
              color="purple"
            />
          </v-list-tile>
          <v-list-tile
            v-for="(link, i) in links"
            :key="i"
            :to="link.to"
            avatar
            class="v-list-item"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title
              v-text="link.text"
            />
          </v-list-tile>
        </v-layout>
      </v-img>
    </v-navigation-drawer>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      links: [
        {
          to: '/',
          icon: 'dashboard',
          text: 'Dashboard'
        },
        {
          to: '/reportProduction',
          icon: 'local_dining',
          text: 'Producción'
        },
        {
          to: '/reportProducts',
          icon: 'restaurant',
          text: 'Productos'
        },
        {
          to: '/reportSales',
          icon: 'attach_money',
          text: 'Ventas'
        },
        {
          to: '/reportSensors',
          icon: 'router',
          text: 'Sensores'
        },
        {
          to: '/reportExpenses',
          icon: 'spa',
          text: 'Egresos'
        },
        {
          to: '/reportUsers',
          icon: 'group',
          text: 'Usuarios'
        }
      ],
      responsive: false
    }
  }
}
</script>

<style>
.v-image__image {
  opacity: .4;
}

#app-drawer .v-list__tile {
  border-radius: 4px;
  color: white;
  margin: 10px 15px 0;
}

#app-drawer .v-list__tile--active {
  background: #4caf50;
  color: white !important;
}

#app-drawer .v-list__tile--buy {
  margin-top: auto;
  margin-bottom: 17px;
}

#app-drawer .v-image__image--contain {
  top: 9px;
  height: 60%;
}

#app-drawer .search-input {
  margin-bottom: 30px !important;
  padding-left: 15px;
  padding-right: 15px;
}

.floating-card {
  background: linear-gradient(60deg,#66bb6a,#43a047);
  width: 97%;
  text-align: center;
  margin: auto;
  border-radius: 3px !important;
  top: -15px;
  margin-top: 15px;
  margin-bottom: -15px;
}

.card-title {
  color: white;
  line-height: 1.5em !important;
  font-size: 1.125rem !important;
}

.card-subtitle {
  color: hsla(0,0%,100%,.62);
}
</style>
