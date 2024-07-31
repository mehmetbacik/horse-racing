import { mount } from "@vue/test-utils";
import ResultTable from "@/components/RaceResult/components/ResultTable.vue";

interface Horse {
  id: number;
  color: string;
  finishTime: number;
}

const horses: Horse[] = [
  { id: 1, color: "rgb(102, 255, 51);", finishTime: 60.12 },
  { id: 2, color: "rgb(102, 255, 52);", finishTime: 62.34 },
  { id: 3, color: "rgb(102, 255, 53);", finishTime: 64.56 },
];

describe("ResultTable.vue", () => {
  it("renders the table with correct data", () => {
    const wrapper = mount(ResultTable, {
      props: { horses },
    });

    const rows = wrapper.findAll("tbody tr");
    expect(rows).toHaveLength(horses.length);

    rows.forEach((row, index) => {
      const cells = row.findAll("td");
      expect(cells[0].text()).toBe((index + 1).toString());
      expect(cells[1].text()).toBe(`Horse ${horses[index].id}`);
      expect(cells[2].text()).toBe(`${horses[index].finishTime.toFixed(2)}s`);
    });
  });

  it("renders the table headers correctly", () => {
    const wrapper = mount(ResultTable, {
      props: { horses },
    });

    const headers = wrapper.findAll("thead th");
    expect(headers).toHaveLength(3);
    expect(headers[0].text()).toBe("Position");
    expect(headers[1].text()).toBe("Name");
    expect(headers[2].text()).toBe("Finish Time");
  });
});
