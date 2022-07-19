import React from 'react'

import Header from 'components/Header'
import Button from 'components/Button'
import Footer from 'components/Footer'

import css from './styles.scss'
import {useHistory} from "react-router-dom";

export default function FinishInput(data) {
    let history = useHistory();
    let detailUrl;

    if (data === undefined || data.location === undefined || data.location.state === undefined
        || data.location.state.finish === undefined) {
        history.push('/trouble-input');
    } else {
        const info = data.location.state.finish;
        detailUrl = `/recipe/${info.id}/${info.type}`;
    }

    const goBackConfirm = () => {
        history.push(detailUrl);
    }
    const goBackInput = () => {
        history.push('/trouble-input');
    }
    const goBackTop = () => {
        history.push('/');
    }

    return (
        <div className={`finish-input ${css.class}`}>
            <Header/>
            <section className="content-box text-break kv image">
                <div className="d-flex align-center justify-center">
                    <div className="image-container">
                        <img src="/assets/recipe.png" className={`img`}/>
                    </div>
                </div>
            </section>
            <section className="content-box text-break main-action d-flex justify-center">
                <h1>投稿が完了しました</h1>
            </section>
            <section className="content-box text-break main-action d-flex justify-center">
                <Button varient="default" className="add-material" onClick={() => goBackConfirm()}>
                    <span>投稿したレシピを確認する</span>
                </Button>
            </section>
            <section className="content-box text-break main-action d-flex justify-center">
                <Button varient="default" className="add-material outline" onClick={() => goBackInput()}>
                    <span>レシピを続けて投稿する</span>
                </Button>
            </section>
            <section className="content-box text-break main-action d-flex justify-center">
                <span className={`action-link`} onClick={() => goBackTop()}>
                  ホームへ戻る
                </span>
            </section>
            <Footer/>
        </div>
    )
}
