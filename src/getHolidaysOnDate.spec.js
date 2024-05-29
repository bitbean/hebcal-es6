import {HebrewCalendar} from './hebcal.js';
import {HDate} from '@hebcal/hdate';
import {Event} from './event.js';

jest.mock('quick-lru', () => {
  return jest.fn().mockImplementation(() => {
    return new Map();
  });
});

test('getHolidaysOnDate', () => {
  const hyear = 5771;
  const expected = [
    new HDate(1, 'Tishrei', hyear).abs() - 1, ['Erev Rosh Hashana'],
    new HDate(1, 'Tishrei', hyear), ['Rosh Hashana 5771'],
    new HDate(10, 'Tishrei', hyear), ['Yom Kippur'],
    new HDate(3, 'Cheshvan', hyear), undefined,
    new Date(2010, 11, 7), ['Chag HaBanot', 'Chanukah: 7 Candles', 'Rosh Chodesh Tevet'],
  ];
  for (let i = 0; i < expected.length; i += 2) {
    const dt = expected[i];
    const desc = expected[i + 1];
    const ev = HebrewCalendar.getHolidaysOnDate(dt);
    if (typeof desc === 'undefined') {
      expect(ev).toBe(undefined);
    } else {
      expect(Array.isArray(ev)).toBe(true);
      expect(ev[0] instanceof Event).toBe(true);
      const d = ev.map((e) => e.getDesc());
      expect(d).toEqual(desc);
    }
  }
});

test('getHolidaysOnDate-il', () => {
  const dtShavuot1 = new Date(2021, 4, 17);
  const dtShavuot2 = new Date(2021, 4, 18);
  const events0 = HebrewCalendar.getHolidaysOnDate(dtShavuot1);
  expect(events0.length).toBe(2);

  const events1il = HebrewCalendar.getHolidaysOnDate(dtShavuot1, true);
  expect(events1il.length).toBe(1);
  expect(events1il[0].getDesc()).toBe('Shavuot');

  const events1diaspora = HebrewCalendar.getHolidaysOnDate(dtShavuot1, false);
  expect(events1diaspora.length).toBe(1);
  expect(events1diaspora[0].getDesc()).toBe('Shavuot I');

  const events2d = HebrewCalendar.getHolidaysOnDate(dtShavuot2, false);
  expect(events2d.length).toBe(1);
  expect(events2d[0].getDesc()).toBe('Shavuot II');

  const events2il = HebrewCalendar.getHolidaysOnDate(dtShavuot2, true);
  expect(events2il.length).toBe(0, 'expected no Shavuot II in Israel');
});

test('getHolidaysOnDate-cacheHit', () => {
  const dt = new Date(2023, 11, 13);
  const hd = new HDate(dt);
  const ev1 = HebrewCalendar.getHolidaysOnDate(dt, false);
  const ev2 = HebrewCalendar.getHolidaysOnDate(hd, false);
  const ev3 = HebrewCalendar.getHolidaysOnDate(dt, true);
  const ev4 = HebrewCalendar.getHolidaysOnDate(hd, true);
  const ev5 = HebrewCalendar.getHolidaysOnDate(dt);
  const ev6 = HebrewCalendar.getHolidaysOnDate(hd);
  expect(ev1).toEqual(ev2);
  expect(ev1).toEqual(ev3);
  expect(ev1).toEqual(ev4);
  expect(ev1).toEqual(ev5);
  expect(ev1).toEqual(ev6);
});

test('getHolidaysOnDate-neg-cacheHit', () => {
  const hd = new HDate(3, 'Cheshvan', 5771);
  const ev1 = HebrewCalendar.getHolidaysOnDate(hd, false);
  const ev2 = HebrewCalendar.getHolidaysOnDate(hd, false);
  const ev3 = HebrewCalendar.getHolidaysOnDate(hd.greg(), false);
  expect(ev1).toBe(undefined);
  expect(ev2).toBe(undefined);
  expect(ev3).toBe(undefined);
});

test('getHolidaysOnDate does not include Mevarchim Chodesh', () => {
  // {date: '2011-05-28', desc: 'Shabbat Mevarchim Chodesh Sivan'}
  const events = HebrewCalendar.getHolidaysOnDate(new Date(2011, 4, 28), false);
  expect(events).toBe(undefined);
});
