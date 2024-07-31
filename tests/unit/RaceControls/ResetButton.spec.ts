import { mount } from "@vue/test-utils";
import ResetButton from "@/components/RaceControls/components/ResetButton.vue";

describe("ResetButton.vue", () => {
  it("emits a click event when clicked", async () => {
    const wrapper = mount(ResetButton);

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("applies the correct button styles", () => {
    const wrapper = mount(ResetButton);

    const button = wrapper.find("button");
    expect(button.classes()).toContain("btn-primary");
    expect(button.classes()).toContain("bg-red-500");
    expect(button.classes()).toContain("hover:bg-red-700");
  });
});
