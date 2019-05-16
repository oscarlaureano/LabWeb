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
                    <span class="title font-weight-light card-title">Producción</span>
                    <br>
                    <span class="font-weight-thin card-subtitle">Datos de produccion</span>
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
                    <v-btn @click="createProduction" color="white" small fab outline>
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
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.boxes }}</td>
                    <td>{{ props.item.productionID }}</td>
                    <td class="text-xs-right">{{ props.item.kgms }}</td>
                  </tr>
                </template>

                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <table class="full-width-table">
                      <tr class="text-xs-left">
                        <td><b>Acciones</b></td>
                        <td>
                          <v-btn @click="deleteDialogProduction(props.item)" fab small color="red">
                            <v-icon color="white">delete</v-icon>
                          </v-btn>
                          <v-btn @click="editProduction(props.item)" fab small color="green">
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

          <br>
          <v-card>
            <v-card-text>
              <chart-line
                :chart-data="productionChart"
                :options="chartOptions"
                class="Chart"
              ></chart-line>
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
          <v-btn color="red" @click="deleteProduction">Eliminar</v-btn>
          <v-btn color="green" @click="dialogDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditProduction" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Editar</v-card-title>
        <v-form v-model="editForm">
          <v-card-text>
            <v-layout>
              <v-flex xs6 px-2>
                <v-text-field
                  label="# total de cajas"
                  v-model="editingProduction.boxes"
                  :rules="[() => editingProduction.boxes > 0 || 'Agrega KGMS.']">
                >
                </v-text-field>
              </v-flex>

              <v-flex xs6 px-2>
                <v-text-field
                  label="KGMS"
                  v-model="editingProduction.kgms"
                  :rules="[() => editingProduction.kgms > 0 || 'Agrega KGMS.']">
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogEditProduction = false">Cancelar</v-btn>
          <v-btn color="green" @click="saveProduction" :disabled="!editForm">Guardar Cambios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNewProduction" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Crear nueva producción</v-card-title>
        <v-form v-model="createForm">
          <v-card-text>
            <v-layout>
              <v-flex xs6 px-2>
                <v-menu
                  lazy
                  v-model="initialDate"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    @click="clearDate"
                    readonly
                    slot="activator"
                    label="Fecha de producción"
                    v-model="formattedDate"
                    required
                    :rules="[() => newProduction.date.length > 0 || 'Selecciona una fecha de producción']"
                  ></v-text-field>
                  <v-date-picker
                  v-model="newProduction.date"
                  @input="formattedDate = formatDate($event)"
                  no-title
                  scrollable
                  actions
                  :show-current="false"></v-date-picker>
                </v-menu>
              </v-flex>

              <v-flex xs6 px-2>
                <v-text-field
                  label="# total de cajas"
                  v-model="newProduction.boxes"
                  :rules="[() => newProduction.boxes > 0 || 'Agrega un # de cajas.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs6 px-2>
                <v-select
                  :items="productOptions"
                  v-model="newProduction.product"
                  label="Producto"
                  required
                  :rules="[() => newProduction.product > 0 || 'Selecciona un producto.']">
                </v-select>
              </v-flex>
              <v-flex xs6 px-2>
                <v-text-field
                  label="KGMS"
                  v-model="newProduction.kgms"
                  :rules="[() => newProduction.kgms > 0 || 'Agrega KGMS.']">
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialogNewProduction = false">Cancelar</v-btn>
          <v-btn color="green" @click="postNewProduct" :disabled="!createForm">Crear Venta</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChartLine from '../components/ChartLine.js'
var moment = require('moment')
moment.locale('es')
export default {
  components: {
    ChartLine
  },
  data () {
    return {
      dialogNewProduction: false,
      dialogDelete: false,
      dialogEditProduction: false,
      createForm: false,
      editForm: false,
      initialDate: false,
      formattedDate: null,
      newProduction: {
        date: '',
        product: '',
        boxes: ''
      },
      editingProduction: {},
      deletingProduction: {},
      expand: false,
      search: '',
      products: [],
      productOptions: [],
      headers: [
        {
          text: 'Fecha',
          value: 'date'
        },
        {
          sortable: false,
          text: '# total de cajas',
          value: 'boxes'
        },
        {
          sortable: true,
          text: 'Producto',
          value: 'productionID'
        },
        {
          sortable: false,
          text: 'KGMS',
          value: 'kgms',
          align: 'right'
        }
      ],
      items: [],
      chartOptions: {
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ]
        },
        legend: {
          display: true
        },
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: function (tooltipItems, data) {
              return tooltipItems.yLabel + ' unidades'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
      },
      productionChart: {}
    }
  },
  methods: {
    deleteDialogProduction (production) {
      this.dialogDelete = true
      this.deletingProduction = production
    },
    deleteProduction () {
      this.dialogDelete = false
      this.$http.delete('production/' + this.deletingProduction.id).then(response => {
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    createProduction () {
      this.dialogNewProduction = true
    },
    postNewProduct () {
      this.dialogNewProduction = false
      // post production to db
      this.$http.post('http://localhost:3000/production', this.newProduction).then(response => {
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    editProduction (production) {
      this.editingProduction.boxes = production.boxes
      this.editingProduction.kgms = production.kgms
      this.editingProduction.id = production.id
      this.dialogEditProduction = true
    },
    saveProduction () {
      this.dialogEditProduction = false
      this.$http.put('production/' + this.editingProduction.id, this.editingProduction).then(response => {
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    setupChart () {
      var newLabels = []
      var colors = []
      var datasets = []

      /*
      // Generate a label and color for each existing product
      this.products.forEach(function (item) {
        // Generate a color
        var letters = '0123456789ABCDEF'
        var color = '#'
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        newLabels.push(item.date)
        colors.push(color)
      })

      // For every production, associate data based on product
      this.items.forEach(function (production) {
        this.products.forEach(function (product) {
          if (production.productionID === product.name) {

          }
        })
        datasets.push({
          
        })
        
      })
      */

      var newChartProduction = {
        labels: newLabels,
        datasets: [
          {
            label: this.products[0].name,
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [150, 45, 2, 25, 30, 30]
          },
          {
            label: this.products[1].name,
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [100, 35, 2, 40, 30, 30, 30]
          },
          {
            label: this.products[2].name,
            borderColor: 'orange',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'orange',
            backgroundColor: 'orange',
            data: [100, 40, 6, 35, 45, 40, 40]
          }
        ]
      }
      this.productionChart = newChartProduction
    },
    clearDate () {
      this.newProduction.date = ''
      this.formattedDate = null
    },
    formatDate (date) {
      if (!date) {
        return null
      }

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  },
  mounted () {
    // Get product name data
    this.$http.get('products').then(response => {
      vm.products = response.data
      response.data.forEach(function (product) {
        vm.productOptions.push({
          value: product.id,
          text: product.name
        })
      })
      console.log(vm.products)
    }, response => {
      console.log('bad request')
      console.log(response.data)
    })

    // Get production data and initialize chart
    var vm = this
    this.$http.get('production').then(response => {
      vm.items = response.data
      vm.items.forEach(function (production) {
        production.productionID = vm.products[production.productID - 1].name
      })
      // Setup chart
      console.log('production', response.data)
      vm.setupChart()
    }, response => {
      console.log('bad request')
      console.log(response.data)
    })
  }
}
</script>

<style scoped>

</style>
