import { ButtonType, SidebarConfig } from "../../../../../libs";
import { IconsEnum } from '../../../enums'
import { SidebarButtonLabelsEnum } from "../enums";

export const SIDEBAR_CONFIG: SidebarConfig = {
    enableClickedButtonHighlighting: true,
    initialButtonHighlighted: SidebarButtonLabelsEnum.Home,
    buttons: [
        {
            type: ButtonType.ExtendedFab,
            label: SidebarButtonLabelsEnum.Home,
            icon: IconsEnum.home,
            classes: 'width-150 background-blue-1'
        },
        {
            type: ButtonType.ExtendedFab,
            label: SidebarButtonLabelsEnum.Invoices,
            icon: IconsEnum.receipt,
            classes: 'width-150 background-blue-1'
        },
        {
            type: ButtonType.ExtendedFab,
            label: SidebarButtonLabelsEnum.Customers,
            icon: IconsEnum.contacts,
            classes: 'width-150 background-blue-1'
        },
        {
            type: ButtonType.ExtendedFab,
            label: SidebarButtonLabelsEnum.Settings,
            icon: IconsEnum.settings,
            classes: 'width-150 background-blue-1'
        },

    ]
}