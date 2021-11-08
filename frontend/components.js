Vue.component("player", {
    template: `
    <div id="players">
        <div v-for="(n, index) in players" :key="n.name">
            <div class="player-container">
                <img v-if="n.status=='DED'" :src="n.picture" style="filter:grayscale(1);">
                <img v-else :src="n.picture"> 
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            players: players
        }
    }
})

var app = new Vue().$mount('#app');