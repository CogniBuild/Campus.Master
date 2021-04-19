import { LocaleService } from './locale.service';
import { Subscription, of } from 'rxjs';
import { Locales } from '../enum/locales.enum';

describe('LocaleService', () => {
  let valueLocale$ = new Subscription();

  const translateMock = {
    getBrowserLang: jest.fn(),
    use: jest.fn(),
    get: jest.fn()
  };

  const service = new LocaleService(translateMock as any);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return browser locale', () => {
    // arrange
    translateMock.getBrowserLang.mockReturnValue(Locales.UK);

    // act
    const actualLocale = service.getBrowserLocale();

    // assert
    expect(actualLocale).toEqual(Locales.UK);
  });

  it('should return all available locales', () => {
    // arrange
    const expectedAvailableLocales = ['en', 'ru', 'uk'];

    // act
    const actualAvailableLocales = service.getAvailableLocales();

    // assert
    expect(actualAvailableLocales).toEqual(expectedAvailableLocales);
  })

  it('should use detected locale when detected locale is available', () => {
    // arrange
    translateMock.getBrowserLang.mockReturnValue(Locales.UK);

    // act
    service.useDetectedLocale();

    // assert
    expect(translateMock.use).toHaveBeenCalledWith(Locales.UK);
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
    const customLocale = Locales.UK

    // act
    service.useLocale(customLocale);

    // assert
    expect(translateMock.use).toHaveBeenCalledWith(customLocale);
  })

  it('should return observable of localed text by key', (done) => {
    // arrange
    translateMock.get.mockReturnValue(of("Sample text"));

    // act
    valueLocale$ = service.get("key").subscribe((value) => {
      // assert
      expect(value).toEqual("Sample text");
      done();
    });
  })

  afterAll(() => {
    valueLocale$.unsubscribe();
  })
});
