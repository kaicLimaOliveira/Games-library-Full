<template>
  <form>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
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
                v-model.trim="addGameForm.title"
              />

              <label class="form-label mt-3">Genêro:</label>
              <input
                class="form-control"
                type="text"
                placeholder="Genêro do Game"
                v-model.trim="addGameForm.genre"
              />

              <label class="form-label mt-3">Jogou?</label>
              <input
                class="form-check-input"
                type="checkbox"
                v-model="addGameForm.played"
                id="flexCheckDefault"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-info"
              data-bs-dismiss="modal"
              @click="createGame()"
            >
              Enviar
            </button>
            <button
              type="reset"
              class="btn btn-outline-danger"
              @click="resetForm()"
            >
              Limpar
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
// import { IGameSettings } from "@/interfaces/IGameInterface";
import { axiosCreate } from "../../services/axios";
import { sweetAlertMixin, sweetAlertAnimated } from "../../plugins/sweetAlert";
import { useRouter } from "vue-router";

const router = useRouter();
const addGameForm = {
  title: "",
  genre: "",
  played: false,
};

function resetForm() {
  addGameForm.title = "";
  addGameForm.genre = "";
  addGameForm.played = false;
}

function canSend(): boolean {
  let validate = true;

  if (!addGameForm.title) validate = false;
  if (!addGameForm.genre) validate = false;

  return validate;
}

async function createGame() {
  if (canSend()) {
    const response = await axiosCreate
      .post("games", {
        title: addGameForm.title,
        genre: addGameForm.genre,
        played: addGameForm.played,
      })
      .catch((e) => console.log(e));

    const res = await response;

    resetForm();

    setTimeout(() => {
      router.go(0);
    }, 3500);

    sweetAlertMixin({ icon: "success", title: "Jogo incluído com sucesso!" });
  } else {
    sweetAlertAnimated({
      icon: "warning",
      title: "Os campos não estão preenchidos!",
    });
  }
}
</script>

<style scoped>
[type="checkbox"]:before {
  top: 1em;
  left: 2.5em;
}

[type="checkbox"]:checked:after {
  top: 0.7em;
  left: 1.8em;
}
</style>
