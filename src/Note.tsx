import { type NoteProps } from "./types.ts";



function Note({ note, onUpdateText, onUpdateTitle, onDelete, onDragStart, onResizeStart }: NoteProps) {
    return (
        <div
            className='note'

            onClick={(e) => e.stopPropagation()}
            onContextMenu={e => onDelete(e, note.id)}

            style={{
                position: 'absolute',
                left: note.x - 25,
                top: note.y - 25,
                zIndex: note.z || 1,
                width: note.width,
                height: note.height,
                backgroundColor: note.color,
                borderRadius: '4px',
                margin: '0',
            }}
        >
            <div
                style={{
                    height: '20%',
                    width: '100%',
                    cursor: 'grab',
                    display: 'flex',
                    /* Optional: add a slight background color if you want to see the handle */
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderTopLeftRadius: '4px',
                    borderTopRightRadius: '4px'
                }}
            >
                <input          // ---------------TITLE------------------- //
                    type='text'
                    value={note.title !== undefined ? note.title : "Title"}
                    onChange={(e) => onUpdateTitle(note.id, e.target.value)}
                    onMouseDown={e => e.stopPropagation()}

                    className="sticky-note-title"

                    style={{
                        border: 'none',
                        padding: '0px',
                        margin: '0',
                        color: 'black',
                        width: '70%',
                        height: '100%',
                        background: 'transparent',
                        boxSizing: 'border-box',
                        //display: 'flex',
                        outline: 'none',
                        fontSize: `${Math.min(30, note.width * 0.15, note.height * 0.15)}px`,
                        fontWeight: 'bold'

                    }}
                />
                <div          // -------------- DIV to DRAG ------------ //

                    onMouseDown={(e) => onDragStart(e, note)}

                    style={{
                        border: 'none',
                        padding: '0px',
                        margin: '0',
                        color: 'black',
                        width: '30%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.11)', /* Darker background for grab area */
                        boxSizing: 'border-box',
                        outline: 'none',
                    }}
                />
            </div>

            <textarea // ------------------------ TEXTAREA --------------------------//
                rows={2}
                value={note.text}
                onChange={(e) => onUpdateText(note.id, e.target.value)}

                className="sticky-note"

                style={{
                    border: 'none',
                    resize: 'none',
                    outline: 'none',
                    padding: '2px', // Removed the 10px padding
                    color: 'black',
                    width: '100%',
                    height: '80%',
                    boxSizing: "border-box",
                    background: 'transparent',
                    display: 'block',
                    margin: '0',
                }}
            />
            <div
                onMouseDown={(e) => {
                    e.stopPropagation();
                    onResizeStart(e, note); // Pass this function from App.jsx
                }}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '5px',
                    cursor: 'nwse-resize', // The diagonal arrow cursor
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: '2px'
                }}
            />
        </div>
    );
}

export default Note;