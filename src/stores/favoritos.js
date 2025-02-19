import { ref, watch, onMounted,computed} from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificaciones";

export const useFavoritosStore = defineStore('favoritos', () => {

    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()
    const favoritos = ref([])

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, () => {
        sincronizarLocalStorage()
    },{
        deep: true
    })

    const sincronizarLocalStorage = () => {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function existeFavorito(id){
        const FavoritosLocalStore = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return FavoritosLocalStore.some(favorito => favorito.idDrink === id)
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink
        )
    }

    function AgregarFavorito() {
        favoritos.value.push(bebidas.receta)

        notificaciones.mostrar = true
        notificaciones.texto = 'se aagrego a favoritos'

        setTimeout(()=>{
            notificaciones.$reset()
        },3000);
    }
    
    const handleClickFavorito = () => {
        if(existeFavorito(bebidas.receta.idDrink)){
            eliminarFavorito()
            
        }else{
            AgregarFavorito()  
        }
        modal.modal = false
    }

    const noFavoritos = computed(() => favoritos.value.length === 0)
    
    return{
        favoritos,
        handleClickFavorito,
        existeFavorito,
        noFavoritos
    }
})