import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as SettingsActions from './actions'
import { Context, DatabaseService, PopupService } from "../../../../../libs";
import { exhaustMap, from, map, mergeMap, tap } from "rxjs";
import { FormsService } from "../../../services";
import { FormGroupTypes, PopupMessage } from "../../../enums";
import { Settings } from "../../../models/types";



@Injectable()
export class SettingsEffects {

    getSettings$ = createEffect(() =>
        this.actions$.pipe(ofType(SettingsActions.getSettings), mergeMap(() => {
            return from(this.databaseService.getFromDatabase<Settings>(Context.Settings)).pipe(
                map(actionResult => SettingsActions.getSettingsSuccess({ actionResult })))
        })))

    saveSettings$ = createEffect(() =>
        this.actions$.pipe(ofType(SettingsActions.saveSettings), exhaustMap(() => {
            return from(this.databaseService.saveToDatabase(this.formsService.getFormValues<Settings>(FormGroupTypes.Settings), Context.Settings)).pipe(
                tap(actionResult => this.showPopup(actionResult.success)),
                map(actionResult => SettingsActions.saveSettingsSuccess({ actionResult })))
        })))


    constructor(
        private actions$: Actions,
        private databaseService: DatabaseService,
        private popupService: PopupService,
        private formsService: FormsService

    ) { }

    private showPopup(result: boolean): void {
        this.popupService.showPopup(result ? PopupMessage.Success : PopupMessage.Fail)
    }
}