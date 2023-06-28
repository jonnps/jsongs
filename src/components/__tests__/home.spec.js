import { mount, RouterLinkStub } from '@vue/test-utils';
import { expect } from 'vitest';

import Home from '@/pages/HomeView.vue';

vi.mock('@/includes/firebase', () => ({
  songsCollection: {
    orderBy: () => ({
      limit: () => ({
        get: () =>
          Promise.resolve({
            empty: false,
            docs: [
              { id: '1', data: () => ({ modified_name: 'Song1' }) },
              { id: '2', data: () => ({ modified_name: 'Song2' }) },
              { id: '3', data: () => ({ modified_name: 'Song3' }) }
            ],
            forEach: function (callback) {
              this.docs.forEach(callback);
            }
          })
      })
    })
  }
}));

describe('HomeView.vue', () => {
  test('renders list of songs', async () => {
    // Shallow mount the Home component
    const component = mount(Home, {
      global: {
        stubs: {
          // Stub the RouterLink component
          RouterLink: RouterLinkStub
        }
      }
    });

    // Wait for the data fetching operation to complete
    await new Promise((resolve) => setTimeout(resolve));

    // Find all the rendered song cards
    const songs = component.findAll('.song-card');

    // Assert that each song card has the correct song name
    songs.forEach((song, index) => {
      expect(song.find('h3').text()).toBe(`Song${index + 1}`);
    });
  });
});
