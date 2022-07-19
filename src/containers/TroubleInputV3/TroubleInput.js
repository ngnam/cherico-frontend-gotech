import React from 'react'
import useRequest from 'hooks/useRequest';
import { useParams, useHistory } from 'react-router-dom'

import Header from 'components/Header'
import Button from 'components/Button'
import TextInput from 'components/TextInputV3'
import Footer from 'components/Footer'
import ChevronRight from 'images/icons/chevron-right.svg'

import CameraFill from 'images/icons/camera-fill.svg'
import Camera from 'images/icons/camera.svg'

import css from './styles.scss'
import Select from "../../components/Select/Select";
import UploadImage from "../../components/UploadImage/UploadImage";
import ToolList from "../../components/ToolList/ToolList";
import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import DesignRecipe from "../../components/DesignRecipe/DesignRecipe";
import DesignSection from "../../components/DesignSection/DesignSection";
import DesignArticle from "../../components/DesignArticle/DesignArticle";
import DesignPDF from "../../components/DesignPDF/DesignPDF";
import DesignPoint from "../../components/DesignPoint/DesignPoint";
import ProductInput from "../../components/ProductInput/ProductInput";

export default function TroubleInput(data) {
    const { request } = useRequest();
    let history = useHistory();

    const tool = {name: '', qty: 0, price: 0, url: ''};
    const product = {company_name: '', name: '', price: 0, url: '', image_file_name: ''};
    const pdf = {url: ''};
    const point = {title: '', description: '', image_file_name: ''};
    const article = {title: '', description: '', url: '', image_file_name: ''};

    const [mainInfo, setMainInfo] = React.useState({
        title: '', description: '', e_t: null, e_d: null, cost: 0, required_time: '',
        vendor_cost: 0, e_r: null, e_c: null, e_v: null, impression: '', e_i: null
    });
    const [materials, setMaterials] = React.useState([{...tool}]);
    const [tools, setTools] = React.useState([{...tool}]);
    const [products, setProducts] = React.useState([{...product}]);
    const [mainPhoto, setMainPhoto] = React.useState(null);

    const [designs, setDesigns] = React.useState([{
            type: 'recipe', no: 1, title: '', required_time: '', detail: [{
            title: '', articles: [{...article}],
            products: [{...product}], files: [{...pdf}], points: [{...point}]
        }]}, {type: 'section', title: '', detail: [{
            title: '', no: 1, articles: [{...article}], points: [{...point}],
            files: [{...pdf}], products: [{...product}]
        }]}, {
            type: 'article', no: 1, description: ''
        }, {
            type: 'pdf', no: 1, files:[{...pdf}]
        }, {
            type: 'point', no: 1, title: '', description: '', image_file_name: ''
        }
    ])

    React.useEffect(() => {
        fetchData()
    }, []);

    const isNumber = (n) => {
        return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    };

    const summaryCost = () => {
        let total = 0;
        tools.forEach(v => {
            total += v.price * v.qty;
        });

        materials.forEach(v => {
            total += v.price * v.qty;
        });
        let list;
        list = {...mainInfo};
        list['cost'] = total;
        setMainInfo(list);
    };

    const handleAddDesign = (type) => {
        switch (type){
            case 'recipe':
                setDesigns([...designs, {
                    type: 'recipe', no: 1, title: '', required_time: '', detail: [{
                        title: '', articles: [{...article}],
                        products: [{...product}], files: [{...pdf}], points: [{...point}]
                    }]}]);
                break;
            case 'section':
                setDesigns([...designs, {type: 'section', title: '', detail: [{
                        title: '', no: 1, articles: [{...article}], points: [{...point}],
                        files: [{...pdf}], products: [{...product}]
                    }]}]);
                break;
            case 'pdf':
                setDesigns([...designs, {
                    type: 'pdf', no: 1, files:[{...pdf}]
                }]);
                break;
            case 'article':
                setDesigns([...designs, {
                    type: 'article', no: 1, description: ''
                }]);
                break;
            case 'point':
                setDesigns([...designs, {
                    type: 'point', no: 1, title: '', description: '', image_file_name: ''
                }]);
                break;
        }

    }

    const handleInputChange = (e, index, type) => {
        const {name, value} = e.target;
        let list;
        switch (type) {
            case 'main':
                list = {...mainInfo};
                list[name] = value;
                setMainInfo(list);
                break;
            case 'material':
                if((name == 'qty' || name == 'price') && !isNumber(value) && value != ''){
                    break;
                } else {
                    list = [...materials];
                    list[index][name] = value;
                    setMaterials(list);
                    if((name == 'qty' || name == 'price') && (isNumber(value) || value == '')){
                        summaryCost();
                    }
                    break;
                }
            case 'tool':
                if((name == 'qty' || name == 'price') && !isNumber(value) && value != ''){
                    break;
                } else {
                    list = [...tools];
                    list[index][name] = value;
                    setTools(list);
                    if((name == 'qty' || name == 'price') && (isNumber(value) || value == '')){
                        summaryCost();
                    }
                    break;
                }
            case 'product':
                list = [...products];
                list[index][name] = value;
                setProducts(list);
                break;
            case 'design':
                list = [...designs];
                list[index][name] = value;
                setDesigns(list);
                break;
        }
    };

    const handleSubChange = (e, index, subtype, blockIndex, subIndex) => {
        const {name, value} = e.target;
        let list = [...designs];
        switch (subtype) {
            case 'article':
                list[index]['detail'][blockIndex]['articles'][subIndex][name] = value;
                break;
            case 'product':
                list[index]['detail'][blockIndex]['products'][subIndex][name] = value;
                break;
            case 'point':
                list[index]['detail'][blockIndex]['points'][subIndex][name] = value;
                break;
            default:
                list[index]['detail'][blockIndex][name] = value;
                break;
        }

        setDesigns(list);
    }

    const handleRemoveClick = (index, type) => {
        let list;
        switch (type) {
            case 'material':
                list = [...materials];
                list.splice(index, 1);
                setMaterials(list);
                summaryCost();
                break;
            case 'tool':
                list = [...tools];
                list.splice(index, 1);
                setTools(list);
                summaryCost();
                break;
            case 'product':
                list = [...products];
                list.splice(index, 1);
                setProducts(list);
                break;
        }
    };

    const handleRemoveLevel1 = (i, subIndex) => {
        let list = [...designs];
        list[i]['detail'].splice(subIndex, 1);
        setDesigns(list);
    }

    const handleRemoveLevel2 = (i, blockIndex, subType, subIndex) => {
        let list = [...designs];
        switch (subType) {
            case 'article':
                list[i]['detail'][blockIndex]['articles'].splice(subIndex, 1);
                break;
            case 'product':
                list[i]['detail'][blockIndex]['products'].splice(subIndex, 1);
                break;
            case 'file':
                list[i]['detail'][blockIndex]['files'].splice(subIndex, 1);
                break;
        }
        setDesigns(list);
    }

    const handleAddLevel1 = (i, type) => {
        let list = [...designs];

        switch (type) {
            case 'recipe':
                list[i]['detail'] = [...list[i]['detail'], {
                    title: '', articles: [{...article}],
                    products: [{...product}], files: [{...pdf}], points: [{...point}]
                }]
                break;
            case 'section':
                list[i]['detail'] = [...list[i]['detail'], {
                    title: '', articles: [{...article}],
                    products: [{...product}], files: [{...pdf}], points: [{...point}]
                }]
                break;
        }

        setDesigns(list);
    }

    const handleAddLevel2 = (i, type, blockIndex, subType) => {
        let list = [...designs];

        switch (subType) {
            case 'article':
                list[i]['detail'][blockIndex]['articles'] = [...list[i]['detail'][blockIndex]['articles'],{...article}];
                break;
            case 'product':
                list[i]['detail'][blockIndex]['products'] = [...list[i]['detail'][blockIndex]['products'],{...product}];
                break;
            case 'file':
                list[i]['detail'][blockIndex]['files'] = [...list[i]['detail'][blockIndex]['files'],{...pdf}];
                break;
        }

        setDesigns(list);
    }

    const handleMoveLevel1 = (i, blockIndex, typeOfMove) => {
        let list = [...designs];

        if(!(blockIndex == 0 && typeOfMove == -1) && !(blockIndex == (list.length -1) && typeOfMove == 1)){
            let _next = blockIndex + typeOfMove;
            let _temp = list[i]['detail'][blockIndex];
            list[i]['detail'][blockIndex] = list[i]['detail'][_next];
            list[i]['detail'][_next] = _temp;
            setDesigns(list);
        }
    }

    const handleMoveLevel2 = (i, blockIndex, subType, subIndex, typeOfMove) => {
        let list = [...designs];
        if(!(subIndex == 0 && typeOfMove == -1) && !(subIndex == (list.length -1) && typeOfMove == 1)){
            let _next, _temp;
            switch (subType) {
                case 'article':
                    _next = subIndex + typeOfMove;
                    _temp = list[i]['detail'][blockIndex]['articles'][subIndex];
                    list[i]['detail'][blockIndex]['articles'][subIndex] = list[i]['detail'][blockIndex]['articles'][_next];
                    list[i]['detail'][blockIndex]['articles'][_next] = _temp;
                    break;
                case 'file':
                    _next = subIndex + typeOfMove;
                    _temp = list[i]['detail'][blockIndex]['files'][subIndex];
                    list[i]['detail'][blockIndex]['files'][subIndex] = list[i]['detail'][blockIndex]['files'][_next];
                    list[i]['detail'][blockIndex]['files'][_next] = _temp;
                    break;
                case 'product':
                    _next = subIndex + typeOfMove;
                    _temp = list[i]['detail'][blockIndex]['products'][subIndex];
                    list[i]['detail'][blockIndex]['products'][subIndex] = list[i]['detail'][blockIndex]['products'][_next];
                    list[i]['detail'][blockIndex]['products'][_next] = _temp;
                    break;
            }

            setDesigns(list);
        }
    }

    const handleAddClick = (type) => {
        switch (type) {
            case 'material':
                setMaterials([...materials, {...tool}]);
                break;
            case 'tool':
                setTools([...tools, {...tool}]);
                break;
            case 'product':
                setProducts([...products, {...product}]);
                break;
        }
    };

    const rearrangeStep = (i, _type, _action) => {
        let _list;
        switch (_type) {
            case 'product':
                _list = [...products];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setProducts(_list);
                }
                break;
            case 'design':
                _list = [...designs];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setDesigns(_list);
                }
                break;
        }
    };

    const handleMainImage = (e) => {
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        let config = {
            method: 'put',
            url: '/contents/recipes/image',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        request(config).then(res => {
            setMainPhoto(res.data.image_file_name);
        })
    };

    const handleProductImage = (e, i) => {
        let formData = new FormData();
        formData.append("image", e.target.files[0]);
        let config = {
            method: 'put',
            url: '/contents/recipes/image',
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        request(config).then(res => {
            let list = [...products];
            list[i]['image_file_name'] = res.data.image_file_name;
            setProducts(list);
        })
    }

    const handleStepImage = (e, i, type) => {

    };

    const submitFormTrouble = () => {
        let checkError = checkRequired();
        if(checkError > 0){
            alert("一部のフィールドが間違っています");
            return;
        }

        history.push('/trouble-input/confirm', {data: 'ok'});
    };

    const invalidURL = (str) => {
        let pattern = new RegExp('^(https?:\\/\\/)?'+
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
            '((\\d{1,3}\\.){3}\\d{1,3}))'+
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
            '(\\?[;&a-z\\d%_.~+=-]*)?'+
            '(\\#[-a-z\\d_]*)?$','i');
        return !pattern.test(str);
    };

    const checkRequired = () => {

    };

    async function fetchData() {
        // let result = await request({ url: '/categories' });
        // let mapping = result.data.map(item => {
        //     return {label: item.name, value: item.id};
        // });
    }

    return (
        <div className={`${css.class}`}>
            <Header/>
            <div className="p-lr-16 section-top-title">
                <p className="main-title">新規コンテンツ作成</p>
            </div>
            <div className="p-lr-16 section-type">
                <Select className="small-select">
                    <option>レシピ</option>
                    <option>読みもの</option>
                </Select>
            </div>
            <div className="p-lr-16 section-sub-title">
                <p className="main-content-tile">レシピコンテンツ</p>
            </div>
            <div className="p-lr-16 section-select-meta">
                <p className="text-main-title m-t-24">記事ラベル設定 <span className="text-required">（必須）</span></p>
                <Select className="big-select m-t-8">
                    <option>ラベルを選択</option>
                </Select>
                <p className="text-main-title m-t-36">カテゴリー設定 <span className="text-required">（必須）</span></p>
                <Select className="big-select m-t-8">
                    <option>カテゴリーを選択</option>
                </Select>
                <div className="break-line m-t-52"> </div>
            </div>
            <div className="p-lr-16 section-main-info m-t-52">
                <UploadImage handleUpload={handleMainImage} imgSrc={mainPhoto}/>
                <TextInput
                    className="m-t-36"
                    label="タイトル"
                    required={true}
                    multiline={true}
                    name="title"
                    placeholder="例）木製の丸イス"
                    errorMsg={mainInfo.e_t}
                    value={mainInfo.title}
                    onChange={handleInputChange}
                    type='main'
                    position='0'
                    maxlength="50"
                    helperText={`${mainInfo.title?.length ?? 0}/50`}
                />
                <TextInput
                    className="m-t-36"
                    label="概要文"
                    required={false}
                    multiline={true}
                    rows={15}
                    name="description"
                    placeholder="例）DIY初心者にもおすすめの木の丸イス"
                    errorMsg={mainInfo.e_d}
                    value={mainInfo.description}
                    onChange={handleInputChange}
                    type='main'
                    position='0'
                    maxlength="1000"
                    helperText={`${mainInfo.description?.length ?? 0}/1000`}
                />
            </div>
            <div className="p-lr-16 section-material">
                {
                    materials.map((v, i) => {
                        return <ToolList key={i} title="使用する材料" last={materials.length} type="material"
                                         index={i} item={v} handleInputChange={handleInputChange}
                                         handleAdd={handleAddClick} handleRemove={handleRemoveClick}/>;
                    })
                }
            </div>
            <div className="p-lr-16 section-tool">
                {
                    tools.map((v, i) => {
                        return <ToolList key={i} title="使用する工具・道具" last={tools.length} type="tool"
                                         item={v} index={i} handleInputChange={handleInputChange}
                                         handleAdd={handleAddClick} handleRemove={handleRemoveClick}/>;
                    })
                }
            </div>
            <div className="p-lr-16 section-recipe-info">
                <RecipeInfo info={mainInfo} handleInputChange={handleInputChange}/>
            </div>
            <div className="p-lr-16 section-design">
                <div className="break-line"> </div>
                <img src="/assets/imgs/f_recipe.png" onClick={e => handleAddDesign('recipe')}/>
                <img src="/assets/imgs/section.png" onClick={e => handleAddDesign('section')}/>
                <img src="/assets/imgs/article.png" onClick={e => handleAddDesign('article')}/>
                <img src="/assets/imgs/point.png" onClick={e => handleAddDesign('pdf')}/>
                <img src="/assets/imgs/pdf.png" onClick={e => handleAddDesign('point')}/>
                <div className="break-line"> </div>
            </div>

            <div className="p-lr-16 section-design-content">
                {
                    designs.map((v, i) => {
                        switch (v.type) {
                            case "article":
                                return <DesignArticle key={i} item={v} index={i} handleMove={rearrangeStep}
                                                      handleInputChange={handleInputChange}/>;
                            case "section":
                                return <DesignSection key={i} item={v} index={i} handleAddLevel1={handleAddLevel1}
                                                      handleRemoveLevel1={handleRemoveLevel1} handleAddLevel2={handleAddLevel2}
                                                      handleRemoveLevel2={handleRemoveLevel2} handleMoveLevel1={handleMoveLevel1}
                                                      handleMoveLevel2={handleMoveLevel2} handleInputChange={handleInputChange}
                                                      handleSubChange={handleSubChange} handleMove={rearrangeStep}/>;
                            case "pdf":
                                return <DesignPDF key={i} item={v} index={i} handleMove={rearrangeStep}
                                                  handleInputChange={handleInputChange}/>;
                            case "point":
                                return <DesignPoint key={i} item={v} index={i} handleMove={rearrangeStep}
                                                    handleInputChange={handleInputChange}/>;
                            case "recipe":
                                return <DesignRecipe key={i} item={v} index={i} handleAddLevel1={handleAddLevel1}
                                                     handleRemoveLevel1={handleRemoveLevel1} handleAddLevel2={handleAddLevel2}
                                                     handleRemoveLevel2={handleRemoveLevel2} handleMoveLevel1={handleMoveLevel1}
                                                     handleMoveLevel2={handleMoveLevel2} handleInputChange={handleInputChange}
                                                     handleSubChange={handleSubChange} handleMove={rearrangeStep}/>;
                        }
                    })
                }
            </div>

            <div className="p-lr-16 section-impression m-t-100">
                <div className="break-line"> </div>
                <p className="text-main-title m-t-52">記事の感想</p>
                <TextInput
                    required={false}
                    multiline={true}
                    rows={15}
                    name="impression"
                    placeholder="例）DIY初心者にもおすすめの木の丸イス"
                    errorMsg={mainInfo.e_i}
                    value={mainInfo.impression}
                    onChange={handleInputChange}
                    type="main"
                    position="0"
                    maxlength="1000"
                    helperText={`${mainInfo.impression?.length ?? 0}/1000`}
                />
            </div>

            <div className="p-lr-16 section-product m-b-52">
                <p className="text-main-title m-t-52 m-b-8">このステップで使用する商品情報</p>
                {
                    products.map((v, i) => {
                        return <ProductInput key={i} item={v} index={i} last={products.length} handleInputChange={handleInputChange}
                                             handleAdd={handleAddClick} handleRemove={handleRemoveClick} type="product"
                                             handleMove={rearrangeStep} handleProductImage={handleProductImage}/>;
                    })
                }
            </div>

            <Footer/>
        </div>
    )
}
