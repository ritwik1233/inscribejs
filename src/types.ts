import React, { ReactNode } from 'react';
export type ClickHanderType = {
    clickHandlerId: string;
    onClickHandlerFunc?: Function;
};
export interface ClickAwayListenerProps {
    onClickAway: (event: Event) => void;
    children: ReactNode;
}

export interface PopoverProps {
    open: boolean;
    anchorPosition: {
        top: number;
        left: number;
    };
    onClose: (e: any) => void;
    children: ReactNode;
}

export interface TextItem {
    className: string;
    label: string | React.ReactNode;
    onClickHandlerObj?: ClickHanderType;
}
export type ElemHandlerType = {
    triggerModifyLine: boolean;
    funcPropName: string;
    funCall: Function;
};
export interface ComponentProps {
    label: string;
    type: string;
    icon?: React.ReactNode;
    elemProps: Object;
    elemHandlers: ElemHandlerType[];
    onModifyItem: Function;
    component: React.FC<any>;
}
export interface LineItemProps {
    _id: string;
    isEditing: boolean;
    order: number;
    [key: string]: any;
}
export interface EditorProps {
    lines: LineItemProps[];
    setLines: React.Dispatch<React.SetStateAction<LineItemProps[]>>;
    textFormats: TextItem[];
    components: ComponentProps[];
}
export interface CustomComponentProps {
    component: ComponentProps | undefined;
    line: LineItemProps;
    onToggleEdit: (order: number, val?: boolean) => void;
}

export interface TextFormatToolBarProps {
    open: boolean;
    anchorPosition: {
        top: number;
        left: number;
    };
    textFormats: TextItem[];
    onAddFormat: (className: string, onClickHandlerObj?: ClickHanderType) => void;
    onClose: (e: any) => void;
}
export interface ComponentPopoverProps {
    isOpen: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    components: ComponentProps[];
    onSelectFormat: (toolBarItem: any, component: ComponentProps) => void;
    toolBarItem: any; // Adjust this type as necessary
}
export interface LineItemComponentProps {
    line: LineItemProps;
    isMouseClicked: boolean;
    components: ComponentProps[];
    textFormats: TextItem[];
    onTextUpdateEnter: (text: string, order?: number) => void;
    onTextUpdate: (text: string, order?: number) => void;
    onFocusUp?: (text: string, _id: number) => void;
    onFocusDown?: (text: string, order: number) => void;
    onToggleEdit?: (order: number, val?: boolean) => void;
    onRemoveLine?: (order: number) => void;
    onOpenComponentToolbar?: (e: any) => void;
}

export interface ContentEditableProps {
    _id: string;
    value: string;
    order: number;
    isEditing: boolean;
    textFormats?: TextItem[];
    onTextUpdateEnter: (text: string, order?: number) => void;
    onTextUpdate: (text: string, order?: number) => void;
    onFocusUp?: (text: string, _id: number) => void;
    onFocusDown?: (text: string, order: number) => void;
    onToggleEdit?: (order: number, val?: boolean) => void;
    onRemoveLine?: (order: number) => void;
    isMouseClicked?: boolean;
}