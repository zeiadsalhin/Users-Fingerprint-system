<script setup>
// useSeoMeta({
//     title: 'Economic Youth - Join',
//     ogTitle: 'Economic Youth - Join',
//     description: 'Welcome to most progressive Online Economic courses in the Egyptian Market, providing you with simplicity and latest content supporting younger Generations',
//     ogDescription: 'Welcome to most progressive Online Economic courses in the Egyptian Market, providing you with simplicity and latest content supporting younger Generations',
//     ogImage: 'https://yasserc.netlify.app/mainiconmeta.webp',
//     twitterCard: 'summary_large_image',
// })

import { useTheme } from 'vuetify'
const theme = useTheme();

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const errMsg = ref()
const displayname = ref('')
const fingerprint = ref('NO_DATA')
const image = ref();
const monitor = ref('')
const dataview = ref(true)
const authenticating = ref(false)
const { locale, setLocale } = useI18n()
const currentLocale = computed(() => locale.value)

// image handling
const handleImageUpload = async (event) => {
    const files = event.target.files;
    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
        uploadedFiles.push(files[i]);
    }

    image.value = uploadedFiles;
};
// Function to open image input
const openFileInput = () => {
    const fileInput = document.getElementById('image');
    if (fileInput) {
        fileInput.click();
    }
};
// Get image source as a data URL
const getImageSrc = (file) => {
    return URL.createObjectURL(file);
};

const snackbarshow = ref(false)
async function signUpNewUser() { // Registration new user
    try {
        authenticating.value = true

        const uploadPromises = image.value.map(async (file) => {
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('users')
                .upload(`${displayname.value + '/' + file.name}`, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) {
                authenticating.value = false
                errMsg.value = uploadError
                throw uploadError;
            }

            // Get public URL for each uploaded image
            const { data: publicUrlData, error: publicUrlError } = await supabase.storage
                .from('users')
                .getPublicUrl(`${displayname.value + '/' + file.name}`);

            if (publicUrlError) {
                authenticating.value = false
                throw publicUrlError;
            }

            return publicUrlData.publicUrl;
        });

        // Wait for all uploads to complete
        const imageUrls = await Promise.all(uploadPromises);

        // Insert article details into database
        const { error: insertError } = await supabase.from('users').insert({
            Finger_ID: fingerprint.value,
            Name: displayname.value,
            img: imageUrls, // Store array of image URLs in the database
            Monitor: monitor.value,
        });

        if (insertError) {
            authenticating.value = false
            throw insertError;
        } else {
            console.log('Signed up successfully')
            snackbarshow.value = true
            authenticating.value = false
        }

    } catch (error) {
        errMsg.value = error.message
        console.log(error)
        authenticating.value = false
    }

}
</script>
<template>
    <div class="back">
        <!--Form Body-->
        <v-locale-provider :rtl="currentLocale == 'ar' ? true : false">
            <div v-if="dataview" :class="theme.global.current.value.dark ? 'bg-zinc-8a00 text-white' : ' text-black'"
                class="p-1 md:p-10a mt-5 flex-col justify-center mx-auto h-fit md:w-10/12 w-11/12 rounded-mda shadow-innear">
                <div class="flex justify-center">
                    <div class="w-fit h-[10rem] min-h-[10rem]">
                        <!-- <v-img src="/mainicon.svg" :class="theme.global.current.value.dark ? 'filter invert ' : ''"
                            class="p-5 mx-auto mb-5" width="150" alt="logo"></v-img> -->
                    </div>

                    <h1 class="text-3xl md:text-5xl text-center font-bold p-2 my-auto">{{ $t('join') }}
                    </h1>
                </div>

                <form id="form" class="p-5 text-center mx-auto justify-center flex-col w-full md:w-2/3"
                    @submit.prevent="signUpNewUser">
                    <div class="userdata fleax flex-arow w-full md:grid grid-cols-2  gap-1">

                        <div class="form mt-3 flex justify-center">
                            <v-text-field :disabled="true" variant="outlined" :label="$t('fingerid') + '*'"
                                id="fingerid" type="text" v-model="fingerprint"
                                :color="theme.global.current.value.dark ? '' : 'surface'"
                                :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'" spellcheck="false"
                                required></v-text-field>
                        </div>

                        <div class="form mt-3 flex justify-center">
                            <v-text-field variant="outlined" :label="$t('name') + '*'" id="name" v-model="displayname"
                                :color="theme.global.current.value.dark ? '' : 'surface'"
                                :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'" spellcheck="false"
                                type="text" @focus="isFocused2 = true" @blur="isFocused2 = false" required />

                        </div>
                    </div>
                    <div class="form mt-3 flex flex-col justify-center">
                        <p class="flex justify-start font-semibold p-3 mb-5">User Image: </p>
                        <v-img v-if="image" v-for="(image, index) in image" :key="index" :src="getImageSrc(image)"
                            class="m-5 mx-auto" max-width="200" min-width="200"></v-img>
                        <input class="text-current w-full hidden" type="file" id="image"
                            accept=".jpg, .jpeg, .png, .webp" multiple @change="handleImageUpload" />
                        <div class="flex flex-col">
                            <v-btn @click="openFileInput" color="black" class="ma-5 mx-auto my-auto w-fit"><v-icon
                                    size="20" class="mx-1">mdi-tray-arrow-up</v-icon>{{ image ?
                                        'تعديل'
                                        :
                                        'اضافة'
                                }}</v-btn>
                            <p class="text-center text-xs p-2 opacity-70">تقبل :
                                *.JPG، *.JPEG، *.PNG،
                                *.Webp
                                أقصى حجم: 5 ميجابايت
                            </p>
                        </div>
                    </div>

                    <div class="form mt-3 mb-3 flex justify-center">
                        <div class="flex  w-full  bg-whiate  rounded-md ">
                            <v-text-field variant="outlined" :label="$t('monitor') + '*'" id="monitor" v-model="monitor"
                                :color="theme.global.current.value.dark ? '' : 'surface'"
                                :bg-color="theme.global.current.value.dark ? '' : 'grey-lighten-4'" class="my-auto p-"
                                minlength="1" required />
                        </div>
                    </div>

                    <!--Display error message if any-->
                    <p class="bg-red-600 text-white p-1 m-2" v-if="errMsg"><v-icon class="mx-2"
                            size="20">mdi-alert</v-icon>{{ errMsg
                        }}</p>
                    <!--Submit button-->
                    <v-btn @click="" type="submit" max-height="44" min-height="44" color="black" :elevation="1"
                        prepend-icon="mdi-account-plus" :ripple="false"
                        class=" w-44 text-lg rounded-md hover:cursor-pointer">
                        <v-progress-circular v-if="authenticating" width="2" size="20" color="darken-blue-4" class="m-1"
                            indeterminate></v-progress-circular>
                        {{ $t('registerNow') }}
                    </v-btn>
                    <!--separator-->

                </form>
                <!--End of body-->
                <NotificationBar :snackbar="snackbarshow" icon="mdi-check-bold" :message="$t('signupSuccess')"
                    color="green" :timeout="3000" />
            </div>
        </v-locale-provider>
    </div>
</template>