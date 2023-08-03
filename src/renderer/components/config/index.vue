<script lang="ts">
import { reactive, defineComponent, provide, onMounted } from "vue";
import { configInjectionKey } from "./context";
import { allCssVar } from "@/styles/variables";

function isPx(str: string) {
    return /^-?(\d+|\d+\.\d+|\.\d+)px$/i.test(str);
}

export default defineComponent({
    setup() {
        const cssVar = reactive({});
        provide(configInjectionKey, reactive({ cssVar }));

        onMounted(() => {
            const root = document.documentElement;
            const computedStyle = getComputedStyle(root);
            const newCssVar: Record<string, string | number> = {};
            allCssVar.forEach((key) => {
                const val = computedStyle.getPropertyValue(key);
                if (isPx(val)) {
                    newCssVar[key] = parseFloat(val);
                } else {
                    newCssVar[key] = val;
                }
            });
            Object.assign(cssVar, newCssVar);
        });

        return {
            cssVar,
        };
    },
    render() {
        return this.$slots.default!();
    },
});
</script>
