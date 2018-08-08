import dialog from '@/data/dialog.js';

describe('dialog greet', () => {
  it('should say goodmornig', () => {
    expect(dialog.getGreet(4)).toBe('晚上');
  });

  it('should say goodevenning', () => {
    expect(dialog.getGreet(19)).toBe('晚上');
  });

  it('should say goodafternoon', () => {
    expect(dialog.getGreet(13)).toBe('下午');
  });
});
  