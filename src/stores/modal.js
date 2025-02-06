import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";

export const useModalStore = defineStore('modal', () => {

    const favoritos = useFavoritosStore()
    const bebidas = useBebidasStore()
    const modal = ref(false)

    function handleClickModal() {
        modal.value = !modal.value
    }

    const textoboton = computed(()=>{
        return favoritos.existeFavorito(bebidas.receta.idDrink) ? 'Eliminar de favoritos' : 'Agregar a Favoritos'
    })

    return{
        modal,
        handleClickModal,
        textoboton
    }
})