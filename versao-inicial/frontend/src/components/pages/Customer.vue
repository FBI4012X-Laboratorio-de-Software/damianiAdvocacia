<template>
  <div class="customer">
    <PageTitle icon="fa fa-users" main="Clientes" />
    <div class="admin-pages-tabs">
      <b-form>
        <input id="customer-id" type="hidden" v-model="customer.id" />
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="customer-name">
              <b-form-input
                id="customer-name"
                type="text"
                v-model="customer.name"
                placeholder="Informe o nome"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="customer-email">
              <b-form-input
                id="customer-email"
                type="text"
                v-model="customer.email"
                placeholder="Informe o e-mail "
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Telefone:" label-for="customer-telefone">
              <b-form-input
                id="customer-telefone"
                type="text"
                v-model="customer.telefone"
                placeholder="Informe o telefone"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="CPF:" label-for="customer-cpf">
              <b-form-input
                id="customer-cpf"
                type="text"
                @blur="validateCpf()"
                v-model="customer.cpfCnpj"
                placeholder="Informe o CPF (Apenas números)"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="primary" v-if="mode ==='save'" @click="save">Salvar</b-button>
        <b-button variant="danger" v-if="mode ==='remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <hr />
      <b-table hover striped :items="customers" :fields="fields">
        <template v-slot:cell(actions)="data">
          <b-button variant="warning" @click="loadCustomer(data.item)" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadCustomer(data.item,'remove')" class="mr-2">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
const { cpf } = require("cpf-cnpj-validator");
import PageTitle from "../template/PageTitle";
export default {
  name: "Customer",
  components: { PageTitle },
  data: function() {
    return {
      mode: "save",
      customer: {},
      customers: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "cpfCnpj", label: "CPF", sortable: true },
        { key: "telefone", label: "Telefone", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "actions", label: "Ações" }
      ]
    };
  },
  methods: {
    loadCustomers() {
      const url = `${baseApiUrl}/customers`;
      axios.get(url).then(res => {
        this.customers = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.customer = {};
      this.loadCustomers();
    },
    save() {
      const method = this.customer.id ? "put" : "post";
      const id = this.customer.id ? `/${this.customer.id}` : "";
      axios[method](`${baseApiUrl}/customers${id}`, this.customer)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.customer.id;
      axios
        .delete(`${baseApiUrl}/customers/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCustomer(customer, mode = "save") {
      this.mode = mode;
      this.customer = { ...customer };
    },
    validateCpf() {
      let customerCpf = this.customer.cpfCnpj;
      if (!cpf.isValid(customerCpf)) {
        this.customer.cpfCnpj = "";
        this.$toasted.global.erroCpf();
      } else {
        this.customer.cpfCnpj = cpf.format(customerCpf);
      }
    }
  },
  mounted() {
    this.loadCustomers();
  }
};
</script>

<style>
</style>