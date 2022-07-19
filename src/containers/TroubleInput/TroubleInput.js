import React from 'react'
import useRequest from 'hooks/useRequest';
import { useParams, useHistory } from 'react-router-dom'

import Header from 'components/Header'
import Button from 'components/Button'
import Select from 'components/Select'
import TextInput from 'components/TextInput'
import Footer from 'components/Footer'
import ChevronRight from 'images/icons/chevron-right.svg'

import CameraFill from 'images/icons/camera-fill.svg'
import Camera from 'images/icons/camera.svg'
import RecipePoint from './RecipePoint'
import RecipeStep from './RecipeStep'
import InputList from './InputList'

import css from './styles.scss'

export default function TroubleInput(data) {
    const { request } = useRequest();
    let history = useHistory();
    let oldData;
    let checkOld = false;
    let checkEdit = false;
    const params = useParams();
    if(params.recipeId !== undefined){
        checkEdit = true;
    } else if(data !== undefined && data.location !== undefined && data.location.state !== undefined && data.location.state.data !== undefined){
        oldData = data.location.state.data;
        checkOld = true;
    }

    const [mainInfo, setMainInfo] = React.useState(checkOld ? {title: oldData.title, description: oldData.description, required_time: oldData.required_time, cost: oldData.cost, original_id: oldData.original_id, original_type: oldData.original_type, e_t: false, e_d: false, e_c: false, e_r: false} : {title: '', description: '', required_time: '', cost: '', original_id: 0, original_type: 0, e_t: false, e_d: false, e_c: false, e_r: false});
    const [categories, setCategories] = React.useState([]);
    const [mainPhoto, setMainPhoto] = React.useState(checkOld ? oldData.image_file_name : null);
    const [materials, setMaterials] = React.useState(checkOld ? oldData.materials : [{name: '', qty: '', price: '', url: '', e_p: false, e_q: false, e_n: false, e_u: false}]);
    const [tools, setTools] = React.useState(checkOld ? oldData.tools : [{name: '', qty: '', price: '', url: '', e_p: false, e_q: false, e_n: false, e_u: false}]);
    const [categoryIds, setCategoryIds] = React.useState(checkOld ? oldData.category_id : 0);
    const [postType, setPostType] = React.useState(checkOld ? oldData.post_type : 1);
    const _defaultBlock = {
        process_no: 0,
        title: '',
        sub_title: '',
        description: '',
        image_file_name: '',
        e_t: false,
        e_s: false
    };
    const _defaultAdvice = {
        title: '',
        description: '',
        image_file_name: '',
        check:false,
        e_t: false,
        e_d: false
    };
    const [reasons, setReasons] = React.useState(checkOld && oldData.post_type == 1 ? oldData.processes.pre : [{..._defaultBlock, advice: {..._defaultAdvice}}]);
    const [solutions, setSolutions] = React.useState(checkOld ? oldData.processes.step : [{..._defaultBlock, advice: {..._defaultAdvice}}]);
    const [completes, setComplete] = React.useState(checkOld ? oldData.processes.complete : [{..._defaultBlock, advice: {..._defaultAdvice}}]);

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
            case 'reason':
                list = [...reasons];
                list[index][name] = value;
                setReasons(list);
                break;
            case 'solution':
                list = [...solutions];
                list[index][name] = value;
                setSolutions(list);
                break;
            case 'complete':
                list = [...completes];
                list[index][name] = value;
                setComplete(list);
                break;
            case 'adviceReason':
                list = [...reasons];
                list[index]['advice'][name] = value;
                setReasons(list);
                break;
            case 'adviceSolution':
                list = [...solutions];
                list[index]['advice'][name] = value;
                setSolutions(list);
                break;
            case 'adviceComplete':
                list = [...completes];
                list[index]['advice'][name] = value;
                setComplete(list);
                break;
        }
    };

    const handleRemoveClick = (index, type) => {
        let list;
        switch (type) {
            case 'material':
                list = [...materials];
                list.splice(index, 1);
                setMaterials(list);
                break;
            case 'tool':
                list = [...tools];
                list.splice(index, 1);
                setTools(list);
                break;
            case 'reason':
                list = [...reasons];
                list.splice(index, 1);
                setReasons(list);
                break;
            case 'solution':
                list = [...solutions];
                list.splice(index, 1);
                setSolutions(list);
                break;
            case 'complete':
                list = [...completes];
                list.splice(index, 1);
                setComplete(list);
                break;
        }
    };

    const handleAddClick = (type) => {
        switch (type) {
            case 'material':
                setMaterials([...materials, {name: '', qty: '', price: '', url: '', e_p: false, e_q: false, e_n: false, e_u:false}]);
                break;
            case 'tool':
                setTools([...tools, {name: '', qty: '', price: '', url: '', e_p: false, e_q: false, e_n: false, e_u:false}]);
                break;
            case 'reason':
                setReasons([...reasons, {..._defaultBlock, advice: {..._defaultAdvice}}]);
                break;
            case 'solution':
                setSolutions([...solutions, {..._defaultBlock, advice: {..._defaultAdvice}}]);
                break;
            case 'complete':
                setComplete([...completes, {..._defaultBlock, advice: {..._defaultAdvice}}]);
                break;
        }
    };

    const rearrangeStep = (i, _type, _action) => {
        let _list;
        switch (_type) {
            case 'reason':
                _list = [...reasons];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setReasons(_list);
                }
                break;
            case 'solution':
                _list = [...solutions];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setSolutions(_list);
                }
                break;
            case 'complete':
                _list = [...completes];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setComplete(_list);
                }
                break;
            case 'tool':
                _list = [...tools];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setTools(_list);
                }
                break;
            case 'material':
                _list = [...materials];
                if(!(i == 0 && _action == -1) && !(i == (_list.length -1) && _action == 1)){
                    let _next = i + _action;
                    let _temp = _list[i];
                    _list[i] = _list[_next];
                    _list[_next] = _temp;
                    setMaterials(_list);
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
    
    const handleStepImage = (e, i, type) => {
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
            let list;
            switch (type) {
                case 'reason':
                    list = [...reasons];
                    list[i]['image_file_name'] = res.data.image_file_name;
                    setReasons(list);
                    break;
                case 'solution':
                    list = [...solutions];
                    list[i]['image_file_name'] = res.data.image_file_name;
                    setSolutions(list);
                    break;
                case 'complete':
                    list = [...completes];
                    list[i]['image_file_name'] = res.data.image_file_name;
                    setComplete(list);
                    break;
                case 'adviceReason':
                    list = [...reasons];
                    list[i]['advice']['image_file_name'] = res.data.image_file_name;
                    setReasons(list);
                    break;
                case 'adviceSolution':
                    list = [...solutions];
                    list[i]['advice']['image_file_name'] = res.data.image_file_name;
                    setSolutions(list);
                    break;
                case 'adviceComplete':
                    list = [...completes];
                    list[i]['advice']['image_file_name'] = res.data.image_file_name;
                    setComplete(list);
                    break;
            }
        })
    };

    const handleAdvice = (i, type, status) => {
        let list;
        switch (type) {
            case 'reason':
                list = [...reasons];
                list[i]['advice']['check'] = status;
                setReasons(list);
                break;
            case 'solution':
                list = [...solutions];
                list[i]['advice']['check'] = status;
                setSolutions(list);
                break;
            case 'complete':
                list = [...completes];
                list[i]['advice']['check'] = status;
                setComplete(list);
                break;
            case 'adviceReason':
                list = [...reasons];
                list[i]['advice']['check'] = status;
                list[i]['advice']['title'] = '';
                list[i]['advice']['decription'] = '';
                list[i]['advice']['image_file_name'] = '';
                setReasons(list);
                break;
            case 'adviceSolution':
                list = [...solutions];
                list[i]['advice']['check'] = status;
                list[i]['advice']['title'] = '';
                list[i]['advice']['decription'] = '';
                list[i]['advice']['image_file_name'] = '';
                setSolutions(list);
                break;
            case 'adviceComplete':
                list = [...completes];
                list[i]['advice']['check'] = status;
                list[i]['advice']['title'] = '';
                list[i]['advice']['decription'] = '';
                list[i]['advice']['image_file_name'] = '';
                setComplete(list);
                break;
        }
    };

    const changePostType = (_type) => {
        setPostType(_type);
    };

    const submitFormTrouble = () => {
        let checkError = checkRequired();
        if(checkError > 0){
            alert("一部のフィールドが間違っています");
            return;
        }
        
        let categoryName = '';
        categories.forEach((v) => {
            if(v.value == categoryIds){
                categoryName = v.label;
            }
        });

        let data = {
            title: mainInfo.title,
            description: mainInfo.description,
            category_id: categoryIds != 0 ? Number(categoryIds) : null,
            category_name: categoryName,
            image_file_name: mainPhoto,
            required_time: mainInfo.required_time,
            cost: mainInfo.cost,
            materials: materials,
            tools: tools,
            post_type: postType,
            original_type: mainInfo.original_type,
            original_id: mainInfo.original_id
        };

        if(postType == 1) {
            data['processes'] = {
                pre: reasons,
                step: solutions,
                complete: completes
            };
        } else {
            data['processes'] = {
                step: solutions,
                complete: completes
            };
        }

        history.push('/trouble-input/confirm', {data: data});
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
        let temp = {...mainInfo};
        let count = 0;
        if(mainInfo.title === ''){
            temp.e_t = 'タイトルを入力してください。';
            count++;
        } else if (mainInfo.title.length > 32) {
            temp.e_t = '32文字未満';
            count++;
        } else {
            temp.e_t = false;
        }

        if(mainInfo.description === ''){
            temp.e_d = 'この記事で伝えたいことを入力してください。';
            count++;
        } else if (mainInfo.description.length >= 1000) {
            temp.e_d = '1000文字未満';
            count++;
        } else {
            temp.e_d = false;
        }

        if(mainInfo.required_time.length >= 10){
            temp.e_r = '(10文字未満)';
            count++
        } else {
            temp.e_r = false;
        }

        if(mainInfo.cost !== '' && !isNumber(mainInfo.cost)){
            temp.e_c = true;
            count++;
        } else {
            temp.e_c = false;
        }

        setMainInfo(temp);

        if(postType == 1){
            temp = [...reasons];
            reasons.forEach((v, i) => {
                temp[i]['e_t'] = false;
                temp[i]['e_s'] = false;
                temp[i]['e_d'] = false;
                temp[i]['advice']['e_t'] = false;
                temp[i]['advice']['e_d'] = false;

                temp[i]['process_no'] = i + 1;
                if (v.title.length > 50){
                    temp[i]['e_t'] = '50文字未満';
                    count++;
                }

                if (v.sub_title.length > 50) {
                    temp[i]['e_s'] = '50文字未満';
                    count++;
                }

                if(v.description.length >= 1000){
                    temp[i]['e_d'] = '1000文字未満';
                    count++;
                }

                if(v.advice.title.length > 50){
                    temp[i]['advice']['e_t'] = '50文字未満';
                    count++;
                }

                if(v.advice.description.length >= 1000){
                    temp[i]['advice']['e_d'] = '1000文字未満';
                    count++;
                }
            });

            setReasons(temp);
        }
        temp = [...solutions];
        solutions.forEach((v, i) => {
            temp[i]['e_t'] = false;
            temp[i]['e_s'] = false;
            temp[i]['e_d'] = false;
            temp[i]['advice']['e_t'] = false;
            temp[i]['advice']['e_d'] = false;

            temp[i]['process_no'] = i + 1;
            if(v.title === ''){
                temp[i]['e_t'] = '見出しを入力してください。';
                count++;
            } else if (v.title.length > 50){
                temp[i]['e_t'] = '50文字未満';
                count++;
            }
            if(v.sub_title === ''){
                temp[i]['e_s'] = '小見出しを入力してください。';
                count++;
            } else if (v.sub_title.length > 50) {
                temp[i]['e_s'] = '50文字未満';
                count++;
            }

            if(v.description.length >= 1000){
                temp[i]['e_d'] = '1000文字未満';
                count++;
            }

            if(v.advice.title.length > 50){
                temp[i]['advice']['e_t'] = '50文字未満';
                count++;
            }

            if(v.advice.description.length >= 1000){
                temp[i]['advice']['e_d'] = '1000文字未満';
                count++;
            }
        });

        setSolutions(temp);

        temp = [...completes];
        completes.forEach((v, i) => {
            temp[i]['e_t'] = false;
            temp[i]['e_s'] = false;
            temp[i]['e_d'] = false;
            temp[i]['advice']['e_t'] = false;
            temp[i]['advice']['e_d'] = false;

            temp[i]['process_no'] = i + 1;
            if (v.title.length > 50){
                temp[i]['e_t'] = '50文字未満';
                count++;
            }

            if (v.sub_title.length > 50) {
                temp[i]['e_s'] = '50文字未満';
                count++;
            }

            if(v.description.length >= 1000){
                temp[i]['e_d'] = '1000文字未満';
                count++;
            }

            if(v.advice.title.length > 50){
                temp[i]['advice']['e_t'] = '50文字未満';
                count++;
            }

            if(v.advice.description.length >= 1000){
                temp[i]['advice']['e_d'] = '1000文字未満';
                count++;
            }
        });

        setComplete(temp);

        temp = [...tools];
        tools.forEach((v, i) => {
            temp[i]['e_p'] = false;
            temp[i]['e_q'] = false;
            temp[i]['e_n'] = false;
            temp[i]['e_u'] = false;

            if(v.qty !== '' && !isNumber(v.qty)){
                temp[i]['e_q'] = true;
                count++;
            }

            if(v.price !== '' && !isNumber(v.price)){
                temp[i]['e_p'] = true;
                count++;
            }

            if(v.name.length >= 20){
                temp[i]['e_n'] = true;
                count++;
            }

            if(v.url && invalidURL(v.url)) {
                temp[i]['e_u'] = true;
                count++;
            }
        });

        setTools(temp);

        temp = [...materials];
        materials.forEach((v, i) => {
            temp[i]['e_p'] = false;
            temp[i]['e_q'] = false;
            temp[i]['e_n'] = false;
            temp[i]['e_u'] = false;

            if(v.qty !== '' && !isNumber(v.qty)){
                temp[i]['e_q'] = true;
                count++;
            }

            if(v.price !== '' && !isNumber(v.price)){
                temp[i]['e_p'] = true;
                count++;
            }

            if(v.name.length >= 20){
                temp[i]['e_n'] = true;
                count++;
            }

            if(v.url && invalidURL(v.url)) {
                temp[i]['e_u'] = true;
                count++;
            }
        });

        setMaterials(temp);

        return count;
    };

    async function fetchData() {
        let result = await request({ url: '/categories' });
        let mapping = result.data.map(item => {
            return {label: item.name, value: item.id};
        });

        setCategories(mapping);
        if(!oldData){
            setCategoryIds(mapping[0].value);
        }

        if(checkEdit){
            let content = await request({url : `/contents/recipes/${params.type}/${params.recipeId}`});
            let _cost = 0;

            setMainPhoto(content.data.image_file_name);
            setMaterials(content.data.materials.map((x, i) => {
                _cost += x.qty * x.price;
                return {...x, e_p: false, e_q: false, e_n: false, e_u:false};
            }));

            setTools(content.data.tools.map((x, i) => {
                _cost += x.qty * x.price;
                return {...x, e_p: false, e_q: false, e_n: false, e_u:false};
            }));

            setMainInfo({
                description: content.data.description,
                title: content.data.title,
                required_time: content.data.required_time,
                cost: _cost,
                e_t: false,
                e_d: false,
                e_c: false,
                e_r: false,
                original_id: content.data.id,
                original_type: params.type == 'problems' ? 1 : 2
            });

            setPostType(params.type == 'problems' ? 1 : 2);

            setCategoryIds(content.data.category.id);

            if(content.data.processes.pre !== null){
                setReasons(content.data.processes.pre.map((x, i) => {
                    let _advice = {
                        ...x.advices,
                        check:x.advices.title !== '' || x.advices.description !== '' || x.advices.image_file_name !== '',
                        e_t: false,
                        e_d: false
                    };

                    return {
                        description: x.description,
                        id: x.id,
                        image_file_name: x.image_file_name,
                        process_no: x.process_no,
                        sub_title: x.sub_title,
                        title: x.title,
                        e_t: false,
                        e_s: false,
                        advice: {
                            ..._advice
                        }
                    }
                }));
            }

            setSolutions(content.data.processes.step.map((x, i) => {
                let _advice = {
                    ...x.advices,
                    check:x.advices.title !== '' || x.advices.description !== '' || x.advices.image_file_name !== '',
                    e_t: false,
                    e_d: false
                };
                return {
                    description: x.description,
                    id: x.id,
                    image_file_name: x.image_file_name,
                    process_no: x.process_no,
                    sub_title: x.sub_title,
                    title: x.title,
                    e_t: false,
                    e_s: false,
                    advice: {
                        ..._advice
                    }
                }
            }));

            if(content.data.processes.complete != null){
                setComplete(content.data.processes.complete.map((x, i) => {
                    let _advice = {
                        ...x.advices,
                        check:x.advices.title !== '' || x.advices.description !== '' || x.advices.image_file_name !== '',
                        e_t: false,
                        e_d: false
                    };

                    return {
                        description: x.description,
                        id: x.id,
                        image_file_name: x.image_file_name,
                        process_no: x.process_no,
                        sub_title: x.sub_title,
                        title: x.title,
                        e_t: false,
                        e_s: false,
                        advice: {
                            ..._advice
                        }
                    }
                }));
            }
        }
    }

    return (
        <div className={`trouble-input ${css.class}`}>
            <Header/>
            <section className="content-box text-break kv image">
                <div className="title">表紙の写真</div>
                <div className="d-flex align-center justify-center">
                    {!mainPhoto ? (
                        <div className="image-container blank-photo">
                            <div className="img d-flex direction-column align-center justify-center">
                                <CameraFill/>
                                <span className="photo-caution pre-wrap text-center">
                                    <p>人物の顔が写り込んでいない</p>
                                    <p>オリジナルの写真をご利用ください</p>
                                </span>
                            </div>
                            <div className="pick-photo d-flex justify-center">
                                <Button
                                    varient="default"
                                    className="d-flex align-center justify-center file-cover"
                                >
                                    <Camera/>
                                    <span>写真を変更する</span>
                                    <input type="file" onChange={handleMainImage}/>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="image-container">
                            <img src={process.env.IMAGE_HOST + '/' + mainPhoto}/>
                            <div className="pick-photo d-flex justify-center">
                                <Button
                                    varient="default"
                                    className="d-flex align-center justify-center file-cover"
                                >
                                    <Camera/>
                                    <span>写真を変更する</span>
                                    <input type="file" onChange={handleMainImage}/>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
            <section className="content-box text-break basic">
                <div className="input-field">
                    <TextInput
                        className="text-input-title"
                        label="タイトル"
                        required={true}
                        multiline={true}
                        name="title"
                        placeholder="壁のキズやはがれを簡単に補修する方法"
                        errorMsg={mainInfo.e_t}
                        value={mainInfo.title}
                        showError={mainInfo.e_t}
                        onChange={e => handleInputChange(e, 0, 'main')}
                        maxlength="32"
                        helperText={`${mainInfo.title.length}/32`}
                    />
                </div>
                <div className="input-field">
                    <TextInput
                        label="この記事で伝えたいこと"
                        required={true}
                        multiline={true}
                        name="description"
                        placeholder="例）カンタンにできる壁紙の補修方法を紹介します。"
                        errorMsg={mainInfo.e_d}
                        value={mainInfo.description}
                        showError={mainInfo.e_d}
                        onChange={e => handleInputChange(e, 0, 'main')}
                        maxlength="999"
                        helperText={`${mainInfo.description.length}/999`}
                    />
                </div>
            </section>
            <section className="content-box text-break materials">
                <div className="title">使用する材料</div>
                {
                    materials.map(function (x, i, {length}) {
                        return <InputList key={i} x={x} i={i} type='material' handleInputChange={handleInputChange}
                        handleRemoveClick={handleRemoveClick} handleAddClick={handleAddClick} last={length - 1}
                                          rearrangeStep={rearrangeStep}/>
                    })
                }
            </section>
            <section className="content-box text-break tools">
                <div className="title">使用する工具・道具</div>
                {
                    tools.map(function (x, i, {length}) {
                        return <InputList key={i} x={x} i={i} type='tool' handleInputChange={handleInputChange}
                            handleRemoveClick={handleRemoveClick} handleAddClick={handleAddClick} last={length - 1}
                                          rearrangeStep={rearrangeStep}/>
                    })
                }
            </section>
            <section className="content-box text-break recipe-info">
                <div className="title">レシピの情報</div>
                <div className="input-row d-flex space-between">
                    <div className="label pre-wrap">{`所要時間`} <span className="text-danger">{mainInfo.e_r}</span></div>
                    <div className="input-field d-flex align-center">
                        <input type="text" name="required_time" maxLength="9" value={mainInfo.required_time} onChange={e => handleInputChange(e, 0, 'main')} placeholder="例 )1時間"/>
                    </div>
                </div>
                <div className="input-row d-flex space-between">
                    <div className="label pre-wrap">{`費用（税抜き）`} { mainInfo.e_c ? <span className="text-danger">(数値が必要)</span> : (<span> </span>)}</div>
                    <div className="input-field d-flex align-center">
                        <input type="text" value={mainInfo.cost} disabled placeholder="例 )4,000円"/>
                    </div>
                </div>
                {/*todo categories*/}
                {/*<div>*/}
                {/*    <div className="label pre-wrap adjust-label">{`カテゴリー`} <span className={`required`}>{`(必須)`}</span></div>*/}
                {/*    <div className="inputs">*/}
                {/*        <Select fullWidth value={categoryIds} onChange={e => setCategoryIds(e.target.value)}>*/}
                {/*            {*/}
                {/*                categories.map(function (x, i) {*/}
                {/*                    return <option key={'s' + i} value={x.value}>{x.label}</option>;*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </Select>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </section>
            <section className="content-box text-break recipe-type">
                <div className="title">
                    <span>レシピの種類</span>
                    <span className={`text-right`}>（必須）</span>
                </div>
                <div className="inputs">
                    <Select fullWidth value={postType} onChange={e => changePostType(e.target.value)}>
                        <option value="1">お困り</option>
                        <option value="2">DIY</option>
                    </Select>
                </div>
            </section>
            {
                postType == 1 ? (
                    <div className="p-16">
                        <section className="content-box text-break recipe-detail">
                            <div className="title">レシピの内容</div>
                            <div className="detail-description">
                                記事が読みやすいように、<strong>原因-解決方法-完成</strong>
                                といった過程にそって書きまししょう！
                            </div>
                        </section>
                        <section className="sub-title mt-15">
                            <span>原因</span>
                        </section>
                        <section className="content-box text-break reasons">
                            {
                                reasons.map(function (x, i, {length}) {
                                    return (
                                        <div key={'r' + i}>
                                            <RecipeStep x={x} i={i} type='reason' handleInputChange={handleInputChange} postType={postType}
                                                        handleRemoveClick={handleRemoveClick} last={length - 1} handleAddAdvice={handleAdvice}
                                                        handleAdd={handleAddClick} handleStepImage={handleStepImage} rearrangeStep={rearrangeStep}/>
                                            {
                                                x.advice.check ? (
                                                    <div className="point">
                                                        <RecipePoint x={x} i={i} type="adviceReason" handleInputChange={handleInputChange}
                                                                     handleStepImage={handleStepImage} handleAddAdvice={handleAdvice}/>
                                                    </div>
                                                ) : (
                                                    <div> </div>
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </section>
                    </div>
                ) : (
                    <div className="p-16">
                        <section className="content-box text-break recipe-detail">
                            <div className="title">レシピの内容</div>
                            <div className="detail-description">
                                記事が読みやすいように、<strong>手順-完成図・感想</strong>
                                といった過程にそって書きまししょう！
                            </div>
                        </section>
                    </div>
                )
            }
            <section className="sub-title">
                {
                    postType == 1 ? (
                        <span>解決方法</span>
                    ) : (
                        <span>手順</span>
                    )
                }
                <span className="caution">（必須）</span>
            </section>
            <section className="content-box text-break solutions">
                {
                    solutions.map(function (x, i, {length}) {
                        return (
                            <div key={ 's' + i}>
                                <RecipeStep x={x} i={i} type='solution' handleInputChange={handleInputChange} postType={postType}
                                            handleRemoveClick={handleRemoveClick} last={length - 1} handleAddAdvice={handleAdvice}
                                            handleAdd={handleAddClick} handleStepImage={handleStepImage} rearrangeStep={rearrangeStep}/>
                                {
                                    x.advice.check ? (
                                        <div className="point">
                                            <RecipePoint x={x} i={i} type="adviceSolution" handleInputChange={handleInputChange}
                                                         handleStepImage={handleStepImage} handleAddAdvice={handleAdvice}/>
                                        </div>
                                    ) : (
                                        <div> </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </section>
            {
                postType == 1 ? (
                    <section className="sub-title">
                        <span>完成</span>
                        {/*<span className="caution">（必須）</span>*/}
                    </section>
                ) : (
                    <section className="sub-title">
                        <span>完成図・感想</span>
                    </section>
                )
            }
            <section className="content-box text-break complete">
                {
                    completes.map(function (x, i, {length}) {
                        return (
                            <div key={'c' + i}>
                                <RecipeStep  x={x} i={i} type='complete' handleInputChange={handleInputChange} postType={postType}
                                             handleRemoveClick={handleRemoveClick} last={length - 1} handleAddAdvice={handleAdvice}
                                             handleAdd={handleAddClick} handleStepImage={handleStepImage} rearrangeStep={rearrangeStep}/>
                                {
                                    x.advice.check ? (
                                        <div className="point">
                                            <RecipePoint x={x} i={i} type="adviceComplete" handleInputChange={handleInputChange}
                                                         handleStepImage={handleStepImage} handleAddAdvice={handleAdvice}/>
                                        </div>
                                    ) : (
                                        <div> </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </section>
            <section className="content-box text-break main-action d-flex justify-center">
                <Button onClick={() => submitFormTrouble()}>投稿内容をプレビューする</Button>
            </section>
            <Footer/>
        </div>
    )
}
