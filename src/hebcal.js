/*
    Hebcal - A Jewish Calendar Generator
    Copyright (c) 1994-2020 Danny Sadinoff
    Portions copyright Eyal Schachter and Michael J. Radwin

    https://github.com/hebcal/hebcal-es6

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; either version 2
    of the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import { t, gettext } from 'ttag';
import common from './common';
import { HDate, hebrew2abs } from './hdate';
import holidays, { Event, flags } from './holidays';
import Sedra from './sedra';
import greg from './greg';
import dafyomi from './dafyomi';

function sunsetTime(hd, location, timeFormat, offset) {
    const sunset = location.sunset(hd);
    const dt = new Date(sunset.getTime() + (offset * 60 * 1000));
    const time = timeFormat.format(dt);
    return [dt, time];
}

function candleEvent(e, hd, dow, location, timeFormat, candlesOffset, havdalahOffset) {
    let name = "Candle lighting";
    let offset = candlesOffset;
    let mask = flags.LIGHT_CANDLES;
    if (typeof e !== 'undefined') {
        mask = e.getFlags();
        if (dow != 5) {
            if (mask & (flags.LIGHT_CANDLES_TZEIS | flags.CHANUKAH_CANDLES)) {
                offset = havdalahOffset;
            } else if (mask & flags.YOM_TOV_ENDS) {
                name = "Havdalah";
                offset = havdalahOffset;
            }
        }
    } else if (dow == 6) {
        name = "Havdalah";
        offset = havdalahOffset;
    }
    if (name === "Havdalah") {
        name = `Havdalah (${offset} min)`;
    }
    const [eventTime, timeStr] = sunsetTime(hd, location, timeFormat, offset);
    let e2 = new Event(hd, `${name}: ${timeStr}`, mask);
    e2.eventTime = eventTime;
    return e2;
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"],
        v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getCandleLightingMinutes(options) {
    const location = options.location || {};
    let min = 18;
    if (location.il && typeof location.name !== 'undefined' && location.name === 'Jerusalem') {
        min = 40;
    }
    if (typeof location.candleLightingMins === 'number') {
        min = Math.abs(candleLightingMins);
    }
    return -1 * min;
}

function getHavdalahMinutes(options) {
    return options.havdalahMins || 50;
}

/**
 * Options to configure which events are returned
 * @typedef {Object} HebcalOptions
 * @property {Location} location - latitude/longitude/tzid used for candle-lighting
 * @property {number} year - Gregorian or Hebrew year
 * @property {boolean} isHebrewYear - to interpret year as Hebrew year
 * @property {number} month - Gregorian or Hebrew month (to filter results to a single month)
 * @property {boolean} candlelighting - calculate candle-lighting and havdalah times
 * @property {number} candleLightingMins - minutes before sundown to light candles (default 18)
 * @property {number} havdalahMins - minutes after sundown for Havdalah (default 50)
 * @property {boolean} sedrot - calculate parashah hashavua on Saturdays
 * @property {boolean} il - Israeli holiday and sedra schedule
 * @property {boolean} noMinorFast - suppress minor fasts
 * @property {boolean} noModern - suppress modern holidays
 * @property {boolean} noRoshChodesh - suppress Rosh Chodesh & Shabbat Mevarchim
 * @property {boolean} noSpecialShabbat - suppress Special Shabbat
 * @property {boolean} noHolidays - suppress regular holidays
 * @property {boolean} dafyomi - include Daf Yomi
 * @property {boolean} omer - include Days of the Omer
 */

 /* Parse options object to determine start & end days */
function getStartAndEnd(options) {
    const theYear = options.year ? common.dayYearNum(options.year) : new Date().getFullYear();
    const isHebrewYear = Boolean(options.isHebrewYear);
    let theMonth = NaN;
    if (options.month) {
        if (isHebrewYear) {
            theMonth = common.monthNum(options.month);
        } else {
            theMonth = +options.month - 1; // switch from 1-based to 0-based greg months
        }
    }
    const startDate = isHebrewYear ?
        new HDate(1, theMonth || common.months.TISHREI, theYear) : new HDate(greg.greg2abs(new Date(theYear, theMonth || 0, 1)));
    const startAbs = startDate.abs();
    const endAbs = isHebrewYear ? (
        options.month ? startDate.abs() + startDate.daysInMonth() : new HDate(1, common.months.TISHREI, theYear + 1).abs() - 1
    ) : (
        // Gregorian
        options.month ? startDate.abs() + greg.daysInMonth(theMonth + 1, theYear) : greg.greg2abs(new Date(theYear + 1, 0, 1)) - 1
        );
    const endDate = new HDate(endAbs);
    console.debug(`year=${theYear}, month=${theMonth}, isHebrewYear=${isHebrewYear}, startAbs=${startAbs}, endAbs=${endAbs}`);

    return [startDate, startAbs, endDate, endAbs];
}

function getOmerStartAndEnd(options, hyear) {
    if (options.omer) {
        return [
            hebrew2abs({ yy: hyear, mm: common.months.NISAN, dd: 16 }),
            hebrew2abs({ yy: hyear, mm: common.months.SIVAN, dd: 5 })
        ];
    } else {
        return [-1, -1];
    }
}

function getMaskFromOptions(options) {
    const il = options.il || (options.location && options.location.il) || false;
    let mask = 0;

    // default options
    if (!options.noHolidays) {
        mask |= flags.ROSH_CHODESH |
                flags.YOM_TOV_ENDS |
                flags.MINOR_FAST |
                flags.SPECIAL_SHABBAT |
                flags.SHABBAT_MEVARCHIM |
                flags.MODERN_HOLIDAY |
                flags.MAJOR_FAST;
    }

    // suppression of defaults
    if (options.noRoshChodesh) {
        mask &= ~flags.ROSH_CHODESH;
    }

    if (options.noModern) {
        mask &= ~flags.MODERN_HOLIDAY;
    }

    if (options.noMinorFast) {
        mask &= ~flags.MINOR_FAST;
    }

    if (options.noSpecialShabbat) {
        mask &= ~flags.SPECIAL_SHABBAT;
        mask &= ~flags.SHABBAT_MEVARCHIM;
    }

    if (il) {
        mask |= flags.IL_ONLY;
    } else {
        mask |= flags.CHUL_ONLY;
    }

    // non-default options
    if (options.candlelighting) {
        mask |= flags.LIGHT_CANDLES | flags.LIGHT_CANDLES_TZEIS | flags.CHANUKAH_CANDLES;
    }

    if (options.sedrot) {
        mask |= flags.PARSHA_HASHAVUA;
    }

    if (options.dafyomi) {
        mask |= flags.DAF_YOMI;
    }

    if (options.omer) {
        mask |= flags.OMER_COUNT;
    }

    /*
    // debug
    for (const x in flags) {
        if (mask & flags[x]) {
            console.debug(x);
        }
    }
    */

    return mask;
}

/**
 * Generates a list of holidays
 * @param {HebcalOptions} options
 */
export function hebcalEvents(options) {
    const location = options.location || { tzid: "UTC", il: false };
    const il = options.il || location.il || false;
    const timeFormat = new Intl.DateTimeFormat('en-US', {
        timeZone: location.tzid,
        hour: 'numeric',
        minute: 'numeric'
    });
    const [startDate, startAbs, endDate, endAbs] = getStartAndEnd(options);
    let currentYear = startDate.getFullYear();
    const candleLightingMinutes = getCandleLightingMinutes(options);
    const havdalahMinutes = getHavdalahMinutes(options);
    const mask = getMaskFromOptions(options);
    const MASK_LIGHT_CANDLES =
        flags.LIGHT_CANDLES |
        flags.LIGHT_CANDLES_TZEIS |
        flags.CHANUKAH_CANDLES |
        flags.YOM_TOV_ENDS;
    let sedra = options.sedrot ? new Sedra(currentYear, il) : undefined;
    const [beginOmer,endOmer] = getOmerStartAndEnd(options, currentYear);
    let events = [];
    for (let abs = startAbs; abs <= endAbs; abs++) {
        const hd = new HDate(abs);
        const dow = abs % 7;
        let candlesToday = false;
        const ev = holidays.getHolidaysOnDate(hd);
        if (typeof ev !== 'undefined') {
            for (const e of ev) {
                const eFlags = e.getFlags();
                if ((!eFlags || (eFlags & mask)) &&
                    ((il && e.observedInIsrael()) || (!il && e.observedInDiaspora()))) {
                    events.push(e);
                    if (options.candlelighting && eFlags & MASK_LIGHT_CANDLES) {
                        const e2 = candleEvent(e, hd, dow, location, timeFormat, candleLightingMinutes, havdalahMinutes);
                        events.push(e2);
                        candlesToday = true;
                    }
                }
            }
        }
        if (options.sedrot && dow == 6) { // Saturday
            const hyear = hd.getFullYear();
            if (hyear != currentYear && options.sedrot) {
                currentYear = hyear;
                sedra = new Sedra(currentYear, il);
            }
            if (sedra.isParsha(abs)) {
                const parshaStr = sedra.getString(abs);
                events.push(new Event(hd, parshaStr, flags.PARSHA_HASHAVUA));
            }
        }
        if (!candlesToday && (dow == 5 || dow == 6)) { // Friday or Saturday
            const e2 = candleEvent(undefined, hd, dow, location, timeFormat, candleLightingMinutes, havdalahMinutes);
            events.push(e2);
        }
        if (options.dafyomi) {
            const dy = dafyomi.dafyomi(greg.abs2greg(abs));
            const desc = t`Daf Yomi` + ": " + dafyomi.dafname(dy);
            events.push(new Event(new HDate(abs), desc, flags.DAF_YOMI));
        }
        if (options.omer && abs >= beginOmer && abs <= endOmer) {
            const omer = abs - beginOmer + 1;
            const nth = getOrdinal(omer);
            const desc = `${nth} day of the Omer`;
            events.push(new Event(new HDate(abs), desc, flags.OMER_COUNT));
        }
    }

//    return events.sort((a, b) => a.getDate().abs() - b.getDate().abs());
    return events;
}

export default {
    hebcalEvents
};
