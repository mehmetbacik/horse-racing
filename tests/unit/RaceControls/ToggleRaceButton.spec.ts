import { mount } from "@vue/test-utils";
import ToggleRaceButton from "@/components/RaceControls/components/ToggleRaceButton.vue";

describe("ToggleRaceButton.vue", () => {
  it("emits a click event when clicked", async () => {
    const wrapper = mount(ToggleRaceButton, {
      props: {
        isRunning: false,
        isGenerated: true,
      },
    });

    await wrapper.find("button").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("click");
  });

  it("disables the button when isGenerated is false", async () => {
    const wrapper = mount(ToggleRaceButton, {
      props: {
        isRunning: false,
        isGenerated: false,
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBe("");
    expect(button.classes()).toContain("btn-primary");
  });

  it("does not disable the button when isGenerated is true", async () => {
    const wrapper = mount(ToggleRaceButton, {
      props: {
        isRunning: false,
        isGenerated: true,
      },
    });

    const button = wrapper.find("button");
    expect(button.attributes("disabled")).toBeUndefined();
    expect(button.classes()).not.toContain("cursor-not-allowed");
  });

  it('displays "Start" when isRunning is false', () => {
    const wrapper = mount(ToggleRaceButton, {
      props: {
        isRunning: false,
        isGenerated: true,
      },
    });

    const button = wrapper.find("button");
    expect(button.text()).toBe("Start");
  });

  it('displays "Stop" when isRunning is true', () => {
    const wrapper = mount(ToggleRaceButton, {
      props: {
        isRunning: true,
        isGenerated: true,
      },
    });

    const button = wrapper.find("button");
    expect(button.text()).toBe("Stop");
  });
});
