<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Resumo do dia" />
    <ul></ul>
    <div class="mt-3">
      <b-card-group deck>
        <b-card
          bg-variant="light"
          header="Lembrete"
          style="max-width: 22rem;"
          class="text-center"
          v-for="reminder in reminders"
          :key="reminder.id"
        >
          <b-card-text>{{reminder.text}}</b-card-text>
          <b-card-text v:if="reminder.telefone != null">{{reminder.telefone}}</b-card-text>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "Home",
  components: { PageTitle },
  data: function() {
    return {
      reminders: []
    };
  },
  methods: {
    loadReminders() {
      const url = `${baseApiUrl}/reminders`;
      axios.get(url).then(res => {
        this.reminders = res.data;
      });
    }
  },
  mounted() {
    this.loadReminders();
  }
};
</script>

<style></style>