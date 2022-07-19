import React, { useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Button from 'components/Button'
import { setImageHost } from 'service/image'

import css from './styles.scss'
import CommentList from "components/CommentList";
import CommentBox from "../../components/CommentBox/CommentBox";

import useAuth from 'hooks/useAuth'
import useRequest from 'hooks/useRequest'

export default function Comment() {
    const { state: authState } = useAuth();
    const { request, getUserInfo } = useRequest();
    const params = useParams();
    const history = useHistory();

    const [comment, setComment] = useState('');
    const [userId, setUserId] = useState(0);
    const [step, setStep] = useState({ id: 0 });
    const [comments, setComments] = useState([]);

    const inputChange = (e) => {
        const { value } = e.target;
        setComment(value);
    };

    async function fetchData() {
        if (authState.user) {
            setUserId(authState.user.username);
        }

        if (params.process == 'common') {
            const result = await request({ url: `/contents/recipes/${params.type}/${params.recipeId}/comments?limit=100&offset=0` });
            commonComment(result)
        }

        else {
            const result = await request({ url: `/contents/recipes/${params.type}/${params.recipeId}` });
            sessionComment(result)
        }

    }

    function commonComment(result) {
        // if (result.data.status !== 'public') {
        // history.push('/')
        // }
        setComments(
            result.data.map((v, i) => {
                return {
                    user: {
                        image_file_name: v.user.profile.image_file_name,
                        name: v.user.nickname,
                        id: v.user.id,
                    },
                    comment: v.comment,
                    updated_at: v.updated_at,
                    id: v.id,
                }
            })
        )
    }

    function sessionComment(result) {
        if (result.data.status !== 'public') {
            history.push('/')
        }
        result.data.processes[params.process].forEach((v, i) => {
            if (v.id == params.index) {
                setStep(v);
                if (v.comments) {
                    setComments(v.comments.map((v, i) => {
                        return {
                            user: {
                                image_file_name: v.user.profile.image_file_name,
                                name: v.user.nickname,
                                id: v.user.id
                            },
                            comment: v.comment,
                            updated_at: v.updated_at,
                            id: v.id
                        };
                    }));
                } else {
                    setComments([]);
                }
            }
        });
    }

    const getPostComment = () => {
        if (params.process == 'common')
            request({ url: `/contents/recipes/${params.type}/${params.recipeId}/comments?limit=100&offset=0` }).then(res => {
                commonComment(res)
            });
        else
            request({ url: `/contents/recipes/${params.type}/${params.recipeId}` }).then(res => {
                sessionComment(res)
            });
    };

    const postComment = () => {
        let formData = new FormData();
        formData.append("comment", comment);

        if (params.process == 'common')
            var url = `/contents/recipes/problems/${params.recipeId}/comments`;
        else
            var url = `/contents/recipes/${params.type}/${params.recipeId}/process/${params.index}/comments`;

        let config = {
            method: 'post',
            url: url,
            data: formData,
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        request(config).then(res => {
            if (res.meta.code === 200) {
                getPostComment();
            }
        });
        setComment('');
    }


    React.useEffect(() => {
        if (!authState.authChecked) {
            return
        }
        fetchData();
    }, [authState.authChecked]);

    const goBackDetail = () => {
        history.push(`/recipe/${params.recipeId}/${params.type}`);
    };

    const handleDeleteComment = (item) => {
        let _confirm = confirm('削除しますか？');

        if (params.process == 'common')
            var url = `/contents/recipes/problems/${params.recipeId}/comments/${item.id}`;
        else
            var url = `/contents/recipes/${params.type}/${params.recipeId}/process/${params.index}/comments/${item.id}`;

        if (_confirm) {
            const _delete = {
                method: "delete",
                url: url,
                headers: {
                    "content-type": "application/json",
                },
            };
            request(_delete).then((res) => {
                if (res.meta.code === 200) {
                    getPostComment();
                    alert('削除');
                } else {
                    alert('何かがうまくいかなかった。後でもう一度やり直してください。');
                }
            });
        }
    };

    return (
        <div className={`comment ${css.class}`}>
            <Header />
            <section className="sticky-comment">

                <h2>{params.process == 'common' ? '全体のコメントを投稿する' : 'コメントを投稿する'}</h2>

                <CommentBox value={comment} postComment={postComment} inputChange={inputChange} /*user*/ />
            </section>

            {step.id != 0 && (<div> <section className="sec-3 p-16">
                <div className="title">{step.title}</div>
                <div className="divide"></div>
                <div className="sub-title">{step.sub_title}</div>
            </section>
                <section className="sec-4">
                    {
                        step.image_file_name ? (
                            <div className="top-img">
                                <div className="content-image">
                                    <img src={`${setImageHost(step.image_file_name)}`} alt="" />
                                </div>
                            </div>
                        ) : ''
                    }

                    {step.description&&<div className="content p-16">{step.description}</div>}
                </section></div>)}

            <section className="sec-5 p-16 mb-45">
                <div className="d-flex justify-content-space mb-15">
                    <div className="text-left">
                        <span className="text header-comment">コメント <span className="count" >{comments.length}</span>件</span>
                    </div>
                </div>
                <CommentList items={comments} viewer={userId} handleDeleteComment={handleDeleteComment} type='' recipeId='' hiden='' />
            </section>

            <section className="content-box text-break main-action d-flex justify-center mb-45">
                <Button className="bg-white" onClick={() => goBackDetail()}>前のページに戻る</Button>
            </section>
            <Footer />
        </div>
    )
}
