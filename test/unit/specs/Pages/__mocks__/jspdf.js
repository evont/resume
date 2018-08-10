const jspdf = jest.genMockFromModule('jspdf');
jspdf.prototype.addImage = () => {};
jspdf.prototype.save = () => {};
jspdf.prototype.addPage = () => {};

module.exports = jspdf;