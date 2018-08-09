import { mount } from 'vue-test-utils'
import Animate from '@/pages/Animate';
import Content from '@/components/Content';

describe('Animate.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = mount(Animate)
  })
  it('should have a Content ', () => {
    expect(cmp.find(Content).exists()).toEqual(true);
  });
});
  