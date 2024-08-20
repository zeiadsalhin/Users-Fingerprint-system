<template>
    <div>
        <h1 class="text-3xl font-semibold p-5 ">Users</h1>
        <div v-if="products">
            <v-container class="w-1/2">
                <div v-if="products" class="w-11/12 justify-center flex flex-wrap gap-4">
                    <div v-for="(p, i) in products" :key="i" class="w-fit">
                        <v-fade-transition>
                            <v-card :color="theme.global.current.value.dark ? 'surface' : 'grey-lighten-3'"
                                class="mb-5 mx-auto ml-6">
                                <v-img :src="p.img[0]" width="300" height="300" cover>
                                    <template #placeholder>
                                        <v-row class="fill-height" justify="center" align="center">
                                            <v-progress-circular width="2" size="100" color="gray"
                                                indeterminate></v-progress-circular>
                                        </v-row>
                                    </template>
                                </v-img>
                                <v-card-title class="text-md-body-1 font-weight-bold">{{
                                    p.Name
                                    }}</v-card-title>



                            </v-card>
                        </v-fade-transition>
                    </div>
                </div>
            </v-container>
        </div>
        <div v-else class="loader w-full h-full">
            <div class="p-5 flex-col justify-center mx-auto">
                <div class="flex justify-center p-5"><v-progress-circular color="dark-blue"
                        indeterminate></v-progress-circular>
                </div>
                <p class="p-2 text-center">Data not Available at the moment</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme();

</script>
<script>


export default {
    data() {
        return {
            categories: null,
            products: null,
            search: null,
            settings: null,
        };
    },
    mounted() {
        this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const supabase = useSupabaseClient()
            const user = useSupabaseUser()
            try {
                const { data, error } = await supabase.from('users').select();

                // console.log('Products:', JSON.parse(data[2].image)[0]);
                this.products = data
                // console.log((JSON.parse(this.products[2].img).replace(/[\[\]']/g, '')));
                // console.log(data[0].img[0]);

            } catch (error) {
                console.error('Error fetching Data:', error.message);
            }
        },

    }
}
</script>