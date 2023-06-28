import About from '@/pages/AboutView.vue';
import { shallowMount } from '@vue/test-utils';

describe('AboutView', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(About);

    expect(wrapper.text()).toContain('about');
  });
});
