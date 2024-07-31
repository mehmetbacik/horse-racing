import { mount } from "@vue/test-utils";
import GenerateButton from "@/components/RaceControls/components/GenerateButton.vue";

describe("GenerateButton.vue", () => {
  it("emits a click event when clicked", async () => {
    const wrapper = mount(GenerateButton, {
      props: {
        isDisabled: false,
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("does not emit a click event when disabled", async () => {
    const wrapper = mount(GenerateButton, {
      props: {
        isDisabled: true,
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).not.toHaveProperty("click");
  });

  it("applies the disabled class when isDisabled is true", () => {
    const wrapper = mount(GenerateButton, {
      props: {
        isDisabled: true,
      },
    });

    const button = wrapper.find("button");
    expect(button.classes()).toContain("btn-primary");
  });

  it("does not apply the disabled class when isDisabled is false", () => {
    const wrapper = mount(GenerateButton, {
      props: {
        isDisabled: false,
      },
    });

    const button = wrapper.find("button");
    expect(button.classes()).not.toContain("bg-gray-400");
    expect(button.classes()).not.toContain("cursor-not-allowed");
  });
});
