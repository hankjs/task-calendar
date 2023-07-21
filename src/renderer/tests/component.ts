import { mount } from "@vue/test-utils";

export function useSetup<V>(setup: () => V) {
    const comp = {
        setup,
        render() {},
    };

    const wrapper = mount(comp);
    return {
        wrapper,
    };
}

export function useSetupHooks<V>(setup: () => V) {
    const comp = {
        setup() {
            const _ = setup()
            return {
                hooks: () => _
            }
        },
        render() {},
    };

    const $vm = mount(comp);
    return {
        $vm,
        ...($vm.vm.hooks as unknown as () => V)()
    }
}
