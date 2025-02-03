import { IconsEnum } from "../../../enums";
import { ButtonType } from "../../../../../libs/ui-components/button/enums";
import { ButtonConfig } from "../../../../../libs/ui-components/button/types";

export const SAVE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.ExtendedFab,
    label: 'Zapisz',
    icon: IconsEnum.save,
    classes: 'width-180',
    color: 'green'
}

export const DELETE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.Raised,
    label: 'Usuń klienta',
    icon: IconsEnum.delete,
    color: 'red-raised'
}

export const ADD_CUSTOMER_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.Raised,
    icon: IconsEnum.add,
    label: 'Dodaj klienta',
    color: 'blue-raised'
}