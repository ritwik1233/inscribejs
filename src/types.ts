import React, { ReactNode } from 'react';
export type ClickHanderType = {
    clickHandlerId: string;
    onClickHandlerFunc?: Function;
};
export interface ClickAwayListenerProps {
    onClickAway: (event: Event) => void;
    children: ReactNode;
    id: string;
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
    previewMode?: boolean;
    setLines: React.Dispatch<React.SetStateAction<LineItemProps[]>>;
    textFormats?: TextItem[];
    onGenerateId?: () => string;
    lineItemIconStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
    lineItemIcon?: React.ReactNode;
    lineItemClassName?: string;
    lineItemStyle?: React.CSSProperties;
    components?: ComponentProps[];
    textFormatToolBarStyle?: React.CSSProperties;
    componentPopoverStyle?: React.CSSProperties;
    textFormatToolBarClassName?: string;
    componentPopoverClassName?: string;
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
    textFormatToolBarStyle?: React.CSSProperties;
    textFormatToolBarClassName?: string;
    textFormats: TextItem[];
    onAddFormat: (className: string, onClickHandlerObj?: ClickHanderType) => void;
    onClose: (e: any) => void;
}
export interface ComponentPopoverProps {
    isOpen: boolean;
    componentPopoverStyle?: React.CSSProperties;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    components: ComponentProps[];
    onSelectFormat: (toolBarItem: any, component: ComponentProps) => void;
    toolBarItem: any; // Adjust this type as necessary
}
export interface LineItemComponentProps {
    line: LineItemProps;
    previewMode?: boolean;
    lineItemIconStyle?: React.CSSProperties;
    lineItemIcon? : React.ReactNode;
    isMouseClicked: boolean;
    components: ComponentProps[];
    textFormats: TextItem[];
    lineItemClassName?: string;
    onMoveItem: (draggedIndex: number, droppedIndex: number) => void;
    lineItemStyle?: React.CSSProperties;
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
    previewMode?: boolean;
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