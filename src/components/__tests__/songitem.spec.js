import { shallowMount } from '@vue/test-utils';
import i18n from '@/includes/i18n';
import SongItem from '@/pages/Manage/components/SongItem.vue';

vi.mock('@/includes/firebase', () => ({}));

describe('SongItem', () => {
  test('render song.display_name', () => {
    const props = {
      song: { modified_name: 'test' },
      index: 1,
      updateSong: () => {},
      removeSong: () => {},
      updateUnsavedFlag: () => {}
    };

    const wrapper = shallowMount(SongItem, {
      props,
      global: {
        plugins: [i18n]
      }
    });

    const compositionAuthor = wrapper.find('h4');

    expect(compositionAuthor.text()).toBe(props.song.modified_name);
  });
});
