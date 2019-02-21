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
                          <v-btn @click="dialogDelete=true" fab small color="red">
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
export default {
  components: {
  },
  data () {
    return {
      dialogDelete: false,
      dialogNewExpense: false,
      dialogEditExpense: false,
      expand: false,
      editingExpense: {},
      newExpense: {},
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
      items: [
        {
          id: 1,
          type: 'Servicios',
          cost: 7500.00,
          date: '01/01/2019'
        },
        {
          id: 2,
          type: 'Compra Materiales',
          cost: 65355.56,
          date: '15/01/2019'
        },
        {
          id: 3,
          type: 'Compra Materiales',
          cost: 1200.00,
          date: '17/01/2019'
        }
      ]
    }
  },
  methods: {
    editExpense (expense) {
      this.editingExpense.type = expense.type
      this.editingExpense.cost = expense.cost
      this.editingExpense.date = expense.date
      this.dialogEditExpense = true
    },
    saveExpense () {
      this.dialogEditExpense = false
      // update expense with id in db
    },
    createExpense () {
      this.dialogNewExpense = true
    },
    postNewExpense () {
      this.dialogNewExpense = false
      // post Expense to db
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
