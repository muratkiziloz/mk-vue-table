import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    build: {
        lib: {
            entry: 'components/MyTable.vue', // Bileşenin yolu
            name: 'MyAwesomeTableComponent',
            fileName: (format) => `my-awesome-table-component.${format}.js`
        },
        rollupOptions: {
            external: ['vue'], // dış bağımlılıklar
            output: {
                globals: {
                    vue: 'Vue' // vue global değişken tanımı
                }
            }
        }
    },
    plugins: [vue()]
});
