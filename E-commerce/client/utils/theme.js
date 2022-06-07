import { extendTheme } from "@chakra-ui/react";
import '@fontsource/apfel-grotezk'
import '@fontsource/montserrat'
import '@fontsource/nunito'

export const myNewTheme = extendTheme({
    colors : {
        brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
        },
    },
    fonts:{
        body:`'Nunito','Apfel Grotezk', 'Montserrat' `
    }
})