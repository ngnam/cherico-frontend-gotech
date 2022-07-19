import React from 'react'

import css from './styles.scss'

function TextInput(props) {
    const {
        placeholder,
        className,
        name,
        helperText,
        errorMsg,
        required,
        label,
        value,
        disabled,
        onChange,
        multiline,
        maxlength,
        rows,
        noborder,
        money,
        type,
        position,
        blockIndex,
        subIndex
    } = props

    let _bI = blockIndex ?? 0;
    let _sI = subIndex ?? 0;

    return (
        <div className={`${css.class} ${className ?? ''}`}>
            <div className="input-content">
                {label && <p className="label">{label} {required && <span className="required">（必須）</span>}</p>}
                <div className={`content ${money ? 'money' : ''}`}>
                    {multiline ? (
                        <textarea
                            type='text'
                            placeholder={placeholder}
                            value={value}
                            disabled={disabled}
                            onChange={e => onChange(e, position, type, _bI, _sI)}
                            name={name}
                            maxLength={maxlength}
                            rows={rows || 5}
                            className={noborder && 'no-border'}
                        />
                    ) : (
                        <input
                            type='text'
                            placeholder={placeholder}
                            value={value}
                            disabled={disabled}
                            onChange={e => onChange(e, position, type, _bI, _sI)}
                            maxLength={maxlength}
                            name={name}
                            className={noborder && 'no-border'}
                        />
                    )}
                </div>
            </div>
            {errorMsg && <span className="error-text">{errorMsg}</span>}
            <div className="helper-text">{helperText}</div>
        </div>
    )
}

export default TextInput
