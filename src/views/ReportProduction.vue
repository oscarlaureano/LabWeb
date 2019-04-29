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
        <v-card-text>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="# total de cajas"
                v-model="editingProduction.boxes"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs6 px-2>
              <v-text-field
                label="KGMS"
                v-model="editingProduction.kgms"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveProduction">Guardar Cambios</v-btn>
          <v-btn color="green" @click="dialogEditProduction = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNewProduction" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Crear nueva producción</v-card-title>
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
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Producto"
                v-model="newProduction.product"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6 px-2>
              <v-text-field
                label="KGMS"
                v-model="newProduction.kgms"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialogNewProduction = false">Cancelar</v-btn>
          <v-btn color="green" @click="postNewProduct">Crear Venta</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChartLine from '../components/ChartLine.js'
import axios from 'axios'
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
      initialDate: false,
      formattedDate: null,
      newProduction: {
        date: ''
      },
      editingProduction: {},
      deletingProduction: {},
      expand: false,
      search: '',
      products: [],
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
      items: [
        {
          id: 1,
          date: moment(new Date('01/01/2019 07:28')).format('MMMM YYYY'),
          boxes: 350,
          kgms: 12000
        },
        {
          id: 2,
          date: moment(new Date('02/01/2019 07:28')).format('MMMM YYYY'),
          boxes: 120,
          kgms: 3100
        },
        {
          id: 3,
          date: moment(new Date('03/01/2019 07:28')).format('MMMM YYYY'),
          boxes: 10,
          kgms: 500
        },
        {
          id: 4,
          date: moment(new Date('04/01/2019 07:28')).format('MMMM YYYY'),
          boxes: 100,
          kgms: 50000
        },
        {
          id: 5,
          date: moment(new Date('05/01/2019 07:28')).format('MMMM YYYY'),
          boxes: 100,
          kgms: 50000
        },
        {
          id: 6,
          date: moment(new Date('06/01/2019 07:28')).format('MMMM YYYY'),
          boxes: 100,
          kgms: 50000
        }
      ],
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
    deleteDialogProduction(production) {
      this.dialogDelete = true
      this.deletingProduction = production
    },
    deleteProduction() {
      this.dialogDelete = false
       axios
        .delete(`http://localhost:3000/production/${this.deletingProduction.id}`)
        .then(response => {
          console.log(response.data)
        })
    },
    createProduction () {
      this.dialogNewProduction = true
    },
    postNewProduct () {
      this.dialogNewProduction = false
    
      // post production to db
      axios
        .post('http://localhost:3000/production', {
          date: this.newProduction.date,
          boxes: this.newProduction.boxes,
          product: this.newProduction.product,
          kgms: this.newProduction.kgms
        })
        .then(response => {
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
      axios
        .put(`http://localhost:3000/production/${this.editingProduction.id}`, {
          boxes: this.editingProduction.boxes,
          kgms: this.editingProduction.kgms
        })
        .then(response => {
          console.log(response.data)
        })
    },
    setupChart () {
      var newLabels = []
      this.items.forEach(function (item) {
        newLabels.push(item.date)
      })

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
    axios.get('http://localhost:3000/products')
      .then(function (response) {
        vm.products = response.data
        console.log(vm.products)
      }, response => {
        console.log('bad request')
        console.log(response.data)
      })

    // Get production data and initialize chart
    var vm = this
    axios.get('http://localhost:3000/production')
      .then(function (response) {
        vm.items = response.data
        vm.items.forEach(function (production) {
          production.productionID = vm.products[production.productID - 1].name
        })
        // Setup chart
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
