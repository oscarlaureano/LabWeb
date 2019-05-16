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
                    <span class="title font-weight-light card-title">Sensores</span>
                    <br>
                    <span class="font-weight-thin card-subtitle">Datos de sensores</span>
                  </v-flex>

                  <v-flex class="text-xs-right">
                    <v-btn @click="dialogChangeArea = true" color="white" small fab outline>
                      <v-icon>arrow_drop_down</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>

            <v-card-text>
              <v-layout v-if="displayArea === 1">
                <v-flex sm12>
                  <h3 class="headline">Area 1</h3>
                  <br>
                  <chart-line
                    :chart-data="sensorsChart"
                    :options="chartOptions"
                    class="Chart"
                  ></chart-line>
                </v-flex>
              </v-layout>

              <v-layout v-if="displayArea === 2">
                <v-flex sm12>
                  <h3 class="headline">Area 2</h3>
                  <br>
                  <chart-line
                    :chart-data="sensorsChart2"
                    :options="chartOptions"
                    class="Chart"
                  ></chart-line>
                </v-flex>
              </v-layout>

              <v-layout v-if="displayArea === 3">
                <v-flex sm12>
                  <h3 class="headline">Area 3</h3>
                  <br>
                  <chart-line
                    :chart-data="sensorsChart3"
                    :options="chartOptions"
                    class="Chart"
                  ></chart-line>
                </v-flex>
              </v-layout>

              <v-layout v-if="displayArea === 4">
                <v-flex sm12>
                  <h3 class="headline">Area 4</h3>
                  <br>
                  <chart-line
                    :chart-data="sensorsChart4"
                    :options="chartOptions"
                    class="Chart"
                  ></chart-line>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialogChangeArea" max-width="290" persistent>
      <v-card>
        <v-card-title class="headline">Cambiar Area</v-card-title>
        <v-card-text>
          Selecciona el area a visualizar
          <v-layout>
            <v-flex xs6 px-2>
              <v-select v-model="dialogArea" :items="availableAreas"></v-select>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="red" @click="dialogChangeArea = false">Cancelar</v-btn>
          <v-btn dark color="green" @click="changeArea(dialogArea)">Aceptar</v-btn>
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
      dialogChangeArea: false,
      dialogArea: 1,
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
              return tooltipItems.yLabel
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        height: 200
      },
      sensorsChart: {},
      sensorsChart2: {},
      sensorsChart3: {},
      sensorsChart4: {},
      displayArea: 1,
      availableAreas: [1, 2, 3, 4]
    }
  },
  methods: {
    setupChart () {
      var newChartSensors1 = {
        labels: [moment().subtract(10, 'd').format('DD-MM-YYYY'), moment().subtract(9, 'd').format('DD-MM-YYYY'), moment().subtract(8, 'd').format('DD-MM-YYYY'), moment().subtract(7, 'd').format('DD-MM-YYYY'), moment().subtract(6, 'd').format('DD-MM-YYYY'), moment().subtract(5, 'd').format('DD-MM-YYYY'), moment().subtract(4, 'd').format('DD-MM-YYYY'), moment().subtract(3, 'd').format('DD-MM-YYYY'), moment().subtract(2, 'd').format('DD-MM-YYYY'), moment().subtract(1, 'd').format('DD-MM-YYYY')],
        datasets: [
          {
            label: 'Calidad tierra',
            borderColor: 'brown',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'brown',
            backgroundColor: 'brown',
            data: [98, 97, 98, 99, 100, 100, 100, 100, 99, 100]
          },
          {
            label: 'Temperatura',
            borderColor: 'red',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'red',
            backgroundColor: 'red',
            data: [25, 26, 26, 27, 26, 26, 26, 27, 26, 25]
          },
          {
            label: 'Humedad',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [13, 18, 3, 5, 9, 20, 25, 30, 30, 30]
          },
          {
            label: 'Cultivo',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [57, 60, 40, 99, 98, 98, 100, 100, 99, 100]
          }
        ]
      }

      var newChartSensors2 = {
        labels: [moment().subtract(10, 'd').format('DD-MM-YYYY'), moment().subtract(9, 'd').format('DD-MM-YYYY'), moment().subtract(8, 'd').format('DD-MM-YYYY'), moment().subtract(7, 'd').format('DD-MM-YYYY'), moment().subtract(6, 'd').format('DD-MM-YYYY'), moment().subtract(5, 'd').format('DD-MM-YYYY'), moment().subtract(4, 'd').format('DD-MM-YYYY'), moment().subtract(3, 'd').format('DD-MM-YYYY'), moment().subtract(2, 'd').format('DD-MM-YYYY'), moment().subtract(1, 'd').format('DD-MM-YYYY')],
        datasets: [
          {
            label: 'Calidad tierra',
            borderColor: 'brown',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'brown',
            backgroundColor: 'brown',
            data: [95, 93, 80, 70, 76, 88, 92, 100, 99, 100]
          },
          {
            label: 'Temperatura',
            borderColor: 'red',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'red',
            backgroundColor: 'red',
            data: [25, 26, 26, 27, 26, 26, 26, 27, 26, 25]
          },
          {
            label: 'Humedad',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [5, 1, 3, 7, 2, 10, 15, 20, 22, 22]
          },
          {
            label: 'Cultivo',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [55, 63, 44, 97, 95, 96, 89, 100, 95, 90]
          }
        ]
      }

      var newChartSensors3 = {
        labels: [moment().subtract(10, 'd').format('DD-MM-YYYY'), moment().subtract(9, 'd').format('DD-MM-YYYY'), moment().subtract(8, 'd').format('DD-MM-YYYY'), moment().subtract(7, 'd').format('DD-MM-YYYY'), moment().subtract(6, 'd').format('DD-MM-YYYY'), moment().subtract(5, 'd').format('DD-MM-YYYY'), moment().subtract(4, 'd').format('DD-MM-YYYY'), moment().subtract(3, 'd').format('DD-MM-YYYY'), moment().subtract(2, 'd').format('DD-MM-YYYY'), moment().subtract(1, 'd').format('DD-MM-YYYY')],
        datasets: [
          {
            label: 'Calidad tierra',
            borderColor: 'brown',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'brown',
            backgroundColor: 'brown',
            data: [50, 60, 70, 80, 90, 100, 100, 100, 100, 100]
          },
          {
            label: 'Temperatura',
            borderColor: 'red',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'red',
            backgroundColor: 'red',
            data: [20, 20, 23, 24, 23, 23, 23, 23, 26, 25]
          },
          {
            label: 'Humedad',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
          },
          {
            label: 'Cultivo',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [100, 100, 100, 95, 100, 95, 94, 100, 100, 100]
          }
        ]
      }

      var newChartSensors4 = {
        labels: [moment().subtract(10, 'd').format('DD-MM-YYYY'), moment().subtract(9, 'd').format('DD-MM-YYYY'), moment().subtract(8, 'd').format('DD-MM-YYYY'), moment().subtract(7, 'd').format('DD-MM-YYYY'), moment().subtract(6, 'd').format('DD-MM-YYYY'), moment().subtract(5, 'd').format('DD-MM-YYYY'), moment().subtract(4, 'd').format('DD-MM-YYYY'), moment().subtract(3, 'd').format('DD-MM-YYYY'), moment().subtract(2, 'd').format('DD-MM-YYYY'), moment().subtract(1, 'd').format('DD-MM-YYYY')],
        datasets: [
          {
            label: 'Calidad tierra',
            borderColor: 'brown',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'brown',
            backgroundColor: 'brown',
            data: [98, 97, 98, 99, 100, 100, 100, 100, 99, 100]
          },
          {
            label: 'Temperatura',
            borderColor: 'red',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'red',
            backgroundColor: 'red',
            data: [25, 26, 26, 27, 26, 26, 26, 27, 26, 25]
          },
          {
            label: 'Humedad',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [13, 18, 3, 5, 9, 20, 25, 30, 30, 30]
          },
          {
            label: 'Cultivo',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [57, 60, 40, 99, 98, 98, 100, 100, 99, 100]
          }
        ]
      }

      this.sensorsChart = newChartSensors1
      this.sensorsChart2 = newChartSensors2
      this.sensorsChart3 = newChartSensors3
      this.sensorsChart4 = newChartSensors4
    },
    changeArea (areaNum) {
      this.displayArea = areaNum
      this.dialogChangeArea = false
    }
  },
  mounted () {
    this.setupChart()
  }
}
</script>

<style>

</style>
