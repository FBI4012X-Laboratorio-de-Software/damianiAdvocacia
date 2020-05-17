<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block user-name">{{user.name}}</span>
      <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content">
      <router-link to="/admin">
        <i class="fa fa-cogs"></i> Administração
      </router-link>
      <a href @click.prevent="logout">
        <i class="fa fa-sign-out"></i> Sair
      </a>
    </div>
  </div>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";

export default {
  name: "UserDropdown",
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    }
  }
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  display: flex;
  align-items: center;
  color: white;
  font-weight: 100;
  height: 100%;
  padding: 0px 20px;
}

.user-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.user-name {
  padding: 10px;
}

.user-dropdown-content {
  position: absolute;
  right: 0px;
  background-color: lightgray;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  visibility: hidden;
  opacity: 0;
  transition: visibilitiy 0s, opacity 0.5s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: black;
  padding: 10px;
}

.user-dropdown-content a:hover {
  background-color: #ededed;
  text-decoration: none;
  color: black;
}
</style>