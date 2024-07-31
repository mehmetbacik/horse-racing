import { mount } from "@vue/test-utils";
import RaceRunTable from "@/components/RaceSchedule/components/RaceRunTable.vue";

describe("RaceRunTable.vue", () => {
  const horses = [
    { id: 1, color: "rgb(102, 255, 51);" },
    { id: 2, color: "rgb(102, 255, 52);" },
    { id: 3, color: "rgb(102, 255, 53);" },
  ];

  it("renders a table with horse positions and names", () => {
    const wrapper = mount(RaceRunTable, {
      props: { horses },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(horses.length);

    rows.forEach((row, index) => {
      const positionCell = row.find("td:first-child");
      const nameCell = row.find("td:last-child");

      expect(positionCell.text()).toBe((index + 1).toString());
      expect(nameCell.text()).toBe(`Horse ${horses[index].id}`);
    });
  });

  it('renders "Position" and "Name" headers', () => {
    const wrapper = mount(RaceRunTable, {
      props: { horses },
    });

    const headers = wrapper.findAll("thead th");
    expect(headers).toHaveLength(2);
  });
});
