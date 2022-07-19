import React, {useRef} from 'react'
import { setImageHost } from 'service/image'
import css from './styles.scss'

function UploadImage({ imgSrc, handleUpload, simple, index }) {
    const myRefname= useRef(null);
    let _i = index ?? 0;

    const upload = () => {
        myRefname.current.click();
    };
    return (
        <span className={`${css.class}`}>
            <div className="upload-img-box-content">
                {
                    imgSrc ? <div className="have-image">
                        <img src={setImageHost(imgSrc)} />
                    </div> : ( simple ? <div className="no-image">
                            <p>
                                <img src="/assets/imgs/camera_fill.png" className="simple" />
                            </p>
                            <span onClick={upload}>写真を追加する</span>
                        </div>: <div className="no-image">
                            <img src="/assets/imgs/camera_fill.png" className="full" />
                            <p>人物の顔が写り込んでいない</p>
                            <p>オリジナルの写真をご利用ください</p>
                            <span onClick={upload}>写真を追加する</span>
                        </div>
                    )
                }
            </div>
            <input type="file" className="class-hidden" ref={myRefname} onChange={e => handleUpload(e, _i)}/>
        </span>
    )
}

export default UploadImage
