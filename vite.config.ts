import {defineConfig} from "vite";

export default defineConfig({
    resolve: {
        alias: {
            '@hexlet/code': './formMaker.ts'
        }
    }
})