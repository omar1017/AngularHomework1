import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { DatePipe } from "@angular/common";
@Component({
    selector:"app-date",
    standalone:true,
    imports:[FormsModule,DatePipe],
    styleUrl:"./date.component.css",
    templateUrl:"./date.component.html",

})
export class DateComponent{
  md:number=1;
  mm:number=1;
  my:number=2023;

  hd:number=0;
  hm:number=0;
  hy:number=0;

  hijriDate:string="";
  miladiDate:string="";

  calDate():void{
    const convertedHijriDate = HijriGregorianConverter.convertGregorianToHijri(this.my,this.mm,this.md);
    this.hy = convertedHijriDate.year;
    this.hm = convertedHijriDate.month;
    this.hd = convertedHijriDate.day;
    this.hijriDate = `${this.hy}-${this.hm}-${this.hd}`;
    this.miladiDate=`${this.my}-${this.mm}-${this.md}`
  }
  

}
class HijriGregorianConverter {

  private static HIJRI_EPOCH = 1948439.5;
    private static GREGORIAN_EPOCH = 1721425.5;

    // دالة لتحويل التاريخ الهجري إلى عدد الأيام الجوليانية (Julian Day Number)
    private static hijriToJulianDay(year: number, month: number, day: number): number {
        return (day +
            Math.ceil(29.5 * (month - 1)) +
            ((year - 1) * 354) +
            Math.floor((3 + (11 * year)) / 30) +
            this.HIJRI_EPOCH) - 1;
    }

    // دالة لتحويل التاريخ الميلادي إلى عدد الأيام الجوليانية (Julian Day Number)
    private static gregorianToJulianDay(year: number, month: number, day: number): number {
        return (this.GREGORIAN_EPOCH - 1) +
            (365 * (year - 1)) +
            Math.floor((year - 1) / 4) -
            Math.floor((year - 1) / 100) +
            Math.floor((year - 1) / 400) +
            Math.floor((((367 * month) - 362) / 12) + 
            (month <= 2 ? 0 : (this.isLeapYear(year) ? -1 : -2)) + day);
    }

    // دالة لتحويل عدد الأيام الجوليانية إلى تاريخ ميلادي
    private static julianDayToGregorian(jd: number): { year: number, month: number, day: number } {
        jd += 0.5;
        const z = Math.floor(jd);
        const a = z;
        const b = a + 1524;
        const c = Math.floor((b - 122.1) / 365.25);
        const d = Math.floor(365.25 * c);
        const e = Math.floor((b - d) / 30.6001);
        const day = b - d - Math.floor(30.6001 * e);
        const month = e < 14 ? e - 1 : e - 13;
        const year = month > 2 ? c - 4716 : c - 4715;

        return { year, month, day };
    }

    // دالة لتحويل عدد الأيام الجوليانية إلى تاريخ هجري
    private static julianDayToHijri(jd: number): { year: number, month: number, day: number } {
        jd = Math.floor(jd) + 0.5;
        const year = Math.floor(((30 * (jd - this.HIJRI_EPOCH)) + 10646) / 10631);
        const month = Math.min(12, Math.ceil((jd - (29 + this.hijriToJulianDay(year, 1, 1))) / 29.5) + 1);
        const day = (jd - this.hijriToJulianDay(year, month, 1)) + 1;

        return { year, month, day };
    }

    // دالة لفحص إذا كانت السنة كبيسة في التقويم الميلادي
    private static isLeapYear(year: number): boolean {
        return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
    }

    // دالة لتحويل التاريخ الهجري إلى الميلادي
    public static convertHijriToGregorian(year: number, month: number, day: number): Date {
        const jd = this.hijriToJulianDay(year, month, day);
        const gregorianDate = this.julianDayToGregorian(jd);
        return new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day);
    }

    // دالة لتحويل التاريخ الميلادي إلى الهجري
    public static convertGregorianToHijri(year: number, month: number, day: number): { year: number, month: number, day: number } {
        const jd = this.gregorianToJulianDay(year, month, day);
        return this.julianDayToHijri(jd);
    }
}