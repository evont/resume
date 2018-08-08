import { mount } from 'vue-test-utils'
import Reply from '@/components/Reply';

const replies = [
  {
    tag: 'p',
    detail: 'abacadabara'
  }
]
describe('Reply.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = mount(Reply, {
      sync: true,
      propsData: {
        replies
      }
    })
  })
  it('should emitReply', () => {
    cmp.find('.detail').trigger('click') // 对button触发一个click事件
    expect(cmp.emitted('reply')).toBeTruthy() // 查看render2Pic是否被调用
  });

  it('should has element', () => {
    expect(cmp.findAll('.detail').length).toBe(replies.length)
  });

  it('should reply something', () => {
    const content = replies[0];
    expect(cmp.find('.detail').html()).toBe(`<div class=\"detail\"><${content.tag}>${content.detail}</${content.tag}></div>`)
  });

  it('Should have the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
  })
});
  