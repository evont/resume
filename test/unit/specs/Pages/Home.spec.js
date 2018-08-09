import { mount } from 'vue-test-utils'
import Home from '@/pages/Home';

describe('Home.vue', () => {

  it('should be mounted', () => {
    let cmp = mount(Home, {
      data: {
        isMounted: true
      }
    })
    expect(cmp.vm.isMounted).toEqual(true);
  });

  it('should be status euals one', () => {
    let cmp = mount(Home, {
      data: {
        isMounted: true
      }
    })
    expect(cmp.find('.home-logo').attributes()['data-status']).toBe('1')
    expect(cmp.find('.home-option').attributes()['data-status']).toBe('1')
  });

  it('Should have the expected html structure', () => {
    let cmp = mount(Home, {
      data: {
        isMounted: true
      }
    })
    expect(cmp.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
  })
});
  