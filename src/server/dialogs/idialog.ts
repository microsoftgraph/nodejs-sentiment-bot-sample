import * as builder from 'botbuilder';

export interface IDialog {
    id: string;
    name: string;
    waterfall: builder.IDialogWaterfallStep[];
}