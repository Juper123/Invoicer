import { ButtonConfig } from "../../button/types/button-config.interface";

export interface SidebarConfig {
    buttons: ButtonConfig[]
    enableClickedButtonHighlighting?: boolean
    initialButtonHighlighted?: string
}