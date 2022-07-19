import React from 'react'
import TextInput from 'components/TextInputV3'
import UploadImage from "../UploadImage/UploadImage";
import css from './styles.scss'

function DesignRecipe({
        item, index, handleAddLevel1, handleAddLevel2, handleRemoveLevel1, handleRemoveLevel2, handleMoveLevel1,
        handleMoveLevel2, handleInputChange, handleSubChange, handleMove
    })
{
    return (
        <div className={`${css.class}`}>
            <p className="main-title-text">レシピ</p>
            <div className="main-content">
                <p className="sub-title-1">大ステップ.1の所要時間</p>
                <TextInput
                    required={false}
                    multiline={false}
                    name="required_time"
                    placeholder="例）1時間"
                    errorMsg=""
                    value={item.required_time}
                    onChange={handleInputChange}
                    type="design"
                    position={index}
                    maxlength="20"
                    noborder={true}
                />
                <p className="sub-title-1">見出し（大ステップ.1）<span className="text-required">（必須）</span></p>
                <TextInput
                    required={false}
                    multiline={true}
                    name="title"
                    placeholder="例）木製の丸イス"
                    errorMsg=""
                    value={item.title}
                    onChange={handleInputChange}
                    type="design"
                    position={index}
                    maxlength="50"
                    helperText={`${item.title?.length ?? 0}/50`}
                />
                {
                    item.detail.map((v, p) => {
                        return (
                            <div key={p} className={p != 0 ? 'm-t-52' : ''}>
                                <div className="sub-content">
                                    <p className="sub-title-2">小見出し（小ステップ.1）</p>
                                    <TextInput
                                        required={false}
                                        multiline={true}
                                        name="title"
                                        placeholder="例）木製の丸イス"
                                        errorMsg=""
                                        value={v.title}
                                        onChange={handleSubChange}
                                        type="sub"
                                        position={index}
                                        blockIndex={p}
                                        subIndex="0"
                                        maxlength="50"
                                        helperText={`${ v.title?.length ?? 0}/50`}
                                    />
                                    <p className="sub-title-2">本文</p>
                                    {
                                        v.articles.map((a,b) => {
                                            return (<div key={b} className={b != 0 ? 'm-t-52' : ''}>
                                                <div className="sub-content-1">
                                                    <UploadImage />
                                                    <p className="sub-title-3">動画のリンク</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={false}
                                                        name="url"
                                                        placeholder="https://www.youtube.com/"
                                                        errorMsg=""
                                                        value={a.url}
                                                        onChange={handleSubChange}
                                                        type="article"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="255"
                                                    />
                                                    <p className="helper-text">*動画のリンクを入力した場合、画像は表示されません。</p>
                                                    <p className="sub-title-3">キャプション</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={false}
                                                        name="title"
                                                        placeholder="例）出典：DCM-HD"
                                                        errorMsg=""
                                                        value={a.title}
                                                        onChange={handleSubChange}
                                                        type="article"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="255"
                                                    />
                                                    <p className="sub-title-3">説明文</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={true}
                                                        rows="7"
                                                        name="description"
                                                        placeholder="例）DIY初心者にもおすすめの木の丸イス"
                                                        errorMsg=""
                                                        value={a.description}
                                                        onChange={handleSubChange}
                                                        type="article"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="1000"
                                                    />
                                                </div>
                                                <div className="sub-content-1-control">
                                                    <div className="control-left">
                                                        <span className="btn-remove" onClick={e => handleRemoveLevel2(index, p, 'article', b)}>削除</span>
                                                        <span className="btn-add" onClick={e => handleAddLevel2(index, 'recipe', p, 'article')}>画像と本文をを追加</span>
                                                    </div>
                                                    <div className="control-right">
                                                        <img src="/assets/imgs/upward.png" className="m-r" onClick={e => handleMoveLevel2(index, p, 'article', b, -1)} />
                                                        <img src="/assets/imgs/downward.png" onClick={e => handleMoveLevel2(index, p, 'article', b, 1)}/>
                                                    </div>
                                                </div>
                                            </div>);
                                        })
                                    }

                                    <p className="sub-title-2">ポイント</p>
                                    {
                                        v.points.map((a, b) => {
                                            return (
                                                <div className="sub-content-1" key={b}>
                                                    <p className="sub-title-3 m-t-0">ポイント見出し</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={true}
                                                        rows="3"
                                                        name="title"
                                                        placeholder="例）木製の丸イス"
                                                        errorMsg=""
                                                        value={a.title}
                                                        onChange={handleSubChange}
                                                        type='point'
                                                        position={index}
                                                        subIndex={b}
                                                        blockIndex={p}
                                                        maxlength="50"
                                                        helperText={`0/50`}
                                                    />
                                                    <UploadImage />
                                                    <p className="sub-title-3">本文</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={true}
                                                        rows="7"
                                                        name="description"
                                                        placeholder="例）DIY初心者にもおすすめの木の丸イス"
                                                        errorMsg=""
                                                        value={a.description}
                                                        onChange={handleSubChange}
                                                        type='point'
                                                        position={index}
                                                        subIndex={b}
                                                        blockIndex={p}
                                                        maxlength="1000"
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                    <p className="sub-title-2">ファイル</p>
                                    {
                                        v.files.map((a,b) => {
                                            return (<div key={b} className={b != 0 ? 'm-t-52' : ''}>
                                                <div className="file-sub-content">
                                                    <img src="/assets/imgs/file_fill.png" />
                                                    <span>追加</span>
                                                </div>
                                                <div className="file-sub-control">
                                                    <span className="btn-remove" onClick={e => handleRemoveLevel2(index, p, 'file', b)}>削除</span>
                                                    <span className="btn-add" onClick={e => handleAddLevel2(index, 'recipe', p, 'file')}>ファイルを追加</span>
                                                </div>
                                            </div>);
                                        })
                                    }

                                    <p className="sub-title-2">このステップで使用する商品情報</p>
                                    {
                                        v.products.map((a, b) => {
                                            return (<div key={b} className={b != 0 ? 'm-t-52' : ''}>
                                                <div className="sub-content-1">
                                                    <UploadImage />
                                                    <p className="sub-title-3">メーカー名</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={false}
                                                        name="company_name"
                                                        placeholder="DCM-HD"
                                                        errorMsg=""
                                                        value={a.company_name}
                                                        onChange={handleSubChange}
                                                        type="product"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="255"
                                                        noborder={true}
                                                    />
                                                    <p className="sub-title-3">商品名</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={false}
                                                        name="name"
                                                        placeholder="ドライバドリル"
                                                        errorMsg=""
                                                        value={a.name}
                                                        onChange={handleSubChange}
                                                        type="product"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="255"
                                                        noborder={true}
                                                    />
                                                    <p className="sub-title-3">価格</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={false}
                                                        name="price"
                                                        placeholder="0"
                                                        errorMsg=""
                                                        value={a.price}
                                                        onChange={handleSubChange}
                                                        type="product"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="255"
                                                        noborder={true}
                                                        money={true}
                                                    />
                                                    <p className="sub-title-3">商品URL</p>
                                                    <TextInput
                                                        required={false}
                                                        multiline={false}
                                                        name="url"
                                                        placeholder="http://mirateo.jp"
                                                        errorMsg=""
                                                        value={a.url}
                                                        onChange={handleSubChange}
                                                        type="product"
                                                        position={index}
                                                        blockIndex={p}
                                                        subIndex={b}
                                                        maxlength="255"
                                                        noborder={true}
                                                    />
                                                </div>
                                                <div className="sub-content-1-control">
                                                    <div className="control-left">
                                                        <span className="btn-remove" onClick={e => handleRemoveLevel2(index, p, 'product', b)}>削除</span>
                                                        <span className="btn-add" onClick={e => handleAddLevel2(index, 'recipe', p, 'product')}>画像と本文をを追加</span>
                                                    </div>
                                                    <div className="control-right">
                                                        <img src="/assets/imgs/upward.png" className="m-r" onClick={e => handleMoveLevel2(index, p, 'product', b, -1)} />
                                                        <img src="/assets/imgs/downward.png" onClick={e => handleMoveLevel2(index, p, 'product', b, 1)}/>
                                                    </div>
                                                </div>
                                            </div>);
                                        })
                                    }
                                </div>
                                <div className="sub-content-1-control">
                                    <div className="control-left">
                                        <span className="btn-remove m-r" onClick={e => handleRemoveLevel1(index, p)}>削除</span>
                                        <span className="btn-add" onClick={e => handleAddLevel1(index, 'recipe')}>画像と本文をを追加</span>
                                    </div>
                                    <div className="control-right">
                                        <img src="/assets/imgs/upward.png" className="m-r" onClick={e => handleMoveLevel1(index, p, -1)}/>
                                        <img src="/assets/imgs/downward.png" onClick={e => handleMoveLevel1(index, p, 1)}/>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="sub-content-1-control">
                <div className="control-left">
                    {/*<span className="btn-remove m-r">削除</span>*/}
                    {/*<span className="btn-add">画像と本文をを追加</span>*/}
                </div>
                <div className="control-right">
                    <img src="/assets/imgs/upward.png" className="m-r" onClick={e => handleMove(index, 'design', -1)}/>
                    <img src="/assets/imgs/downward.png" onClick={e => handleMove(index, 'design', 1)}/>
                </div>
            </div>
        </div>
    )
}

export default DesignRecipe
