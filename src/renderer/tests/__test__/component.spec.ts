import { it, expect, vi, describe } from "vitest";
import { useSetupHooks } from "../component";
import { onMounted, onUnmounted, ref } from "vue";

describe("useSetupHooks", () => {
    it("ref hook", async () => {
        const { name } = useSetupHooks(() => {
            const name = ref("hank");
            return {
                name,
            };
        });


        expect(name.value).toBe("hank");
    });

    it("onMonuted onUnmonuted hook", async () => {
        const mounted = vi.fn();
        const unmounted = vi.fn();
        const { $vm, name } = useSetupHooks(() => {
            const name = ref("hank");

            onMounted(mounted);
            onUnmounted(unmounted);

            return {
                name,
            };
        });

        expect(mounted).toBeCalled();
        expect(unmounted).not.toBeCalled();

        expect(name.value).toBe("hank");

        $vm.unmount();
        expect(unmounted).toBeCalled();
    });
});
