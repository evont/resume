import { mount } from 'vue-test-utils'
import Static from '@/pages/Static';
import resume from '@/data/resume.json';
jest.mock('jspdf')
jest.mock('html2canvas')

describe('Static.vue', () => {
  it('should render three option', () => {
    let cmp = mount(Static)
    expect(cmp.find('.static-option').findAll('.static-option-item').length)
      .toBe(3);
  });

  it('should call render after mounted', (done) => {
    let cmp = mount(Static)
    cmp.vm.render = jest.fn() // 伪造一个jest的mock funciton
    cmp.vm.$nextTick(() => {
      expect(cmp.vm.render).toBeCalled()
      done()
    })
  });

  it('should call renderPdf when click render2Pdf', () => {
    let cmp = mount(Static, {
      data: {
        canvas: {
          width: 2,
          height: 2000,
          toDataURL() {}
        }
      }
    })
    cmp.find('.static-option-item[data-type="pdf"]').trigger('click') // 对button触发一个click事件
    setTimeout(() => {
      expect(cmp.vm.pdfName).toBe(`${resume.cnName}-${resume.job}-简历.pdf`) // 查看render2Pic是否被调用
    }, 1000)
  });

  it('should call renderPdf when click render2Pdf', () => {
    let cmp = mount(Static, {
      data: {
        canvas: {
          width: 2,
          height: 2,
          toDataURL() {}
        }
      }
    })
    cmp.find('.static-option-item[data-type="pdf"]').trigger('click') // 对button触发一个click事件
    setTimeout(() => {
      expect(cmp.vm.pdfName).toBe(`${resume.cnName}-${resume.job}-简历.pdf`) // 查看render2Pic是否被调用
    }, 1000)
  });
});
  