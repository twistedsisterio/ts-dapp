<template>
    <div id="app">
        <div class="container-fluid header">
            <div class="row ">
                <div class="col-12 col-md-6 mt-3 text-center text-md-left">
                    <router-link to="/" exact>
                        <img src="./assets/TwistedSister_Logo.svg" class="PageLogo" alt=""/>
                    </router-link>&nbsp;
                </div>
                <div class="col-12 col-md-6 mt-3 text-center text-md-right">
                    <div id="nav" class="d-block ml-auto text-medium">
                        <router-link to="/genesis-auction" exact>Genesis Auction</router-link>&nbsp;
                        <router-link to="/marketplace" exact>Marketplace</router-link>&nbsp;
                        <router-link to="/faq">FAQ</router-link>
                        <router-link to="/about">About</router-link>
                        <a v-if="!account" href="#" @click.prevent="connect">Connect Wallet</a>
                    </div>
                </div>
            </div>
        </div>
        <router-view/>
        <div class="footer container-fluid">
            <div class="row py-3 small">
				<span class="col-12 col-md-4 text-center text-md-left">
				<a href="https://twistedsister.io" target="_blank" class="footer-link">twistedsister.io</a>
				</span>

                <span class="col-12 col-md-8 text-center text-md-right">

				            <span class="footer-link d-block d-md-inline"><router-link
                                    to="/disclaimer">Disclaimer</router-link></span>

                    <span class="footer-link d-block d-md-inline">dApp by: <a href="https://blockrocket.tech"
                                                                              target="_blank">BlockRocket</a>, 2019</span>

                    <span class="footer-link d-block d-md-inline">Ethereum Network: {{currentNetwork}}</span>
                 </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {mapGetters} from 'vuex';
    import {Component, Vue} from 'vue-property-decorator';
    import {ethers} from "ethers";

    @Component({
        computed: {
            ...mapGetters(['networkName', 'account'])
        }
    })
    export default class App extends Vue {
        networkName!: string;
        account!: string;

        // On load, only pick up an already-authorised account (no MetaMask popup)
        created() {
            this.initWeb3('eth_accounts');
        }

        // Ask for wallet access only when the user clicks "Connect Wallet"
        connect() {
            // @ts-ignore
            if (!window.ethereum) {
                window.open('https://metamask.io/', '_blank');
                return;
            }
            this.initWeb3('eth_requestAccounts');
        }

        async initWeb3(method: string) {
            // @ts-ignore
            const ethereum = window.ethereum;
            if (!ethereum) return;
            try {
                const accounts = await ethereum.request({ method });
                const provider: any = new ethers.providers.Web3Provider(ethereum);
                // Without an account, use the provider so read-only calls still work
                const signer = accounts.length ? provider.getSigner() : provider;
                const {chainId} = await provider.getNetwork();
                await this.$store.dispatch('bootstrapWeb3', {provider, signer, chainId});
            } catch (e) {
                console.warn('Wallet connection failed or was rejected', e);
            }
        }

        get currentNetwork() {
            return this.networkName.toUpperCase();
        }
    }
</script>

<style lang="scss">
    @import './styles/_index.scss';

    .header {
        margin-bottom: 5rem;
    }

    #nav {
        line-height: .8;

        a {
            margin-left: 1rem;
            margin-right: 1rem;
        }

        a.router-link-active {
            color: #000;
        }
    }

    .PageLogo {
        max-width: 100%;
        width: 400px;
    }

    .footer {
        border-top: 1px solid black;
        margin-top: 4rem;
    }

    .footer-link {
        margin-left: 1em;
        margin-right: 1em;
    }

</style>
