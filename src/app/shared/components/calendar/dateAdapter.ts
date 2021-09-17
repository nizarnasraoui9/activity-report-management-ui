import { NativeDateAdapter } from "@angular/material/core";

/** Adapts the native JS Date for use with cdk-based components that work with dates. */
export class CustomDateAdapter extends NativeDateAdapter {
  public static month:number;
  public static year:number;
  getFirstDayOfWeek(): number {
    return 1;
  }
  getMonth(date: Date): number{
    return CustomDateAdapter.month;
  }
  getYear(date: Date): number{
    return CustomDateAdapter.year;
  }
  
  

  
}
