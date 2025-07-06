<script setup> 
const invitados = [
    { "familia": "Familia García", "cantidad": 3, "fechaConfirmacion": "2025-06-21" },
    { "familia": "Familia López", "cantidad": 2, "fechaConfirmacion": "2025-06-22" },
    { "familia": "Familia Ramírez", "cantidad": 5, "fechaConfirmacion": "2025-06-23" },
    { "familia": "Familia Torres", "cantidad": 1, "fechaConfirmacion": "2025-06-24" },
    { "familia": "Familia Mendoza", "cantidad": 4, "fechaConfirmacion": "2025-06-25" },
    { "familia": "Familia Cruz", "cantidad": 3, "fechaConfirmacion": "2025-06-26" },
    { "familia": "Familia Morales", "cantidad": 2, "fechaConfirmacion": "2025-06-27" },
    { "familia": "Familia Herrera", "cantidad": 3, "fechaConfirmacion": "2025-06-28" },
    { "familia": "Familia Ríos", "cantidad": 1, "fechaConfirmacion": "2025-06-29" },
    { "familia": "Familia Díaz", "cantidad": 6, "fechaConfirmacion": "2025-06-30" },
    { "familia": "Familia Castillo", "cantidad": 2, "fechaConfirmacion": "2025-07-01" },
    { "familia": "Familia Salinas", "cantidad": 4, "fechaConfirmacion": "2025-07-02" },
    { "familia": "Familia Navarro", "cantidad": 2, "fechaConfirmacion": "2025-07-03" },
    { "familia": "Familia Vargas", "cantidad": 3, "fechaConfirmacion": "2025-07-04" },
    { "familia": "Familia Camacho", "cantidad": 1, "fechaConfirmacion": "2025-07-05" },
    { "familia": "Familia Domínguez", "cantidad": 5, "fechaConfirmacion": "2025-07-06" },
    { "familia": "Familia Soto", "cantidad": 2, "fechaConfirmacion": "2025-07-07" },
    { "familia": "Familia Peña", "cantidad": 3, "fechaConfirmacion": "2025-07-08" },
    { "familia": "Familia Serrano", "cantidad": 4, "fechaConfirmacion": "2025-07-09" },
    { "familia": "Familia Aguilar", "cantidad": 2, "fechaConfirmacion": "2025-07-10" },
    { "familia": "Familia Paredes", "cantidad": 3, "fechaConfirmacion": "2025-07-11" },
    { "familia": "Familia Sandoval", "cantidad": 2, "fechaConfirmacion": "2025-07-12" },
    { "familia": "Familia Silva", "cantidad": 5, "fechaConfirmacion": "2025-07-13" },
    { "familia": "Familia Castañeda", "cantidad": 1, "fechaConfirmacion": "2025-07-14" },
    { "familia": "Familia Rangel", "cantidad": 4, "fechaConfirmacion": "2025-07-15" },
    { "familia": "Familia Treviño", "cantidad": 3, "fechaConfirmacion": "2025-07-16" },
    { "familia": "Familia Estrada", "cantidad": 2, "fechaConfirmacion": "2025-07-17" },
    { "familia": "Familia Alanís", "cantidad": 4, "fechaConfirmacion": "2025-07-18" },
    { "familia": "Familia Beltrán", "cantidad": 2, "fechaConfirmacion": "2025-07-19" },
    { "familia": "Familia Leal", "cantidad": 3, "fechaConfirmacion": "2025-07-20" },
    { "familia": "Familia Orozco", "cantidad": 1, "fechaConfirmacion": "2025-07-21" },
    { "familia": "Familia Luna", "cantidad": 5, "fechaConfirmacion": "2025-07-22" },
    { "familia": "Familia Acosta", "cantidad": 3, "fechaConfirmacion": "2025-07-23" },
    { "familia": "Familia Salazar", "cantidad": 2, "fechaConfirmacion": "2025-07-24" },
    { "familia": "Familia Mejía", "cantidad": 4, "fechaConfirmacion": "2025-07-25" },
    { "familia": "Familia Molina", "cantidad": 3, "fechaConfirmacion": "2025-07-26" },
    { "familia": "Familia Robles", "cantidad": 2, "fechaConfirmacion": "2025-07-27" },
    { "familia": "Familia Del Río", "cantidad": 3, "fechaConfirmacion": "2025-07-28" },
    { "familia": "Familia Vázquez", "cantidad": 5, "fechaConfirmacion": "2025-07-29" },
    { "familia": "Familia Rosales", "cantidad": 1, "fechaConfirmacion": "2025-07-30" },
    { "familia": "Familia Solís", "cantidad": 4, "fechaConfirmacion": "2025-07-31" }
]


</script>

<template>
 
    <h1>Mi evento</h1>
    <div class="PanelPrincipal">
        <h2>Invitados confirmados</h2>

        <div class="tarjeta tarjetaHeader">
            <div class="datos familia">
                <span>Invitiados</span>
            </div>
            <div class="datos">
                <span>Cantidad</span>
            </div>
            <div class="datos fecha">
                <span>Fecha de confirmación</span>
            </div>
        </div>

        <div class="tarjeta" v-for="(invitado, index) in invitados" :key="index">
            <div class="datos familia">
                <span>{{ invitado.familia }}</span>
            </div>
            <div class="datos cantidad">
                <span>{{
                    invitado.cantidad }}</span>
            </div>
            <div class="datos fecha">
                <span>{{ invitado.fechaConfirmacion }}</span>
            </div>
        </div>

        <!--   <table>
            <thead>
                <tr>
                    <th class="">Familia</th>
                    <th class="">Cantidad</th>
                    <th class="">Fecha de Confirmación</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(invitado, index) in invitados" :key="index" class="hover:bg-gray-50">
                    <td class="px-6 py-4">{{ invitado.familia }}</td>
                    <td class="px-6 py-4">{{ invitado.cantidad }}</td>
                    <td class="px-6 py-4">{{ invitado.fechaConfirmacion }}</td>
                </tr>
            </tbody>
        </table> -->
    </div>

</template>

<style scoped>
.PanelPrincipal {
    min-height: 85vh;
    max-height: 80vh;
    overflow-y: auto;
    width: 50%;
    background-color: #fbfbfe;
    color: #15163D;
    margin: 30px auto;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}

h1,
h2 {
    text-align: center;
    color: #15163D;
}

.tarjeta {
    width: 80%;
    background-color: #fbfbfe;
    color: #15163D;
    margin: 5px auto;
    border-radius: 16px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;


}

.tarjetaHeader{
background-color: var(--BgBlue);
color: #fbfbfe;
}

.datos {
    padding: 10px 0;
    flex: 1;
    font-weight: bold;
    font-size: 1.2rem;
}

.familia {
    text-align: start;
    padding-left: 10%;
    border-radius: 16px;

}

.tarjeta:not(.tarjetaHeader) div:nth-child(2) span  {
    background-color: #e6c50a;
    padding: 6px;
    border-radius: 8px;
    margin: 8px 0;
}

.tarjeta:last-child {
    margin-bottom: 20px; 
}


</style>