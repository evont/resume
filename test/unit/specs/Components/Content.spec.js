import { mount } from 'vue-test-utils'
import Content from '@/components/Content';
import Dialog from '@/components/Dialog';
import Reply from '@/components/Reply';

describe('Content.vue', () => {
  let cmp
  beforeEach(() => {
    cmp = mount(Content, {
      data: {
        info: {},
      }
    })
  })
  it('Should have the expected html structure', () => {
    expect(cmp.element).toMatchSnapshot() // 调用toMatchSnapshot来比对快照
  })

  it('contains a Dialog component', () => {
    setTimeout(() => {
      expect(cmp.contains(Dialog)).toBe(true)
    }, 1000)
  })

  it('contains a Reply component', () => {
    expect(cmp.contains(Reply)).toBe(true)
  })

  it('contains a Reply component', () => {
    expect(cmp.contains(Reply)).toBe(true)
  })

  it('Calls onReply when @reply happens', () => {
    jest.useFakeTimers();
    cmp.vm.loadDialog = jest.fn()
    cmp.update()
    // const stub = jest.fn()
    // cmp.setMethods({ handleMessageClick: stub })
    const item = {
      tag: 'p',
      detail: 'abaracadabra',
      next: 2,
    };

    cmp.vm.onReply(item);
    
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 800);
    expect(cmp.vm.replies).toEqual([]);
    jest.runOnlyPendingTimers();
    expect(cmp.vm.loadDialog).toBeCalled()
  })

  it('Should return empty array when id is out of rang', () => {
    cmp.vm.sequence = jest.fn()
    cmp.update()

    cmp.vm.loadDialog(100)
    expect(cmp.vm.sequence).toBeCalledWith([])
  })

  it('Should add diaglog when call addMsg', () => {
    const dialogLength = cmp.vm.dialogs.length;
    const item = {
      tag: 'p',
      detail: 'abaracadabra'
    };
    cmp.vm.addMsg(item)
    expect(cmp.vm.dialogs.length).toEqual(dialogLength + 1);

    cmp.vm.addMsg(item, true)
    expect(cmp.vm.dialogs[dialogLength].type).toEqual('reply');
  })

  it('Should run sequence', () => {
    jest.useFakeTimers();
    cmp.vm.addMsg = jest.fn()
    cmp.update()
    const tasks = [
      {
        tag: 'p',
        detail: 'abaracadabra'
      },
      {
        tag: 'p',
        detail: 'abaracadabra'
      }
    ];
    cmp.vm.sequence(tasks)
    expect(setTimeout).toHaveBeenCalledTimes(3);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 4000);
    jest.runOnlyPendingTimers();

    expect(cmp.vm.addMsg).toBeCalled()
  })
  
});
  