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
                    <span class="title font-weight-light card-title">Egresos</span>
                    <br>
                    <span class="font-weight-thin card-subtitle">Reporte de egresos</span>
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
                    <v-btn @click="createExpense" color="white" small fab outline>
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
                hide-actions
              >
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>

                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td class="text-xs-left">{{ props.item.type }}</td>
                    <td class="text-xs-center">{{ props.item.cost }}</td>
                    <td class="text-xs-right">{{ props.item.date }}</td>
                  </tr>
                </template>

                <template slot="expand" slot-scope="props">
                  <v-card flat>
                    <table class="full-width-table">
                      <tr class="text-xs-left">
                        <td><b>Acciones</b></td>
                        <td>
                          <v-btn @click="deleteDialogExpense(props.item)" fab small color="red">
                            <v-icon color="white">delete</v-icon>
                          </v-btn>
                          <v-btn @click="editExpense(props.item)" fab small color="green">
                            <v-icon color="white">edit</v-icon>
                          </v-btn>
                        </td>
                      </tr>
                    </table>
                  </v-card>
                </template>
              </v-data-table>
              <br><br><br>
              <chart-bar
                :chart-data="barChartCycles"
                :options="chartOptionsBar"
              ></chart-bar>
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
          <v-btn color="red" @click="deleteExpense">Eliminar</v-btn>
          <v-btn color="green" @click="dialogDelete = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogNewExpense" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Crear Nuevo Egreso</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Tipo"
                v-model="newExpense.type"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs6 px-2>
              <v-text-field
                label="Costo"
                v-model="newExpense.cost"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Fecha"
                type="date"
                v-model="newExpense.date"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" @click="dialogNewExpense = false">Cancelar</v-btn>
          <v-btn color="green" @click="postNewExpense">Crear Usuario</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEditExpense" max-width="600" persistent>
      <v-card>
        <v-card-title class="headline">Editar</v-card-title>
        <v-card-text>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Tipo"
                v-model="editingExpense.type"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs6 px-2>
              <v-text-field
                label="Costo"
                v-model="editingExpense.cost"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs6 px-2>
              <v-text-field
                label="Fecha"
                type="date"
                v-model="editingExpense.date"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveExpense">Guardar Cambios</v-btn>
          <v-btn color="green" @click="dialogEditExpense = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ChartBar from '../components/ChartBar.js'
import axios from 'axios'
export default {
  components: {
    ChartBar
  },
  data () {
    return {
      dialogDelete: false,
      dialogNewExpense: false,
      dialogEditExpense: false,
      expand: false,
      search: '',
      editingExpense: {},
      deletingExpense: {},
      newExpense: {},
      barChartCycles: {},
      headers: [
        {
          text: 'Tipo',
          value: 'type',
          align: 'left'
        },
        {
          text: 'Costo',
          value: 'cost',
          align: 'center'
        },
        {
          text: 'Fecha',
          value: 'date',
          align: 'right'
        }
      ],
      items: [],
      chartOptionsBar: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem.index].split(':')[0] + ': ' + data.datasets[0].data[tooltipItem.index]
            }
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  methods: {
    deleteDialogExpense (expense) {
      this.dialogDelete = true
      this.deletingExpense = expense
    },
    deleteExpense () {
      this.dialogDelete = false
      axios
        .delete(`http://localhost:3000/expense/${this.deletingExpense.id}`)
        .then(response => {
          console.log(response.data)
        })
    },
    editExpense (expense) {
      this.editingExpense.type = expense.type
      this.editingExpense.cost = expense.cost
      this.editingExpense.date = expense.date
      this.editingExpense.id = expense.id
      this.dialogEditExpense = true
    },
    saveExpense () {
      this.dialogEditExpense = false
      axios
        .put(`http://localhost:3000/expense/${this.editingExpense.id}`, {
          type: this.editingExpense.type,
          cost: this.editingExpense.cost,
          date: this.editingExpense.date
        })
        .then(response => {
          console.log(response.data)
        })
    },
    createExpense () {
      this.dialogNewExpense = true
    },
    postNewExpense () {
      this.dialogNewExpense = false
      // post Expense to db
      axios
        .post('http://localhost:3000/expense', {
          type: this.newExpense.type,
          cost: this.newExpense.cost,
          date: this.newExpense.date
        })
        .then(response => {
          console.log(response.data)
        })
    },
    setupChart () {
      var newChartExpenses = {
        labels: ['Ciclo marzo-octubre 2014', 'Ciclo marzo-octubre 2015', 'Ciclo marzo-octubre 2016', 'Ciclo marzo-octubre 2017', 'Ciclo marzo-octubre 2018'],
        datasets: [
          {
            label: 'Materiales',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [15000, 4500, 2000, 2500, 3000, 3000]
          },
          {
            label: 'Servicios',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [10000, 3005, 2000, 4000, 3000, 3000, 3000]
          },
          {
            label: 'Tierra',
            borderColor: 'orange',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'orange',
            backgroundColor: 'orange',
            data: [10000, 4010, 6005, 3500, 4500, 4008, 4000]
          }
        ]
      }
      this.barChartCycles = newChartExpenses
    }
  },
  mounted () {
    this.setupChart()
    // GETTING DATA
    axios
      .get('http://localhost:3000/expenses')
      .then(response => (this.items = response.data))
  }
}
</script>

<style scoped>
</style>
