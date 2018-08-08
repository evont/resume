import Vue from 'vue'
import { shallow } from 'vue-test-utils'
import Static from '@/pages/Static';

describe('Static.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = shallow(Static)
  })
  it('should render three option', () => {
    expect(cmp.find('.static-option').findAll('.static-option-item').length)
      .toBe(3);
  });

  it('should call renderPic when click render2Pic', () => {
    const stub = jest.fn() // 伪造一个jest的mock funciton
    cmp.setMethods({ render2Pic: stub }) // setMethods将render2Pic这个方法覆写
    cmp.find('.static-option-item[data-type="pic"]').trigger('click') // 对button触发一个click事件
    expect(stub).toBeCalled() // 查看render2Pic是否被调用
  });

  it('should call renderPdf when click render2Pdf', () => {
    const stub = jest.fn() // 伪造一个jest的mock funciton
    cmp.setMethods({ render2Pdf: stub }) // setMethods将render2Pic这个方法覆写
    cmp.find('.static-option-item[data-type="pdf"]').trigger('click') // 对button触发一个click事件
    expect(stub).toBeCalled() // 查看render2Pic是否被调用
  });
});
  