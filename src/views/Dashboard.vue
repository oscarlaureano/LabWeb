<template>
  <div>
    <v-container fluid>
      <v-layout wrap>
        <v-flex xs3 pr-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-dollar-sign fa-3x" style="color: #7ac29a;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Total Ventas
                  <p class="numbers">$11,959.00</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs3 px-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-coins fa-3x" style="color: #68b3c8;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Cajas Vendidas
                  <p class="numbers">126</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs3 px-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-arrow-down fa-3x" style="color: #eb5e28;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Total Costos
                  <p class="numbers">$4,201.61</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs3 pl-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-wallet fa-3x" style="color: #f3bb45;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Margen Bruto 0%
                  <p class="numbers">$7547.86</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <br>

      <v-layout>
        <v-flex md12 pr-2>
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
      </v-layout>

      <br>

      <v-layout>
        <v-flex xs4 pr-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-shopping-cart fa-3x" style="color: #83c868;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Venta promedio
                  <p class="numbers">$290.87</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4 px-2>
          <v-card class="roundCard">
            <v-card-text>
              <v-layout>
                <v-flex xs5 class="text-xs-center vaMiddle">
                  <i class="fas fa-user fa-3x" style="color: #7d68c8;"></i>
                </v-flex>

                <v-flex xs7 class="text-xs-right">
                  Cajas promedio por cliente
                  <p class="numbers">4</p>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex xs4 px-2>
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
var moment = require('moment')
export default {
  components: {
    ChartLine
  },
  data () {
    return {
      lineChartDummy1: {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        datasets: [
          {
            label: moment().startOf('isoweek').locale('es').format('DD/MM/YY') + ' - ' + moment().endOf('isoweek').locale('es').format('DD/MM/YY'),
            borderColor: '#1737a7',
            borderWidth: 1,
            pointBorderColor: '#1737a7',
            backgroundColor: '#7ac29a',
            data: [1580, 902, 1240, 2150, 1954, 2232, 2001]
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
      }
    }
  },
  methods: {
  },
  mounted () {
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
