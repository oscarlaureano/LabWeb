<template>
  <div>
    <v-container fluid>
      <v-layout justify-center wrap>
        <v-flex md12>
          <v-card full-width>
            <v-card class="floating-card">
              <v-card-text class="">
                <v-flex class="text-xs-left">
                  <span class="title font-weight-light card-title">Sensores</span>
                  <br>
                  <span class="font-weight-thin card-subtitle">Datos de sensores</span>
                </v-flex>
              </v-card-text>
            </v-card>

            <v-card-text>
              <chart-line
                :chart-data="sensorsChart"
                :options="chartOptions"
                class="Chart"
              ></chart-line>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      sensorsChart: {}
    }
  },
  methods: {
    setupChart () {
      var newChartSensors = {
        labels: ['01/01/2019', '02/01/2019', '03/01/2019', '04/01/2019', '05/01/2019', '06/01/2019', '07/01/2019', '08/01/2019', '09/01/2019', '10/01/2019'],
        datasets: [
          {
            label: 'Calidad tierra',
            borderColor: 'brown',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'brown',
            data: [98, 97, 98, 99, 100, 100, 100, 100, 99, 100]
          },
          {
            label: 'Temperatura',
            borderColor: 'red',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'red',
            data: [25, 26, 26, 27, 26, 26, 26, 27, 26, 25]
          },
          {
            label: 'Humedad',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            data: [13, 18, 3, 5, 9, 20, 25, 30, 30, 30]
          },
          {
            label: 'Cultivo',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            data: [57, 60, 40, 99, 98, 98, 100, 100, 99, 100]
          }
        ]
      }
      this.sensorsChart = newChartSensors
    }
  },
  mounted () {
    this.setupChart()
  }
}
</script>

<style>

</style>
