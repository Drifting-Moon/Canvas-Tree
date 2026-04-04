import React from 'react';


export interface NoteType {
    id: string;
    y: number;
    x: number;
    z: number;
    color: string;
    text: string;
    title: string;
    height: number;
    width: number;
}

export interface NoteProps {
    note: NoteType
    onUpdateText: (id: string, text: string) => void;
    onUpdateTitle: (id: string, text: string) => void;
    onDelete: (e: React.MouseEvent, id: string) => void;
    onDragStart: (e: React.MouseEvent, note: NoteType) => void;
    onResizeStart: (e: React.MouseEvent, note: NoteType) => void;

}