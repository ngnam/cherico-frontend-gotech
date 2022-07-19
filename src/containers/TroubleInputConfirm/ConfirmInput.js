import React from "react";
import { useHistory } from "react-router-dom";
import useRequest from "hooks/useRequest";

import Header from "components/Header";
import Button from "components/Button";
import Footer from "components/Footer";

import InputList from "./InputList/InputList";
import Step from "./Step/Step";

import TimeIcon from "images/icons/time.svg";
import MoneyIcon from "images/icons/money.svg";

import css from "./styles.scss";

export default function ConfirmInput(data) {
  const [checkBoxConfirm, setCheckBoxConfirm] = React.useState(false);

  const { request } = useRequest();

  let history = useHistory();

  let dataConfirm;

  if (
    data !== undefined &&
    data.location !== undefined &&
    data.location.state !== undefined &&
    data.location.state.data !== undefined
  ) {
    dataConfirm = data.location.state.data;
  } else {
    history.push("/trouble-input");
  }

  let preRef = [];
  let _checkReason = 0, _checkComplete = 0;
  if (dataConfirm.post_type == 1 && dataConfirm.processes.pre != undefined) {
    preRef = React.useRef(
      dataConfirm.processes.pre.map(() => React.createRef())
    );

    dataConfirm.processes.pre.forEach(v => {
      if (v.title != '' || v.sub_title != '' || v.description != '' || v.image_file_name != '') {
        _checkReason++;
      }
    });
  }
  let stepRef;
  if (dataConfirm.processes.step != undefined) {
    stepRef = React.useRef(
      dataConfirm.processes.step.map(() => React.createRef())
    );
  }

  let comRef;
  if (dataConfirm.processes.complete != undefined) {
    comRef = React.useRef(
      dataConfirm.processes.complete.map(() => React.createRef())
    );
  }

  dataConfirm.processes.complete.forEach(v => {
    if (v.title != '' || v.sub_title != '' || v.description != '' || v.image_file_name != '') {
      _checkComplete++;
    }
  });

  const goBackEdit = () => {
    dataConfirm["old"] = true;
    history.push("/trouble-input", { data: dataConfirm });
  };

  let checkUpdate = true;

  const mappingData = () => {
    dataConfirm.tools.map((v, i) => {
      v.qty = v.qty != "" ? Number(v.qty) : 0;
      v.price = v.price != "" ? Number(v.price) : 0;
    });
    dataConfirm.materials.map((v, i) => {
      v.qty = v.qty != "" ? Number(v.qty) : 0;
      v.price = v.price != "" ? Number(v.price) : 0;
    });

    if (!checkUpdate) {
      if (dataConfirm.post_type == 1) {
        dataConfirm.processes.pre && dataConfirm.processes.pre.map((v, i) => {
          delete v.id;
          delete v.advice.id;
        });
      }
      dataConfirm.processes.step.map((v, i) => {
        delete v.id;
        delete v.advice.id;
      });
      dataConfirm.processes.complete && dataConfirm.processes.complete.map((v, i) => {
        delete v.id;
        delete v.advice.id;
      });
    }

    if (dataConfirm.post_type == 1) {
      dataConfirm.processes.pre && dataConfirm.processes.pre.map((v, i) => {
        if (v.title == '' && v.sub_title == '' && v.description == '' && v.image_file_name == '') {
          delete dataConfirm.processes.pre[i];
        }
      });
    }
    dataConfirm.processes.step.map((v, i) => {
      if (v.title == '' && v.sub_title == '' && v.description == '' && v.image_file_name == '') {
        delete dataConfirm.processes.step[i];
      }
    });
    dataConfirm.processes.complete && dataConfirm.processes.complete.map((v, i) => {
      if (v.title == '' && v.sub_title == '' && v.description == '' && v.image_file_name == '') {
        delete dataConfirm.processes.complete[i];
      }
    });

    if (dataConfirm.processes.pre != undefined && dataConfirm.processes.pre[0] == null) {
      dataConfirm.processes.pre = [];
    }

    if (dataConfirm.processes.step[0] == null) {
      dataConfirm.processes.step = [];
    }

    if (dataConfirm.processes.complete[0] == null) {
      dataConfirm.processes.complete = [];
    }

    dataConfirm.cost = dataConfirm.cost != "" ? Number(dataConfirm.cost) : 0;
  };

  const collectTrash = () => {
    if (
      dataConfirm.original_type != 0 &&
      dataConfirm.post_type != dataConfirm.original_type
    ) {
      checkUpdate = false;
      const _delete = {
        method: "delete",
        url:
          (dataConfirm.post_type == 1
            ? "/contents/recipes/diys/"
            : "/contents/recipes/problems/") + dataConfirm.original_id,
        headers: {
          "content-type": "application/json",
        },
      };
      request(_delete).then((res) => { });
    }
  };

  const metaData = () => {
    let _method, _url;
    if (dataConfirm.original_id != 0 && checkUpdate) {
      _method = "put";
      _url =
        (dataConfirm.post_type == 1
          ? "/contents/recipes/problems/"
          : "/contents/recipes/diys/") + dataConfirm.original_id;
    } else {
      _method = "post";
      _url =
        dataConfirm.post_type == 1
          ? "/contents/recipes/problems"
          : "/contents/recipes/diys";
    }
    return {
      method: _method,
      url: _url,
      data: dataConfirm,
      headers: {
        "content-type": "application/json",
      },
    };
  };

  const postForm = (_check) => {
    if (_check) {
      collectTrash();
      mappingData();
      let config = metaData();

      request(config).then((res) => {
        if (res.meta.code === 200) {
          let _id = res.data.id;
          let config = {
            method: "put",
            url:
              dataConfirm.post_type == 1
                ? `/contents/recipes/problems/${_id}/publish`
                : `/contents/recipes/diys/${_id}/publish`,
          };
          request(config).then((res) => {
            if (res.meta.code === 200) {
              history.push("/trouble-input/finish", { finish: { id: res.data.id, type: dataConfirm.post_type == 1 ? 'problems' : 'diys' } });
            } else {
              alert(
                "何かがうまくいかなかった。後でもう一度やり直してください。"
              );
            }
          });
        } else {
          alert("何かがうまくいかなかった。後でもう一度やり直してください。");
        }
      });
    } else {
      alert("ポリシーに同意する必要があります");
    }
  };

  const postDraft = () => {
    collectTrash();
    mappingData();
    let config = metaData();

    request(config).then((res) => {
      if (res.meta.code === 200) {
        let _id = res.data.id;
        let config = {
          method: "put",
          url:
            dataConfirm.post_type == 1
              ? `/contents/recipes/problems/${_id}/draft`
              : `/contents/recipes/diys/${_id}/draft`,
        };
        request(config).then((res) => {
          if (res.meta.code === 200) {
            history.push("/");
          } else {
            alert(
              "何かがうまくいかなかった。後でもう一度やり直してください。"
            );
          }
        });
      } else {
        alert("何かがうまくいかなかった。後でもう一度やり直してください。");
      }
    });
  };

  const executeScroll = (_type, i) => {
    switch (_type) {
      case "pre":
        window.scrollTo(0, preRef.current[i].current.offsetTop - 50);
        break;
      case "step":
        window.scrollTo(0, stepRef.current[i].current.offsetTop - 50);
        break;
      case "com":
        window.scrollTo(0, comRef.current[i].current.offsetTop - 50);
        break;
    }
  };

  function showRecipeMaterialList(items) {
    var status = false;
    for (var i = 0; i < items.length; i++) {
      if (items[i].qty && items[i].qty > 0) {
        status = true;
        break;
      }
    }

    return status;
  }


  return (
    <div className={`confirm-input ${css.class}`}>
      <Header />
      <div>
        <section className="content-box text-break basic pd-16">
          <div className="confirm-checkbox">
            <input
              value={checkBoxConfirm}
              onChange={() => setCheckBoxConfirm(!checkBoxConfirm)}
              type="checkbox"
            />
            <a href="/policy" target="_blank">利用規約</a>に同意して投稿する
            </div>
        </section>
        <section className="content-box text-break main-action d-flex justify-center">
          <Button onClick={() => postForm(checkBoxConfirm)}>
            レシピを投稿する
            </Button>
        </section>
        <section className="content-box text-break main-action d-flex justify-center">
          <Button className="bg-white" onClick={() => goBackEdit()}>
            レシピを編集する
            </Button>
        </section>
        <section className="content-box text-break main-action d-flex justify-center">
          <Button className="bg-link" onClick={() => postDraft()}>
            下書きに保存する
            </Button>
        </section>
      </div>
      <section className="content-box text-break basic mt-30">
        <div className="confirm-title">
          <span>レシピをプレビューしています</span>
        </div>
      </section>
      <section className="content-box text-break basic p-relative">
        <div className="confirm-img-content">
          <img
            src={
              dataConfirm.image_file_name
                ? process.env.IMAGE_HOST + "/" + dataConfirm.image_file_name
                : "/assets/no_image.png"
            }
          />
        </div>
        <div className="show-post-title">
          <div className="show-text">
            <p>{dataConfirm.title}</p>
          </div>
          <div className="show-img">
            <div>
              <img src="/assets/icon_heart.png" />
            </div>
          </div>
        </div>
      </section>
      <section className="content-box text-break basic">
        <div className="show-post-cost">
          <div className="show-item">
            <p>
              <TimeIcon />
              <span>所要時間 {dataConfirm.required_time}</span>
            </p>
          </div>
          <div className="show-item">
            <p>
              <MoneyIcon />
              <span>費用 {dataConfirm.cost}</span>
            </p>
          </div>
        </div>
      </section>
      <section className="content-box text-break basic pd-16">
        <p>{dataConfirm.description}</p>
      </section>
      {/*<section className="content-box text-break basic pd-16">*/}
      {/*  <div className="show-post-category">*/}
      {/*    <p className="text-title">カテゴリー</p>*/}
      {/*    <p className="text-normal">{dataConfirm.category_name}</p>*/}
      {/*  </div>*/}
      {/*</section>*/}


      {(dataConfirm.materials && showRecipeMaterialList(dataConfirm.materials)) && (
        <section className="content-box text-break basic pd-16">
          <p className="text-subtitle">使用する材料</p>
          {dataConfirm.materials.map(function (x, i) {
            if (x.qty && x.qty > 0)
              return <InputList key={i} data={x} i={i} />;
          })}
        </section>
      )}

      {(dataConfirm.tools && showRecipeMaterialList(dataConfirm.tools)) && (
        <section className="content-box text-break basic pd-16">
          <p className="text-subtitle">使用する工具・道具</p>
          {dataConfirm.tools.map(function (x, i) {
            if (x.qty && x.qty > 0)
              return <InputList key={i} data={x} i={i} />;
          })}
        </section>
      )}



      {dataConfirm.post_type == 1 ? (
        <div>
          <section className="content-box text-break basic pd-16">
            <p className="text-subtitle">目次</p>
            <div className="summary-list">
              {dataConfirm.processes.pre && dataConfirm.processes.pre.map(function (x, i) {
                return (
                  <div key={i} className="summary-link">
                    <span onClick={() => executeScroll("pre", i)}>
                      {x.title}
                    </span>
                  </div>
                );
              })}
              {dataConfirm.processes.step && dataConfirm.processes.step.map(function (x, i) {
                return (
                  <div key={i} className="summary-link">
                    <span onClick={() => executeScroll("step", i)}>
                      {x.title}
                    </span>
                  </div>
                );
              })}
              {dataConfirm.processes.complete && dataConfirm.processes.complete.map(function (x, i) {
                return (
                  <div key={i} className="summary-link">
                    <span onClick={() => executeScroll("com", i)}>
                      {x.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
          {
            _checkReason > 0 && <div>
              <section className="content-box text-break basic mt-30">
                <div className="confirm-subtitle">
                  <p className="text-subtitle">原因</p>
                </div>
              </section>
              <section className="content-box text-break basic pd-16">
                {dataConfirm.processes.pre && dataConfirm.processes.pre.map(function (x, i) {
                  return <Step key={i} data={x} i={i} type={preRef.current[i]} />;
                })}
              </section>
            </div>
          }
        </div>
      ) : (
          <div>
            <section className="content-box text-break basic pd-16">
              <p className="text-subtitle">目次</p>
              <div className="summary-list">
                {dataConfirm.processes.step && dataConfirm.processes.step.map(function (x, i) {
                  return (
                    <div key={i} className="summary-link">
                      <span href={`#step-${i}`}>{x.title}</span>
                    </div>
                  );
                })}
                {dataConfirm.processes.complete && dataConfirm.processes.complete.map(function (x, i) {
                  return (
                    <div key={i} className="summary-link">
                      <span href={`#com-${i}`}>{x.title}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
      <section className="content-box text-break basic mt-30">
        <div className="confirm-subtitle">
          <p className="text-subtitle">解決方法</p>
        </div>
      </section>
      <section className="content-box text-break basic pd-16">
        {dataConfirm.processes.step && dataConfirm.processes.step.map(function (x, i) {
          return <Step key={i} data={x} i={i} type={stepRef.current[i]} />;
        })}
      </section>
      {
        _checkComplete > 0 && <div>
          <section className="content-box text-break basic mt-30">
            <div className="confirm-subtitle">
              <p className="text-subtitle">完成</p>
            </div>
          </section>
          <section className="content-box text-break basic pd-16">
            {dataConfirm.processes.complete && dataConfirm.processes.complete.map(function (x, i) {
              return <Step key={i} data={x} i={i} type={comRef.current[i]} />;
            })}
          </section>
        </div>
      }
      <Footer />
    </div>
  );
}
