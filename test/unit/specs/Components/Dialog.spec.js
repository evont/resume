import { mount, TransitionStub } from 'vue-test-utils'
import Dialog from '@/components/Dialog';

jest.useFakeTimers();

describe('Dialog.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = mount(Dialog, {
      propsData: {
        content: {
          tag: 'a',
          link: 'https://www.google.com',
          detail: 'abaracadabara'
        }
      },
      stubs: {
        transition: TransitionStub
      }
    })
  })
  if('should be loaded', () => {
    setTimeout(() => {
      expect(cmp.vm.isLoading).toBe(false)
    }, 500)
  })

  if('should be emitted', () => {
    setTimeout(() => {
      expect(cmp.vm.emitted('loadend')).toBeTruthy()
    }, 500)
  })
  it('should be a link', () => {
    const content = {
      tag: 'a',
      link: 'https://www.google.com',
      detail: 'abaracadabara'
    };
    cmp.setProps({
      content
    })
    expect(cmp.find('.detail').contains('.u-loading')).toBe(true);  
    setTimeout(() => {
      expect(cmp.find('.detail').contains('a')).toBe(true);
      expect(cmp.find('.detail a').attributes('link')).toBe(content.link);
    }, 500)
  });

  it('should be a image', () => {
    cmp.setProps({
      content: {
        tag: 'img',
        detail: 'https://media.giphy.com/media/12xvz9NssSkaS4/giphy.gif'
      }
    })
    expect(cmp.find('.detail').contains('.u-loading')).toBe(true);  
    setTimeout(() => {
      expect(cmp.find('.detail').contains('img')).toBe(true);
    }, 500)
  });

});
  