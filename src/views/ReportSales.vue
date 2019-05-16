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
                    <span class="title font-weight-light card-title">Ventas</span>
                    <br>
                    <span class="font-weight-thin card-subtitle">Datos de ventas</span>
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
                    <v-btn @click="createSale" color="white" small fab outline>
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
                item-key="id"
                :search="search"
              >
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>

                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.boxes }}</td>
                    <td>{{ props.item.kgms }}</td>
                    <td class="text-xs-right">{{ props.item.total }}</td>
                  </tr>
                </template>

                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <table class="full-width-table">
                      <tr class="text-xs-left">
                        <td><b>Producto tipo</b></td>
                        <td>{{ props.item.products[0] }}</td>
                      </tr>

                      <tr class="text-xs-left">
                        <td><b>Acciones</b></td>
                        <td>
                          <v-btn @click="deleteDialogProduction(props.item)" fab small color="red">
                            <v-icon color="white">delete</v-icon>
                          </v-btn>
                          <v-btn @click="editSale(props.item)" fab small color="green">
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
                :chart-data="salesChart"
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
          <v-btn dark color="red" @click="deleteProduction">Eliminar</v-btn>
          <v-btn dark color="green" @click="dialogDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNewSale" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Crear nueva venta</v-card-title>
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
                    label="Fecha de venta"
                    v-model="formattedDate"
                    required
                    :rules="[() => newSale.date.length > 0 || 'Selecciona una fecha de venta']"
                  ></v-text-field>
                  <v-date-picker
                  v-model="newSale.date"
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
                  v-model="newSale.boxes"
                  :rules="[() => newSale.boxes > 0 || 'Agrega un numero de cajas.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs6 px-2>
                <v-text-field
                  label="KGMS"
                  v-model="newSale.kgms"
                  :rules="[() => newSale.kgms > 0 || 'Agrega KGMS.']"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs6 px-2>
                <v-text-field
                  label="Total $"
                  v-model="newSale.total"
                  :rules="[() => newSale.total > 0 || 'Agrega un total.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="dialogNewSale = false">Cancelar</v-btn>
          <v-btn dark color="green" @click="postNewSale" :disabled="!createForm">Crear Venta</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditSale" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Editar</v-card-title>
        <v-form v-model="editForm">
          <v-card-text>
            <v-layout>
              <v-flex xs6 px-2>
                <v-text-field
                  label="# total de cajas"
                  v-model="editingSale.boxes"
                  :rules="[() => editingSale.boxes > 0 || 'Agrega un numero de cajas.']"
                >
                </v-text-field>
              </v-flex>

              <v-flex xs6 px-2>
                <v-text-field
                  label="KGMS"
                  v-model="editingSale.kgms"
                  :rules="[() => editingSale.kgms > 0 || 'Agrega KGMS.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs6 px-2>
                <v-text-field
                  label="Total $"
                  v-model="editingSale.total"
                  :rules="[() => editingSale.total > 0 || 'Agrega un total.']"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark @click="dialogEditSale = false">Cancelar</v-btn>
          <v-btn dark color="green" @click="saveSale" :disabled="!editForm">Guardar Cambios</v-btn>
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
      dialogDelete: false,
      dialogNewSale: false,
      dialogEditSale: false,
      createForm: false,
      editForm: false,
      initialDate: false,
      formattedDate: null,
      expand: false,
      editingSale: {
        date: '',
        boxes: null,
        kgms: null,
        total: null
      },
      deletingSale: {},
      newSale: {
        date: '',
        boxes: null,
        kgms: null,
        total: null
      },
      search: '',
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
          sortable: false,
          text: 'KGMS',
          value: 'kgms'
        },
        {
          sortable: false,
          text: '$ Importe',
          value: 'total',
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
              return '$' + tooltipItems.yLabel
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
      },
      salesChart: {}
    }
  },
  methods: {
    getSales () {
      this.$http.get('sales').then(response => {
        this.items = response.data
        console.log(response.data)
      }, response => {
        console.log('err', response.data)
      })
    },
    deleteDialogProduction (production) {
      this.dialogDelete = true
      this.deletingSale = production
    },
    deleteProduction () {
      this.dialogDelete = false
      this.$http.delete('sale/' + this.deletingSale.id).then(response => {
        this.getSales()
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    editSale (sale) {
      this.editingSale.boxes = sale.boxes
      this.editingSale.kgms = sale.kgms
      this.editingSale.total = sale.total
      this.editingSale.id = sale.id
      this.editingSale.date = sale.date
      this.dialogEditSale = true
    },
    saveSale () {
      this.dialogEditSale = false
      this.$http.put('sale/' + this.editingSale.id, this.editingSale).then(response => {
        this.getSales()
        console.log(response.data)
      }, response => {
        console.log(response.data)
      })
    },
    createSale () {
      this.dialogNewSale = true
    },
    postNewSale () {
      this.dialogNewSale = false
      // post sale to db
      this.$http.post('sale', this.newSale).then(response => {
        this.getSales()
        console.log('created new sale', response.data)
      }, response => {
        console.log(response.data)
      })
    },
    setupChart () {
      var newLabels = []
      this.items.forEach(function (item) {
        newLabels.push(moment(new Date(item.date)).format('MMMM YYYY'))
      })

      var newChartSales = {
        labels: newLabels,
        datasets: [
          {
            label: 'Total ventas',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [2400, 620, 100, 10000]
          }
        ]
      }
      this.salesChart = newChartSales
    },
    clearDate () {
      this.newSale.date = ''
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
    this.setupChart()
    // GETTING DATA
    this.getSales()
  }
}
</script>

<style scoped>

</style>
