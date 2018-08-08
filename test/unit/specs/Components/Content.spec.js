import { mount } from 'vue-test-utils'
import Content from '@/components/Content';
describe('Content.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = mount(Content)
  })
  it('Should have the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
  })
});
  