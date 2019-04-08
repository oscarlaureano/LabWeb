<template>
  <div>
    <v-container fluid>
      <v-layout justify-center wrap>
        <v-flex md12>
          <v-card full-width>
            <v-card class="floating-card">
              <v-card-text class="">
                <v-layout>
                  <v-flex class="text-xs-left">
                    <span class="title font-weight-light card-title">Usuarios</span>
                    <br>
                    <span class="font-weight-thin card-subtitle">Manejo de usuarios</span>
                  </v-flex>
                  <v-flex>
                    <v-text-field
                      dark
                      class="font-weight-light"
                      v-model="search"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-flex>
                  <v-flex class="text-xs-right">
                    <v-btn @click="createUser" color="white" small fab outline>
                      <v-icon>add</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>

            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="items"
                :expand="expand"
                :search="search"
                item-key="id"
                hide-actions
              >
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>

                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td class="text-xs-left">{{ props.item.email }}</td>
                    <td class="text-xs-center">{{ props.item.name }}</td>
                    <td class="text-xs-right">{{ props.item.role }}</td>
                  </tr>
                </template>

                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <table class="full-width-table">
                      <tr class="text-xs-left">
                        <td><b>Acciones</b></td>
                        <td>
                          <v-btn @click="dialogDelete=true" fab small color="red">
                            <v-icon color="white">delete</v-icon>
                          </v-btn>
                          <v-btn @click="editUser(props.item)" fab small color="green">
                            <v-icon color="white">edit</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </table>
                  </v-card>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialogDelete" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Seguro que deseas eliminar este dato?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialogDelete = false">Eliminar</v-btn>
          <v-btn color="green" @click="dialogDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNewUser" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Crear Nuevo Usuario</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Nombre"
                v-model="newUser.name"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs6 px-2>
              <v-text-field
                label="Email"
                v-model="newUser.email"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Tipo de usuario"
                v-model="newUser.role"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialogNewUser = false">Cancelar</v-btn>
          <v-btn color="green" @click="postNewUser">Crear Usuario</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditUser" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Editar</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Nombre"
                v-model="editingUser.name"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs6 px-2>
              <v-text-field
                label="Email"
                v-model="editingUser.email"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Tipo de usuario"
                v-model="editingUser.role"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveUser">Guardar Cambios</v-btn>
          <v-btn color="green" @click="dialogEditUser = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  components: {
  },
  data () {
    return {
      dialogDelete: false,
      dialogNewUser: false,
      dialogEditUser: false,
      expand: false,
      search: '',
      editingUser: {},
      newUser: {},
      headers: [
        {
          text: 'Email',
          value: 'email',
          align: 'left'
        },
        {
          text: 'Nombre',
          value: 'name',
          align: 'center'
        },
        {
          text: 'Tipo de usuario',
          value: 'role',
          align: 'right'
        }
      ],
      items: []
    }
  },
  methods: {
    editUser (user) {
      this.editingUser.name = user.name
      this.editingUser.email = user.email
      this.editingUser.role = user.role
      this.dialogEditUser = true
    },
    saveUser () {
      this.dialogEditUser = false
      // update user with id in db
    },
    createUser () {
      this.dialogNewUser = true
    },
    postNewUser () {
      this.dialogNewUser = false
      // post user to db
      axios
        .post('http://localhost:3000/user', {
          name: this.newUser.name,
          email: this.newUser.email,
          role: this.newUser.role
        })
        .then(response => {
          console.log(response.data)
        })
    }
  },
  mounted () {
    // GETTING DATA
    axios
      .get('http://localhost:3000/users')
      .then(response => (this.items = response.data))
  }
}
</script>

<style scoped>

</style>
