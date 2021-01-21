import { LocaleService } from './locale.service';
import { Locales } from '../enum/locales.enum';

describe('LocaleService', () => {
  const translateMock = {
    getBrowserLang: jest.fn(),
    use: jest.fn()
  };

  const service = new LocaleService(translateMock as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return browser locale', () => {
    // arrange
    translateMock.getBrowserLang.mockReturnValue(Locales.UA);

    // act
    const actualLocale = service.getBrowserLocale();

    // assert
    expect(actualLocale).toEqual(Locales.UA);
  });

  it('should return all available locales', () => {
    // arrange
    const expectedAvailableLocales = ['en', 'ru', 'ua'];

    // act
    const actualAvailableLocales = service.getAvailableLocales();

    // assert
    expect(actualAvailableLocales).toEqual(expectedAvailableLocales);
  })

  it('should use detected locale when detected locale is available', () => {
    // arrange
    translateMock.getBrowserLang.mockReturnValue(Locales.UA);

    // act
    service.useDetectedLocale();

    // assert
    expect(translateMock.use).toHaveBeenCalledWith(Locales.UA);
  })

  it('should use default locale when detected locale is not available', () => {
    // arrange
    translateMock.getBrowserLang.mockReturnValue('jp');

    // act
    service.useDetectedLocale();

    // assert
    expect(translateMock.use).toHaveBeenCalledWith(Locales.EN);
  })

  it('should use custom locale when "useLocale" method is called', () => {
    // arrange
    const customLocale = Locales.UA

    // act
    service.useLocale(customLocale);

    // assert
    expect(translateMock.use).toHaveBeenCalledWith(customLocale);
  })
});
