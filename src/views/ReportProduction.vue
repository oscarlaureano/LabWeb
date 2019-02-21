<template>
  <div>
    <v-container fluid>
      <v-layout justify-center wrap>
        <v-flex md12>
          <v-card full-width>
            <v-card class="floating-card">
              <v-card-text class="">
                <v-flex class="text-xs-left">
                  <span class="title font-weight-light card-title">Producción</span>
                  <br>
                  <span class="font-weight-thin card-subtitle">Datos de produccion</span>
                </v-flex>
              </v-card-text>
            </v-card>

            <v-card-text>

              <v-data-table
                :headers="headers"
                :items="items"
                :expand="expand"
                item-key="id"
              >
                <template slot="headerCell" slot-scope="{ header }">
                  <span class="subheading font-weight-light text--darken-3" v-text="header.text"/>
                </template>

                <template slot="items" slot-scope="props">
                  <tr @click="props.expanded = !props.expanded">
                    <td>{{ props.item.date }}</td>
                    <td>{{ props.item.boxes }}</td>
                    <td class="text-xs-right">{{ props.item.kgms }}</td>
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
          <v-btn color="red" @click="dialogDelete = false">Eliminar</v-btn>
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
  </div>
</template>

<script>
import ChartLine from '../components/ChartLine.js'
export default {
  components: {
    ChartLine
  },
  data () {
    return {
      dialogDelete: false,
      dialogEditProduction: false,
      editingProduction: {},
      expand: false,
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
          value: 'kgms',
          align: 'right'
        }
      ],
      items: [
        {
          id: 1,
          date: new Date('1/18/2019 07:28'),
          boxes: 35,
          kgms: 1200
        },
        {
          id: 2,
          date: new Date('3/02/2019 07:28'),
          boxes: 12,
          kgms: 310
        },
        {
          id: 3,
          date: new Date('3/05/2019 07:28'),
          boxes: 1,
          kgms: 50
        },
        {
          id: 4,
          date: new Date('4/02/2019 07:28'),
          boxes: 10,
          kgms: 5000
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
    editProduction (production) {
      this.editingProduction.boxes = production.boxes
      this.editingProduction.kgms = production.kgms
      this.dialogEditProduction = true
    },
    saveProduction () {
      this.dialogEditProduction = false
    },
    setupChart () {
      var newLabels = []
      this.items.forEach(function (item) {
        newLabels.push(item.date.toLocaleDateString())
      })

      var newChartProduction = {
        labels: newLabels,
        datasets: [
          {
            label: 'Cajas',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            data: [35, 12, 1, 10]
          },
          {
            label: 'KGMS',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            data: [1200, 310, 50, 5000]
          }
        ]
      }
      this.productionChart = newChartProduction
    }
  },
  mounted () {
    this.setupChart()
  }
}
</script>

<style scoped>

</style>
