<template>
  <div>
    <v-container fluid>
      <v-layout>
        <v-flex md12>
          <v-card full-width>
            <v-card class="floating-card">
              <v-card-text class="">
                <v-layout>
                  <v-flex class="text-xs-left">
                    <span class="title font-weight-light card-title">Productos</span>
                    <br>
                    <span class="font-weight-thin card-subtitle">Lista de productos</span>
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
                    <v-btn @click="createProduct" color="white" small fab outline>
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
              >
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>

                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.name }}</td>
                    <td>{{ props.item.description }}</td>
                  </tr>
                </template>

                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <table class="full-width-table">
                      <tr class="text-xs-left">
                        <td><b>Acciones</b></td>
                        <td>
                          <v-btn @click="deleteProductDialog(props.item)" fab small color="red">
                            <v-icon color="white">delete</v-icon>
                          </v-btn>
                          <v-btn @click="editProduct(props.item)" fab small color="green">
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

    <v-dialog v-model="dialogCreateProduct" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Crear nuevo producto</v-card-title>
        <v-form v-model="createForm">
          <v-card-text>
            <v-layout>
              <v-flex xs6 px-2>
                <v-text-field
                  label="Nombre"
                  v-model="newProduct.name"
                  :rules="[() => newProduct.name.length > 0 || 'Agrega un nombre.']"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs6 px-2>
                <v-text-field
                  label="Descripción"
                  v-model="newProduct.description"
                  :rules="[() => newProduct.description.length > 0 || 'Agrega una descipción.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="dialogCreateProduct = false">Cancelar</v-btn>
          <v-btn dark color="green" @click="postNewProduct" :disabled="!createForm">Crear Producto</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditProduct" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Editar</v-card-title>
        <v-form v-model="editForm">
          <v-card-text>
            <v-layout>
              <v-flex xs6 px-2>
                <v-text-field
                  label="Nombre"
                  v-model="editingProduct.name"
                  :rules="[() => editingProduct.name.length > 0 || 'Agrega un nombre.']"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs6 px-2>
                <v-text-field
                  label="Descripción"
                  v-model="editingProduct.description"
                  :rules="[() => editingProduct.description.length > 0 || 'Agrega una descipción.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark @click="dialogEditProduct = false">Cancelar</v-btn>
          <v-btn dark color="green" @click="saveProduct" :disabled="!editForm">Guardar Cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogDelete" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Seguro que deseas eliminar este dato?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="deleteProduct">Eliminar</v-btn>
          <v-btn dark color="green" @click="dialogDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
      dialogCreateProduct: false,
      dialogEditProduct: false,
      dialogDelete: false,
      createForm: false,
      editForm: false,
      search: '',
      expand: false,
      newProduct: {
        name: '',
        description: ''
      },
      editingProduct: {
        name: '',
        description: ''
      },
      deletingProduct: {},
      headers: [
        {
          text: 'Nombre',
          value: 'name'
        },
        {
          text: 'Descripción',
          value: 'description'
        }
      ],
      items: []
    }
  },
  methods: {
    getProducts () {
      var vm = this
      this.$http.get('products').then(response => {
        vm.products = []
        vm.items = []
        response.data.forEach(product => {
          if (product.estado) {
            vm.items.push(product)
          }
        })
      }, response => {
        console.log('bad request')
        console.log(response.data)
      })
    },
    createProduct () {
      this.dialogCreateProduct = true
    },
    deleteProductDialog (product) {
      this.deletingProduct.id = product.id
      this.dialogDelete = true
    },
    deleteProduct () {
      this.dialogDelete = false
      // post product to db
      this.$http.delete('product/' + this.deletingProduct.id).then(response => {
        this.getProducts()
        console.log(response.data)
      }, response => {
        console.log('bad ' + response.data)
      })
    },
    editProduct (product) {
      this.editingProduct.name = product.name
      this.editingProduct.description = product.description
      this.editingProduct.id = product.id
      this.dialogEditProduct = true
    },
    postNewProduct () {
      this.dialogCreateProduct = false
      // post product to db
      this.$http.post('product', this.newProduct).then(response => {
        this.getProducts()
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    saveProduct () {
      this.dialogEditProduct = false
      this.$http.put('product/' + this.editingProduct.id, this.editingProduct).then(response => {
        this.getProducts()
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
