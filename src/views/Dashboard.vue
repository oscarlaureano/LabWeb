<template>
  <div>
    <v-container fluid>
      <v-layout wrap>
        <v-flex md3 xs12 pr-2 pb-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-dollar-sign fa-3x" style="color: #7ac29a;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Total Ventas
                  <p class="numbers">${{ totalSales }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md3 xs12 px-2 pb-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-coins fa-3x" style="color: #68b3c8;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Cajas Vendidas
                  <p class="numbers">{{ totalBoxes }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md3 xs12 px-2 pb-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-arrow-down fa-3x" style="color: #eb5e28;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Total Costos
                  <p class="numbers">${{ totalCosts }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md3 xs12 pl-2  pb-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-wallet fa-3x" style="color: #f3bb45;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Margen Bruto 0%
                  <p class="numbers">${{ totalEarned }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <br>

      <v-layout row wrap>
        <v-flex md7 xs12 pr-2 pb-1>
          <v-card class="roundCard">
            <v-card-text>
              <chart-line
                :chart-data="lineChartDummy1"
                :options="chartOptionsDummy"
                class="Chart"
              ></chart-line>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md5 xs12>
          <v-card class="roundCard">
            <v-card-text>
              <chart-bar
                :chart-data="stockChart"
                :options="chartOptionsBar"
                class="Chart"
              ></chart-bar>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <br>

      <v-layout row wrap>
        <v-flex md4 xs12 pr-2 pb-1>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-shopping-cart fa-3x" style="color: #83c868;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Venta promedio
                  <p class="numbers">${{ averageSale }}</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md4 xs12 px-2 pb-1>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-wifi fa-3x" style="color: #7d68c8;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  # de sensores
                  <p class="numbers">4</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md4 xs12 px-2 pb-1>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-users fa-3x" style="color: #7d68c8;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  # de Clientes
                  <p class="numbers">26</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import ChartLine from '../components/ChartLine'
import ChartBar from '../components/ChartBar'
// var moment = require('moment')
export default {
  components: {
    ChartLine,
    ChartBar
  },
  data () {
    return {
      totalSales: null,
      totalBoxes: null,
      totalCosts: null,
      totalEarned: null,
      averageSale: null,
      stockChart: {},
      lineChartDummy1: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        datasets: [
          {
            label: 'Meta',
            borderColor: 'blue',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'blue',
            backgroundColor: 'blue',
            data: [100, 100, 100, 105, 105, 105]
          },
          {
            label: 'Total produccion',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [100, 100, 112, 90, 105, 105, 105]
          },
          {
            label: 'Perdidas',
            borderColor: 'red',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'red',
            backgroundColor: 'red',
            data: [0, 3, 0, 22, 1, 0, 0]
          }
        ]
      },
      chartOptionsDummy: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              return data.labels[tooltipItem.index].split(':')[0] + ': $' + data.datasets[0].data[tooltipItem.index]
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
      },
      chartOptionsBar: {
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
      }
    }
  },
  methods: {
    setupCharts () {
      var newStockChart = {
        labels: ['lts pesticida', 'kg semilla', 'kg abono', 'kg tomate', 'kg pimiento', 'kg calabaza'],
        datasets: [
          {
            label: 'Inventario',
            borderColor: 'green',
            borderWidth: 2,
            radius: 3,
            fill: false,
            pointBorderColor: 'green',
            backgroundColor: 'green',
            data: [1500, 200, 4850, 2500, 1350, 2100]
          }
        ]
      }
      this.stockChart = newStockChart
    },
    getSales () {
      var vm = this
      this.totalSales = 0
      this.totalBoxes = 0
      this.$http.get('sales').then(response => {
        console.log(response.data)
        response.data.forEach(function (sale) {
          vm.totalSales += sale.total
          vm.totalBoxes += sale.boxes
        })
        vm.averageSale = vm.totalSales / response.data.length
      }, response => {
        console.log('err', response.data)
      })
    },
    getExpenses () {
      var vm = this
      this.totalCosts = 0
      this.$http.get('expenses').then(response => {
        console.log(response.data)
        response.data.forEach(function (expense) {
          vm.totalCosts += expense.cost
        })
        vm.totalEarned = vm.totalSales - vm.totalCosts
      }, response => {
        console.log('err', response.data)
      })
    }
  },
  mounted () {
    this.setupCharts()
    this.getSales()
    this.getExpenses()
  }
}
</script>

<style scoped>
.numbers {
  font-size: 2em;
  margin-bottom: 0px;
}
.vaMiddle {
  margin: auto;
}
.roundCard {
  border-radius: 7px;
}
</style>
