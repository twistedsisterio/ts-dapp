<template>
    <div>
        <div v-if="account">
            <div class="Market-Header container mb-4">
                <div class="row">
                    <span class="round-counter col-12 col-md-6 h1 mb-0">
                        Marketplace
                    </span>
                    <span class="col-12 col-md-6 text-md-right">
                        <router-link to="/download" exact>View and Download 3D Model</router-link>&nbsp;
                    </span>
                </div>
            </div>
            <div class="Market container">
                <div class="row mt-4 mb-6">
                    <Token :key="idx" :tokenId="tokenId" v-for="(tokenId, idx) in tokenIds"/>
                </div>
            </div>
        </div>
        <div v-else class="container text-center text-danger text-large">
            Please connect your wallet (e.g. <a href="https://metamask.io/">MetaMask</a>) using the "Connect Wallet" button above.
        </div>
    </div>
</template>

<script>
    import Token from "@/components/marketplace/Token";
    import {mapGetters} from "vuex";

    export default {
        name: "Marketplace",
        components: {Token},
        computed: {
            ...mapGetters(['account'])
        },
        data() {
            return {
                tokenIds: [
                    ...Array(21).keys()
                ].map(id => id + 1)
            };
        }
    };
</script>

<style scoped>
    .Market{
        border-top: 1px solid #DDD;
    }

</style>
