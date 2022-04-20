<template>
  <div class="jumbotron vertical-center">
    <div class="container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css"
        integrity="sha384-RxqHG2ilm4r6aFRpGmBbGTjsqwfqHOKy1ArsMhHusnRO47jcGqpIQqlQK/kmGy9R"
        crossorigin="anonymous"
      />
      <div class="row">
        <div class="col-sm-12">
          <h1 class="text-center bg-primary text-white title-head">
            Games Library 🕹️
          </h1>
          <hr />
          <br />

          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span v-if="state.games.length == 0">Novo Jogo</span>
            <span v-else>Novo Jogo+</span>
          </button>

          <br />
          <br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Titulo</th>
                <th scope="col">Genêro</th>
                <th scope="col">Jogou?</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(game, index) in state.games" :key="index">
                <td>{{ game.title }}</td>
                <td>{{ game.genre }}</td>
                <td>
                  <span v-if="game.played">Sim</span>
                  <span v-else>Não</span>
                </td>
                <td>
                  <div class="btn-group" role="group">
                    <button
                      class="btn btn-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      @click="editGame(game)"
                    >
                      Atualizar
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="deleteGame(game)"
                    >
                      Deletar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <footer class="bg-primary text-white text-center footer-text">
            Copyright &copy;. All rights reserved 2022.
          </footer>
        </div>
      </div>

      <!-- Modal -->
      <AddedGame />
      <UpdatedGame />
      <!-- Modal -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddedGame from "../common/AddedGame.vue";
import UpdatedGame from "../common/UpdatedGame.vue";

import { GameStore } from "../../store/GameStore";
import { axiosCreate } from "../../services/axios";
import { sweetAlertMixin } from "../../plugins/sweetAlert";
import { IGameEditSettings } from "../../interfaces/IGame";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";

const store = GameStore();
const router = useRouter();
const state = reactive({
  games: [],
});

async function getGames() {
  try {
    const response: AxiosResponse<any, any> = await axiosCreate
      .get("games")
      .catch((e) => console.log(e));

    state.games = await response.data;
  } catch (e) {
    console.log(e);
  }
}

getGames();

function editGame(game) {
  store.getGames(game);
}

async function deleteGame(game: IGameEditSettings) {
  try {
    await axiosCreate
      .post("delete_game", {
        id: game["_id"],
      })
      .catch((e) => console.log(e));

    sweetAlertMixin({
      icon: "success",
      title: "Jogo excluído com sucesso!",
    });

    setTimeout(() => {
      router.go(0);
    }, 3500);
  } catch (e) {
    console.log(e);
  }
}
</script>

<style>
[type="checkbox"]:before {
  top: 1em !important;
  left: 2.5em !important;
}

[type="checkbox"]:checked:after {
  top: 0.7em !important;
  left: 1.8em !important;
}
</style>