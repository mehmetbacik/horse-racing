import { mount } from '@vue/test-utils';
import HorseItem from '@/components/HorseList/components/HorseItem.vue';

describe('HorseItem.vue', () => {
  it('renders horse item with correct details', () => {
    const horse = {
      id: 1,
      condition: 80,
      color: 'rgb(255, 87, 51)',
    };

    const wrapper = mount(HorseItem, {
      props: { horse },
    });

    expect(wrapper.text()).toContain(`Name: Horse ${horse.id}`);
    expect(wrapper.text()).toContain(`Condition: ${horse.condition}`);

    expect(wrapper.element.style.backgroundColor).toBe(horse.color);
  });
});
