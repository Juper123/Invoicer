import { FormControl } from "@angular/forms";

export type FormControlsType<T> = {
  [key in keyof T]: FormControl;
};