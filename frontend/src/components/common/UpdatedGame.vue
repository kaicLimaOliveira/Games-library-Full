<template>
  <form>
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel2"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Adicione um jogo novo
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div action="">
              <label class="form-label">Título:</label>
              <input
                class="form-control"
                type="text"
                placeholder="Nome do Game"
                v-model.trim="store.games.title"
              />

              <label class="form-label mt-3">Genêro:</label>
              <input
                class="form-control"
                type="text"
                placeholder="Genêro do Game"
                v-model.trim="store.games.genre"
              />

              <label class="form-label mt-3">Jogou?</label>
              <input
                class="form-check-input"
                type="checkbox"
                v-model="store.games.played"
                id="flexCheckDefault"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-info"
              data-bs-dismiss="modal"
              @click="updateGame()"
            >
              Atualizar
            </button>

            <button
              type="button"
              class="btn btn-outline-danger"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { axiosCreate } from "../../services/axios";
import { sweetAlertMixin } from "../../plugins/sweetAlert";
import { reactive } from "vue";
import { GameStore } from "../../store/GameStore";

const store = GameStore();
const state = reactive({
  games: store.games,
});

async function updateGame() {
  await axiosCreate
    .post("updated_game", {
      id: store.games._id,
      title: store.games.title,
      genre: store.games.genre,
      played: store.games.played,
    })
    .catch((e) => console.log(e));

  sweetAlertMixin({ icon: "success", title: "Jogo atualizado com sucesso!" });
}
</script>

<style>
[type="checkbox"]:before {
  top: 1em;
  left: 2.5em;
}

[type="checkbox"]:checked:after {
  top: 0.7em;
  left: 1.8em;
}
</style>