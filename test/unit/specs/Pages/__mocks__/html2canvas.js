const html2canvas = jest.genMockFromModule('html2canvas');
html2canvas.mockImplementation(() => {
  return new Promise((resolve, reject) => {
    resolve({
      toDataURL() {},
    })
  })
})
module.exports = html2canvas;

