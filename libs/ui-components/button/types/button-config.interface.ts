import { IconsEnum } from "../../../../src/app/enums";
import { ButtonType } from "../enums";

export interface ButtonConfig {
    type: ButtonType
    label?: string,
    icon?: IconsEnum,
    classes?: string,
    disabled?: boolean,
    color?: string
}