import { ButtonConfig, ButtonType } from "../../../../../libs"
import { IconsEnum } from "../../../enums"

export const DELETE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.Raised,
    label: 'Usuń',
    icon: IconsEnum.delete,
    color: 'red-raised'
}


export const CREATE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.ExtendedFab,
    label: 'Wyślij',
    icon: IconsEnum.play,
    classes: 'width-180',
    color: 'green'
}

export const ADD_INVOICE_MODE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.Raised,
    label: 'Dodaj',
    icon: IconsEnum.add,
    color: 'blue-raised'
}

export const ADD_INVOICE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.Raised,
    label: 'Zatwierdź',
    icon: IconsEnum.done,
    color: 'green-raised'
}

export const DOWNLOAD_INVOICE_BUTTON_CONFIG: ButtonConfig = {
    type: ButtonType.Raised,
    label: 'Pobierz',
    icon: IconsEnum.get,
    color: 'green-raised'
}

