import api from "@/lib/axios";

export default {
    obtenerCategorias(){
        return api.get('/list.php?c=list')
    },

    buscarRecetas(busqueda){
        return api.get(`/filter.php?c=${busqueda.categoria}&i=${busqueda.nombre}`)
    },

    buscarReceta(id){
        return api.get(`lookup.php?i=${id}`)
    }
}