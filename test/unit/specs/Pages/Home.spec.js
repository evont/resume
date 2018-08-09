import { mount } from 'vue-test-utils'
import Home from '@/pages/Home';

describe('Home.vue', () => {

  it('should be mounted', () => {
    jest.useFakeTimers();
    let cmp = mount(Home);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 50);
    jest.runOnlyPendingTimers();
    expect(cmp.vm.isMounted).toEqual(true);
  });

  it('Should have the expected html structure', () => {
    let cmp = mount(Home)
    expect(cmp.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
  })
});
  