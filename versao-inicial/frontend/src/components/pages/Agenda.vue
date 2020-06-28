<template>
  <div class="agenda">
    <PageTitle icon="fa fa-calendar" main="Agenda" />

    <iframe
      src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=America%2FSao_Paulo&amp;src=cGh0aXphdHRvQHVjcy5icg&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;src=cHQuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%237986CB&amp;color=%237986CB"
      style="border:solid 1px #777"
      width="800"
      height="600"
      frameborder="0"
      scrolling="no"
    ></iframe>
    <b-form>
      <input id="reminder-id" type="hidden" v-model="reminder.id" />
      <b-row>
        <b-col md="7" sm="12">
          <b-form-group label="Cliente:" label-for="customer">
            <b-form-select id="customer" :options="customers" v-model="reminder.customer" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="7" sm="12">
          <b-form-group label="Descrição:" label-for="description">
            <b-form-input
              id="description"
              type="text"
              v-model="reminder.description"
              placeholder="Descrição"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="7" sm="12">
          <b-form-group label="Data:" label-for="date">
            <b-form-datepicker
              id="date"
              v-model="reminder.reminderDate"
              class="mb-2"
              locale="pt-BR"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="7" sm="12">
          <b-form-group label="Hora:" label-for="hora">
            <b-form-timepicker
              id="hora"
              v-model="reminder.reminderHour"
              class="mb-2"
              locale="pt-BR"
              label-close-button="X"
            ></b-form-timepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button variant="primary" @click="save">Salvar</b-button>
      <b-button class="ml-2" @click="reset">Limpar</b-button>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import { mapState } from "vuex";

export default {
  name: "Agenda",
  components: { PageTitle },
  computed: mapState(["user"]),
  data: function() {
    return {
      mode: "save",
      customers: [],
      reminder: {}
    };
  },
  methods: {
    reset() {
      this.reminder = {};
    },
    save() {
      const method = "post";
      axios[method](`${baseApiUrl}/reminders`, this.reminder)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadCustomers() {
      const url = `${baseApiUrl}/customers`;
      axios.get(url).then(res => {
        this.customers = res.data.map(customer => {
          return {
            value: customer.id,
            text: `${customer.cpfCnpj} - ${customer.name}`
          };
        });
      });
    },
    onContext(ctx) {
      this.reminder.reminderDate = ctx.selectedYMD;
    }
  },
  mounted() {
    this.loadCustomers();
  }
};
</script>

<style>
</style>